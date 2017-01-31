// circle packing based heavily on zoomable circle packing d3 example
import * as d3 from 'd3';

const circlePack = (objHierarchy) => {
   // my d3 stuff
  const svg = d3.select('svg');
  const margin = 20;
  const diameter = parseInt(svg.attr('width'));
  const g = svg.append('g').attr('transform', `translate(${diameter/2}, ${diameter/2})`);

  const color = d3.scaleLinear()
                  .domain([-5, 5])
                  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
                  .interpolate(d3.interpolateHcl);
  console.log('color', color);

  // create a new pack layout with the default settings
  const pack = d3.pack()
                 .size([diameter - margin, diameter - margin])
                 .padding(2);
  

  const root = d3.hierarchy(objHierarchy)
                  .sum(d => {
                    console.log(d.size);
                    return d.size
                  })
                  .sort((a, b) => b.value - a.value);

  console.log('root after root', root);

  let focus = root;
  const nodes = pack(root).descendants();
  let view;

  const circle = g.selectAll('circle')
                  .data(nodes)
                  .enter().append('circle')
                  .attr('class', d => {
                    let cl = d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root';

                    // if the file is an image or other kind of multimedia, we want to at least change the color of it so we know it isn't that vital to the codebase
                    if (!d.children && d.data.name.match(/\.png|\.jpg|\.svg|\.mp4|\.webm|\.ogv/i)) cl = `${cl} media`;

                    // if the file is a bundle, we should denote that differently also
                    if (!d.children && d.data.name.match(/.*bundle\.js/)) cl = `${cl} bundle`;
                    
                    return cl;
                  })
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
}

export default circlePack;