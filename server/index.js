import fs from 'fs';
import path from 'path'
import chokidar from 'chokidar';
import getHash from './utils/getHash.js';

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log(`point any browser on the same local network to ${add}`);
});

/** the directory being watched */
const watchDirectory = process.argv[2];

let fileHashes = {};

if (!watchDirectory) {
  console.error('missing folder argument');
} else {
  console.log('watching folder:', watchDirectory);

  // currently requires absolute path
  const watcher = chokidar.watch(
    watchDirectory, 
    {
      // ignore node_modules and git files
      ignored: [
        /roz_well\.txt/,
        /\.gitignore/,
        '**/node_modules/**',
        '**/.git/**'
      ]
    }
  );

  // If during chokidar's initial scan, create object that stores a hash of each file, so a comparison can be made when the file changed in the future.
  // Note that this routine is called after the initial scan as well.
  watcher.on('add', async (filename, stats) => {
    const hash = await getHash(filename);
    fileHashes[filename] = { hash, size: stats.size};
  }); 

  watcher.on('ready', () => {
    doWatching();
  });

  function doWatching() {

    watcher.on('add', (filename) => {
      console.log('multiple events on add')
    })

    watcher.on('change', async (filename, stats) => {
      // if the size of the file changed, the file definitely changed...
      if (stats.size !== fileHashes[filename].size) {

        // update the fileHashes object
        const hash = await getHash(filename);
        fileHashes[filename] = { hash, size: stats.size };

      } else {

        // ...but if the size of the file did not change, the file may or may not have changed, so we check the hash
        const hash = await getHash(filename);

        if (hash !== fileHashes[filename].hash) {
          // the file has changed
          fileHashes[filename] = { hash, size: stats.size };
        } else {
          // the file has not changed
        }
        
      }

    })

    watcher.on('all',
      (eventType, filename, stats) => {
        if (filename) {
          console.log(`event type: ${eventType}, filename: ${filename}`);
          fs.appendFile(`${watchDirectory}/roz_well.txt`, `\n${filename}`);
        } else {
          console.log(`event type: ${eventType}, could not get filename`);
        }

        if (stats) {
          // console.log(stats, stats.size)
        }
      }
    );

  }

}