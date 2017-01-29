import path from 'path';
import url from 'url';
import http from 'http';
import express from 'express';
import FileWatcher from './FileWatcher.js';
/** Tell the user their local IP address where they can point other devices to. */
let localIP;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  localIP = add;
  console.log(`point any browser on the same local network to ${add}:1234`);
});


const server = http.createServer();
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server });
const app = express();

//express();
app.use(express.static(__dirname + '/../public'));

app.listen(1234, '0.0.0.0', () => {
  console.log('listening on localhost:1234');
})

app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile('index.html', { root: path.resolve(`${__dirname}/../public`) });
})


const watchDirectory = process.argv[2];
console.log('watching folder:', watchDirectory);

if (!watchDirectory) {
  console.error('missing folder argument');
} else {
  const watchdog = new FileWatcher(watchDirectory);
}

wss.on('connection', (ws) => {
    const location = url.parse(ws.upgradeReq.url, true);

    ws.on('message', (message) => {
        console.log(`received: ${message}`);
    });
    
    ws.send('something');
});

server.on('request', app);
server.listen(1234, () => { console.log(`listening on ${server.address().port}`) })
