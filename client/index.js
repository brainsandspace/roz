
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


// using native websockets in the browser
var ws = new WebSocket('ws://localhost:1234');

ws.addEventListener('open', evt => {
    console.log('open evt', evt);
    ws.send('Hello Server');
});

ws.addEventListener('message', evt => {
    console.log('message from server:', evt.data);
    ws.send(`send it back! ${evt.data}`)
})


console.log('websocket', ws)
