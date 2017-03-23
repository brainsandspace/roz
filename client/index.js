// import mikeViz from './mikeViz.js';
import GraphViz from './GraphViz.js';
import obj2dom from './utils/obj2dom.js';
import obj2graph from './utils/obj2graph.js';
import obj2hierarchy from './utils/obj2hierarchy.js';
import circlePack from './fileStructureViz/circlePack.js';
// // import forceGraph from './fileStructureViz/forceGraph.js';
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

let dirObject, objectHierarchy, watchDirectory;
let graph, graphViz, fileTypes; // = { nodes: [], links: [] };
let lastData;

ws.addEventListener('message', evt => {
  console.log('message from server:', evt.data);

  const data = JSON.parse(evt.data);

  switch (Object.keys(data)[0]) {
    case 'initialDirObject':
      dirObject = data.initialDirObject;
      const options = {
        diminishMedia: true,
        diminishBundle: true,
        diminishMin: true,
        diminishJSON: true,
        diminishDS_Store: true,
      };
      objectHierarchy = obj2hierarchy(dirObject, null, options);
      // circlePack(objectHierarchy);

      console.log('obj2graph',obj2graph);
      [fileTypes, graph] = obj2graph(dirObject);
      console.log('dat graph', graph);
      graphViz = new GraphViz(fileTypes, graph);

      // useful for testing
      // document.addEventListener('click', () => graphViz.update())
      break;

    case 'watchDirectory':
      watchDirectory = data.watchDirectory.replace(/\\/g, '/');
      console.log('watchD', watchDirectory);
      break;

    case 'change':
      if (lastData) {
        graphViz.update(`root/${lastData}`, `root/${data.change}`)
      }
      lastData = data.change;

      // let id = data.change.replace('.', 'DOT');

      // // account for difference between Unix and Windows file paths
      // id = id.replace(/\\/g, '/');
      // id = id.replace(`${watchDirectory}/`, '');
      // id = id.match(/([^/]*\/[^/]*$)/g) ? id.match(/([^/]*\/[^/]*$)/g)[0] : id;
      // id = id.replace('\/', 'SLASH');

      // document.querySelector(`#${id}`).style.fill = 'url(#eyeGradient)';
      break;

    default:
      break;
  }
});



