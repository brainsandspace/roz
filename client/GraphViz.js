import * as d3 from 'd3';
import createLegend from './legend.js';
import createColorPalette from './utils/createColorPalette.js';

class GraphViz {
  constructor(fileTypes, graph) {
    this.graph = graph;

    this.lastSource;
    this.lastTarget;

    this.colorMap = createColorPalette(fileTypes);

    this.svg = d3.select('#graph');
    let width = +this.svg.attr('width'), height = +this.svg.attr('height');

    this.legend = createLegend(this.svg, this.colorMap);

    this.simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3.forceLink().id(function(d) {
          return d.id;
        }),
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))

    // make the arrowhead
    this.svg
      .append('defs')
      .selectAll('marker')
      .data(['arrowhead']) // Different link/path types can be defined here
      .enter()
      .append('marker') // This section adds in the arrows
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');

    this.link = this.svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.graph.links)
      .enter()
      .append('line')
      .attr('class', d => d.linkType);

    this.node = this.svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.graph.nodes)
      .enter()
      .append('circle')
      .attr('r', d => Math.log(d.size + 10))
      .style('fill', d => this.colorMap.get(d.fileType))
      .call(
        d3
          .drag()
          .on('start', d => this.dragstarted(d))
          .on('drag', d => this.dragged(d))
          .on('end', d => this.dragended(d)),
      );

    this.node.append('title').text(d => d.id);

    this.simulation.nodes(this.graph.nodes).on('tick', () => this.ticked());
    this.simulation.force('link').links(this.graph.links);
  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  ticked() {
    this.link
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

    this.node
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      });
  }

  update(source, target) {
    let count = 0;
    this.graph.nodes.forEach(({ id }, ind) => {
      if (id === source) {
        this.lastSource = source;
        count++;
      }
      if (id === target) {
        this.lastTarget = target;
        this.graph.nodes[ind].incoming++;
        console.log(this.graph.nodes[ind].incoming);
        count++;
      }
    });

    if (count >= 2) {
      // if the link already exists, just make it fatter. Don't create a new link.
      // TODO make it fatter
      this.graph.links.push({
        source,
        target,
        linkType: 'change',
      });

      this.link = this.link.data(this.graph.links);
      this.link.exit().remove();
      this.link = this.link
        .enter()
        .append('line')
        .attr('class', d => d.linkType)
        .attr('marker-end', 'url(#arrowhead)')
        .merge(this.link);

      this.node = this.node.data(this.graph.nodes);
      this.node.exit().remove();
      this.node = this.node
        .enter()
        .append('circle')
        .attr('r', d => d.incoming != undefined ? Math.log((+d.incoming)*10 + 10)*2 : Math.log(d.size + 10))
        //   console.log(d, d.incoming);
        //   return Math.log(d.incoming * 10);
        // })
        .style('fill', d => this.colorMap.get(d.fileType))
        .call(
          d3
            .drag()
            .on('start', d => this.dragstarted(d))
            .on('drag', d => this.dragged(d))
            .on('end', d => this.dragended(d)),
        ).merge(this.node);

      // this.simulation.nodes(this.graph.nodes).on('tick', () => {
      //   this.ticked();
      // });
      this.simulation.force('link').links(this.graph.links);
      this.simulation.alphaTarget(0.3).restart();
      console.log(this.graph);
    }
  }
}

export default GraphViz;


