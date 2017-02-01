import visualization from './visualization.js';
import obj2dom from './utils/obj2dom.js';
import obj2hierarchy from './utils/obj2hierarchy.js';
import circlePack from './visualization/circlePack.js';
import mobileOrTablet from './utils/mobileOrTablet.js';
import * as d3 from 'd3';
import './utils/objectEntries.js'; // shim for es7 Object.entries

// import style
import './styles/main.scss';

// using native websockets in the browser
var ws = new WebSocket(`ws://${window.location.hostname}:5678`);

ws.addEventListener('open', evt => {
  console.log('open evt', evt);
  ws.send('Hello Server');
});

let dirObject,
    objectHierarchy,
    watchDirectory;
ws.addEventListener('message', evt => {
  console.log('message from server:', evt.data);

  const data = JSON.parse(evt.data);

  switch (Object.keys(data)[0]) {

    case 'initialDirObject':
      dirObject = data.initialDirObject;
      const options = {
        diminishMedia:    true,
        diminishBundle:   true, 
        diminishMin:      true,
        diminishJSON:     true, 
        diminishDS_Store: true,
      };
      objectHierarchy = obj2hierarchy(dirObject, null, options);
      circlePack(objectHierarchy);
      break;
    
    case 'watchDirectory':
        watchDirectory = data.watchDirectory.replace(/\\/g, '/');
        console.log('watchD', watchDirectory)
      break;

    case 'change': 
      console.log('this is a change', data, data);
      let id = data.change.replace('.', 'DOT');

      // account for difference between Unix and Windows file paths 
      id = id.replace(/\\/g, '/');
      id = id.replace(`${watchDirectory}/`, '');
      id = id.match(/([^/]*\/[^/]*$)/g) ? id.match(/([^/]*\/[^/]*$)/g)[0] : id;

      id =  id.replace('\/', 'SLASH');

      console.log('id', id);
      document.querySelector(`#${id}`).style.fill = 'url(#eyeGradient)';
      // document.querySelector(`#${id}`).style.filter = 'url(#specular)';
             
      break;



    default: break;
  }
});


// window.addEventListener('resize', () => { circlePack(objectHierarchy)})