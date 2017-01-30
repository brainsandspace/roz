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
      console.log('filename before', filename);
      filename = filename.replace(/\\/g, '/');
      console.log('filename after', filename);

      // shortened path that is relative to the root watch directory
      // eg '/Development-B/Roz/client/index.js' becomes 'client/index.js'
      const relFilename = filename.replace(`${this.watchDirectory}/`, '');

      console.log('filename', filename);
      console.log('relfilename', relFilename)
      console.log('this.watchDirectory', this.watchDirectory)

      let parentDir = this.dirObject;
      let subDir;
      let remainingString = relFilename;
      // while (remainingString.indexOf('/') >= 0) {
        
        // const subDir = relFilename.match(/([^\/]*)\//)[1];
        // const remainingString = relFilename.replace(`${subDir}/`, '');


        
        this.dirObject = this.pathToObj(parentDir, remainingString);
        // console.log('subDir', subDir);
        // console.log('remainingString', remainingString);
        // if (subDir !== null) { 
        //   if (parentDir[subDir]) { }
        //   else {
        //     parentDir[subDir] = {}
        //   }
        //   parentDir = parentDir[subDir];
        // }
        // else {
        //   console.log('about to break', parentDir, remainingString)
        //   parentDir[remainingString] = { size: stats.size };
        // }
        // console.log('remainingString', remainingString);
      // }
      // this.dirObject[relFilename] = {}
      console.log('dirObject')
      console.log(prettyjson.render(this.dirObject))
    }); 

    this.watcher.on('ready', () => {
      this.doWatching();
    });

  }

  /**
   * takes in an object and a string
   */
  pathToObj(parentDir, str) {
    const dirMatch = str.match(/([^\/]*)\//); 
    let subDir;
    if (dirMatch) { subDir = dirMatch[1]; }
    else { 
      parentDir[str] = { size: 0 }
      return parentDir;
    }
    const remainingString = str.replace(`${subDir}/`, '');

    console.log('sd, rs', subDir, remainingString)

    if (remainingString.indexOf('/') > 0) {
      if (!parentDir[subDir]) { parentDir[subDir] = this.pathToObj({}, remainingString); }
      else                    { parentDir[subDir] = this.pathToObj(parentDir[subDir], remainingString); }
      return parentDir;
      // return [subDir, str.replace(`${subDir}/`, '')];
    } else {
      console.log(parentDir);
      if (!parentDir) parentDir = {}
      if (!parentDir[subDir]) parentDir[subDir] = {}
      parentDir[subDir][remainingString] = { size: 0 }
      return parentDir 
            // console.log('remaining string', remainingString);
      // parentDir[remainingString] = { size: 0 };
      // return { size: 0 } };
    }
  }

  doWatching() {
    this.watcher.on('add', (filename) => {
      console.log('multiple events on add');
    })

    this.watcher.on('change', async (filename, stats) => {
      // if the size of the file changed, the file definitely changed...
      if (stats.size !== this.fileHashes[filename].size) {
        this.sendMessage(filename);

        // update the fileHashes object
        const hash = await getHash(filename);
        this.fileHashes[filename] = { hash, size: stats.size };

      } else {

        // ...but if the size of the file did not change, the file may or may not have changed, so we check the hash
        const hash = await getHash(filename);

        if (hash !== this.fileHashes[filename].hash) {
          // the file has changed
          this.fileHashes[filename] = { hash, size: stats.size };
          this.sendMessage(filename);

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
  }

  removeClient(id) {
    delete this.socketConnections[id];
  }

  sendMessage(msg) {
    for (let connection in this.socketConnections) {
      this.socketConnections[connection].send(msg);
    }
  }

}

export default FileWatcher;