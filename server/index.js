import path from 'path';
import url from 'url';
import http from 'http';
import express from 'express';
// import { uuidV1 } from 'uuid';
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

/**************************** FOLDER WATCHING ******************************/
const watchDirectory = process.argv[2];
console.log('watching folder:', watchDirectory);

let watchdog;
if (!watchDirectory) {
  console.error('missing folder argument');
} else {
  watchdog = new FileWatcher(watchDirectory);
}
/*__________________________________________________________________________*/


/**************************** EXPRESS SERVER ******************************/
app.use(express.static(__dirname + '/../public'));

// express server listening on port 1234
app.listen(1234, '0.0.0.0', () => {
  console.log(`express server listening on ${localIP}:1234`);
})

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(`${__dirname}/../public`) });
})
/*__________________________________________________________________________*/


/**************************** WEBSOCKET SERVER ******************************/
wss.on('connection', (ws) => {
    const location = url.parse(ws.upgradeReq.url, true);

    const id = require('uuid/v1')();
    console.log('new id', id)

    watchdog.addClient(id, ws);
    
    ws.send('Hello new client!');

    ws.on('message', (message) => {
        console.log(`received: ${message}`);
    });

    ws.on('close', () => {
        watchdog.removeClient(id);
    });
});

// websocket server is listening on port 5678
server.on('request', app);
server.listen(5678, '0.0.0.0', () => { console.log(`websocket server listening on ${server.address().port}`) })
/*__________________________________________________________________________*/




