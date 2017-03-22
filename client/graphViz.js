import * as d3 from 'd3';
import createLegend from './legend.js';
import createColorPalette from './utils/createColorPalette.js';

const graphViz = (fileTypes, graph) => {

  const colorMap = createColorPalette(fileTypes);
  console.log([...colorMap])
  console.log('graph', graph);
  var svg = d3.select('#graph'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

const legend = createLegend(svg, colorMap);
console.log(legend);

  var simulation = d3
    .forceSimulation()
    .force(
      'link',
      d3.forceLink().id(function(d) {
        return d.id;
      })
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

  var link = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter()
    .append('line');

  var node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter()
    .append('circle')
    .attr('r', d => Math.log(d.size + 10))
    .style('fill',  d => colorMap.get(d.fileType))
    .call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

  node.append('title').text(function(d) {
    return d.id;
  });

  simulation.nodes(graph.nodes).on('tick', ticked);
  simulation.force('link').links(graph.links);

  function ticked() {
    link
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

    node
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      });
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
};

export default graphViz;
