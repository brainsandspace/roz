import http from 'http';
// import net from 'net';
// const net = require('net');
import url from 'url';

// TODO figure out how to get this file based on package.json config variable
import txt from '/Development-B/Roz/roz_well.txt';
console.log(txt);

const files = txt.split(/\r?\n/);

files.forEach(fileString => {
  const el = document.createElement('div');
  el.className = 'node';
  el.innerHTML = `<p>${fileString}</p>`;
  document.body.appendChild(el)
});









var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080/', 'echo-protocol');