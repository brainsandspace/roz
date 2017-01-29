import fs from 'fs';
import path from 'path'
import chokidar from 'chokidar';
import getHash from './utils/getHash.js';


class FileWatcher {
/** the directory being watched */
  constructor(watchDirectory) {
    this.watchDirectory = watchDirectory;
    this.fileHashes = {};
    this.socketConnections = {};

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
    }); 

    this.watcher.on('ready', () => {
      this.doWatching();
    });

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