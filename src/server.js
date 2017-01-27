const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');

const watcher = chokidar.watch(
  path.resolve(__dirname, '../client'), 
  {
    ignored: '*.really.json'
  }
  );

watcher.on('ready', doWatching);

function doWatching() {
  watcher.on('all',  
    (eventType, filename) => {
      console.log(`event type is ${eventType}`)
      if (filename) {
        // console.log(`filename provided ${filename}`);
        fs.appendFile(path.resolve(__dirname, '../client/index.js'), `;console.log('${filename}');`)//JSON.stringify({ filename }));
      } else {
        console.log('could not get filename')
      }
    }
  );
}