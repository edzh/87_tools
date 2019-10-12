import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default function Chart() {
  useEffect(() => {
    drawChart();
  }, []);

  function drawChart() {
    const h = 300;
    const w = 300;

    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('margin-left', 200);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 25)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 25)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');
  }

  return <div></div>;
}
