import fs from 'fs';
import path from 'path'
import chokidar from 'chokidar';
import prettyjson from 'prettyjson';
import getHash from './utils/getHash.js';

class FileWatcher {
/** the directory being watched */
  constructor(watchDirectory) {
    this.watchDirectory = watchDirectory;
    this.fileHashes = {};
    this.socketConnections = {};
    this.dirObject = {};

    this.watcher = chokidar.watch(
      watchDirectory, 
      {
        /** We are only concerned (for now at least) with changes the user manually made,
         * so we ignore node_modules, git files, bundles output from webpack, and of course the file that is storing changes for Roz so you can play it back.
         */
        ignored: [
          /roz_well\.txt/,
          /.*\.bundle\.js/,
          /\.gitignore/,
          '**/node_modules/**',
          '**/.git/**'
        ]
      }
    );

    // If during chokidar's initial scan, create object that stores a hash of each file, so a comparison can be made when the file changed in the future.
    // Note that this routine is called after the initial scan as well.
    this.watcher.on('add', async (filename, stats) => {
      const hash = await getHash(filename);
      this.fileHashes[filename] = { hash, size: stats.size};

      // Windows uses back slashes in paths, so let's correct for that
      // console.log('filename before', filename);
      filename = filename.replace(/\\/g, '/');
      // console.log('filename after', filename);

      // shortened path that is relative to the root watch directory
      // eg '/Development-B/Roz/client/index.js' becomes 'client/index.js'
      const relFilename = filename.replace(`${this.watchDirectory}/`, '');

      this.dirObject = this.pathToObj(this.dirObject, relFilename, stats.size);
      // console.log(prettyjson.render(this.dirObject))
      console.log(filename)
    }); 

    this.watcher.on('ready', () => {
      this.doWatching();
      console.log(prettyjson.render(this.dirObject))
      
    });

  }

  /**
   * takes in an object and a string
   */
  pathToObj(parentDir, str, size) {
    const dirMatch = str.match(/([^\/]*)\//); 
    let subDir;

    if (dirMatch) { subDir = dirMatch[1]; }
    else { 
      parentDir[str] = { size }
      return parentDir;
    }

    const remainingString = str.replace(`${subDir}/`, '');

    if (remainingString.indexOf('/') > 0) {
      if (!parentDir[subDir]) { parentDir[subDir] = this.pathToObj({}, remainingString, size); }
      else                    { parentDir[subDir] = this.pathToObj(parentDir[subDir], remainingString, size); }
      return parentDir;
    } else {
      if (!parentDir) parentDir = {}
      if (!parentDir[subDir]) parentDir[subDir] = {}
      parentDir[subDir][remainingString] = { size }
      return parentDir 
    }
  }

  doWatching() {
    this.watcher.on('add', (filename) => {
      console.log('multiple events on add');
    })

    this.watcher.on('change', async (filename, stats) => {
      // if the size of the file changed, the file definitely changed...
      if (stats.size !== this.fileHashes[filename].size) {
        this.broadcast(filename);

        // update the fileHashes object
        const hash = await getHash(filename);
        this.fileHashes[filename] = { hash, size: stats.size };

      } else {

        // ...but if the size of the file did not change, the file may or may not have changed, so we check the hash
        const hash = await getHash(filename);

        if (hash !== this.fileHashes[filename].hash) {
          // the file has changed
          this.fileHashes[filename] = { hash, size: stats.size };
          this.broadcast(filename);

        } else {
          // the file has not changed
        }
        
      }

    })

    this.watcher.on('all',
      (eventType, filename, stats) => {
        if (filename) {
          console.log(`event type: ${eventType}, filename: ${filename}`);
          fs.appendFile(`${this.watchDirectory}/roz_well.txt`, `\n${filename}`);
        } else {
          console.log(`event type: ${eventType}, could not get filename`);
        }

        if (stats) {
          // console.log(stats, stats.size)
        }
      }
    );

  }

  addClient(id, ws) {
    this.socketConnections[id] = ws;
    ws.send(JSON.stringify({ initialDirObject: this.dirObject }));
  }

  removeClient(id) {
    delete this.socketConnections[id];
  }

  broadcast(msg) {
    for (let connection in this.socketConnections) {
      this.socketConnections[connection].send(JSON.stringify({ msg }));
    }
  }

}

export default FileWatcher;