import path from 'path';
import url from 'url';
// import http from 'http';
import express from 'express';
import FileWatcher from './FileWatcher.js';
/** Tell the user their local IP address where they can point other devices to. */
let localIP;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  localIP = add;
  console.log(`point any browser on the same local network to ${add}:1234`);
});


const server = express();
server.use(express.static(__dirname + '/../public'));

server.listen(1234, '0.0.0.0', () => {
  console.log('listening on localhost:1234');
})

server.get('/', (req, res) => {
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


// var WebSocketServer = require('websocket').server;
var WebSocketServer = require('websocket').server;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;

// #!/usr/bin/env node
var http = require('http');

var server2 = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server2.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server2,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});