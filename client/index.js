import visualization from './visualization.js';
import obj2dom from './utils/obj2dom.js'
import * as d3 from 'd3';
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
  if (Object.keys(data)[0] === 'dirObject') {

    dirObject = data.dirObject;

    const rootEl = obj2dom(dirObject, 'svg', 'g');
    console.log('rootEl', rootEl);
    document.body.querySelector('svg').appendChild(rootEl);
  }


  let i = 0;
  while (document.querySelector(`.depth-${i}`)) {
    console.log(i);
    d3.selectAll(`.depth-${i}`).select((el) => {
      d3.select('svg')
      .append('circle')
      .attr('r', () => { console.log(i); return 100-i*10})
      .attr('cx', Math.random()*1000)
      .attr('cy', Math.random()*1000)
      // .data(passedIn => { console.log(passedIn); })
      .style('fill', `hsl(${i*60}, 50%, ${30+10*i}%)` )
      .style('opacity', '0.5');

    })
    i++;
  }
})


console.log('websocket', ws)


document.addEventListener('click', () => {
  // visualization(dirObject);

})

