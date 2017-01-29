import express from 'express';
import FileWatcher from './FileWatcher.js';
/** Tell the user their local IP address where they can point other devices to. */
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log(`point any browser on the same local network to ${add}:1234`);
});


const Gun = require('gun/gun');

const server = express();
server.listen(1234, '0.0.0.0', () => {
  console.log('listening on localhost:1234');
})

server.get('/', (req, res) => {
  res.sendFile('../client/index.html')
})


const watchDirectory = process.argv[2];
console.log('watching folder:', watchDirectory);

if (!watchDirectory) {
  console.error('missing folder argument');
} else {
  const watchdog = new FileWatcher(watchDirectory);
}

