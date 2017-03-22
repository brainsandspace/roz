function createLegend(svg, map) {
  const myData = [...map].map(([fileType, color]) => ({
    fileType,
    color,
  }));

  console.log('myData', myData);

  const legend = svg
    .append('g')
    .selectAll('g')
    .data(myData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i*25})`)

    legend.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', d => d.color);

    legend.append('text').style('font-family', 'sans-serif').attr('x', 25).attr('y', 15).text(d => d.fileType);
  return legend;
}

export default createLegend;
