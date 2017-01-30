
// using native websockets in the browser
var ws = new WebSocket(`ws://${window.location.hostname}:5678`);

ws.addEventListener('open', evt => {
    console.log('open evt', evt);
    ws.send('Hello Server');
});

ws.addEventListener('message', evt => {
    console.log('message from server:', evt.data);
    ws.send(`send it back! ${evt.data}`)

    const el = document.createElement('div');
    el.className = 'node';
    el.innerHTML = `<p>${evt.data}</p>`;
    document.body.appendChild(el)
})


console.log('websocket', ws)
