import visualization from './visualization.js';
import obj2dom from './utils/obj2dom.js';
import obj2hierarchy from './utils/obj2hierarchy.js';
import circlePack from './visualization/circlePack.js';
import * as d3 from 'd3';

// import style
import './styles/main.scss';

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

  if (Object.keys(data)[0] === 'initialDirObject') {

    dirObject = data.initialDirObject;

    // const rootEl = obj2dom(dirObject, 'svg', 'g');
    // document.body.querySelector('svg').appendChild(rootEl);
    const options = {
      diminishMedia:    true,
      diminishBundle:   true, 
      diminishMin:      true, 
      diminishDS_Store: true,
    };
    const objectHierarchy = obj2hierarchy(dirObject, diminishMedia, diminishBundle, diminishMin);
    circlePack(objectHierarchy);
}

});