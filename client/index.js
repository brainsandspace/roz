import visualization from './visualization.js';
import obj2dom from './utils/obj2dom.js';
import obj2hierarchy from './utils/obj2hierarchy.js';
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
  console.log('from this', data)
  if (Object.keys(data)[0] === 'dirObject') {

    dirObject = data.dirObject;

    const rootEl = obj2dom(dirObject, 'svg', 'g');
    console.log('rootEl', rootEl);
    document.body.querySelector('svg').appendChild(rootEl);
  }

  
  const objectHierarchy = obj2hierarchy(dirObject);

  console.log('to this', objectHierarchy);


  // my d3 stuff
  const svg = d3.select('svg');
  const margin = 20;
  const diameter = parseInt(svg.attr('width'));
  const g = svg.append('g').attr('transform', `translate(${diameter/2}, ${diameter/2})`);

  const color = d3.scaleLinear()
                  .domain([-1, 5])
                  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
                  .interpolate(d3.interpolateHcl);
  console.log('color', color);

  // create a new pack layout with the default settings
  const pack = d3.pack()
                 .size([diameter - margin, diameter - margin])
                 .padding(2);
  

  const root = d3.hierarchy(objectHierarchy)
                  .sum(d => {
                    console.log('d', d)
                    return d.size
                  })
                  .sort((a, b) => { console.log('a,b', a, b); return b.value - a.value; });

  console.log('root after root', root);

  let focus = root;
  const nodes = pack(root).descendants();
  let view;

  const circle = g.selectAll('circle')
                  .data(nodes)
                  .enter().append('circle')
                  .attr('class', d => d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root')
                  .attr('class', d => d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root')
                  .style('fill', d => d.children ? color(d.depth) : null )
                  .on('click', d => { if (focus !== d) {
                    zoom(d);
                    d3.event.stopPropagation();
                   }});

  const text = g.selectAll('text')
                .data(nodes)
                .enter().append('text')
                .attr('class', 'label')
                .style('fill-opacity', d => d.parent === root ? 1 : 0)
                .style('display', d => d.parent === root ? 'inline' : 'none')
                .text(d => d.data.name);
  
  const node = g.selectAll('circle,text');

  svg.style('background', color(-1))
     .on('click', () => { zoom(root); });
  
  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }


  console.log('root', root);
  // d3.json(dirObject, (err, root) => {
  //   if (err) console.error(err);
  // })


  // let i = 0;
  // while (document.querySelector(`.depth-${i}`)) {
  //   console.log(i);
  //   d3.selectAll(`.depth-${i}`).select((el) => {
  //     d3.select('svg')
  //     .append('circle')
  //     .attr('r', () => { console.log(i); return 100-i*10})
  //     .attr('cx', Math.random()*1000)
  //     .attr('cy', Math.random()*1000)
  //     // .data(passedIn => { console.log(passedIn); })
  //     .style('fill', `hsl(${i*60}, 50%, ${30+10*i}%)` )
  //     .style('opacity', '0.5');

  //   })
  //   i++;
  // }
})


console.log('websocket', ws)


document.addEventListener('click', () => {
  // visualization('flare.json');

})

