import visualization from './visualization.js';
import obj2div from './utils/obj2div.js'
// using native websockets in the browser
var ws = new WebSocket(`ws://${window.location.hostname}:5678`);

ws.addEventListener('open', evt => {
    console.log('open evt', evt);
    ws.send('Hello Server');
});

let dirObject;
ws.addEventListener('message', evt => {
    console.log('message from server:', evt.data);
    const data = JSON.parse(evt.data);
    console.log(JSON.parse(evt.data))
    if (Object.keys(data)[0] === 'dirObject') {

        console.log('got dirobject')
        dirObject = data.dirObject;

        const rootEl = obj2div(dirObject);
        console.log('rootEl', rootEl);
    }
    ws.send(`send it back! ${evt.data}`)

    const el = document.createElement('div');
    el.className = 'node';
    el.innerHTML = `<p>${evt.data}</p>`;
    document.body.appendChild(el)
})


console.log('websocket', ws)


document.addEventListener('click', () => {
    // visualization(dirObject);

})

