import React, { Component } from 'react';
import * as d3 from 'd3';
export default class Bar extends Component {
  componentDidMount() {
    this.createBarChart();
  }

  createBarChart = () => {
    const { maxValue, value } = this.props;
    const node = this.node;
    const xScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, '100%']);

    d3.select(node)
      .selectAll('rect')
      .data([value])
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('width', d => xScale(d))
      .attr('height', 50)
      .transition()
      .duration(750)
      .attr('fill', d => (d > 20000 ? '#1890ff' : 'rgba(24, 144, 255, 0.5)'));
  };

  render() {
    return <svg ref={node => (this.node = node)} width="100%" height={50} />;
  }
}
