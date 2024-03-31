import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function WaffleChart({ data }) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current && data) {
      const svg = d3.select(d3Container.current);

      const width = 400;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 60, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.nationality))
        .range([margin.left, innerWidth + margin.left])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([innerHeight, 0]);

      // Create individual cubes for each bar
      svg.selectAll("g.bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${x(d.nationality)}, ${margin.top + innerHeight})`) // Adjust initial translation
        .selectAll("rect")
        .data(d => Array.from({ length: Math.ceil(d.count / 5) }).flatMap((_, i) => Array.from({ length: Math.min(5, d.count - i * 5) }).map((_, j) => ({ index: i * 5 + j }))))
        .enter().append("rect")
        .attr("x", (d, i) => (i % 5) * 10)
        .attr("y", (d, i) => -(Math.floor(d.index / 5) * 10) - 5) // Adjust y position to be negative
        .attr("width", 8)
        .attr("height", 8)
        .attr("fill", "blue");

      // svg.selectAll("text")
      //   .data(data)
      //   .enter().append("text")
      //   .text(d => d.count)
      //   .attr("x", d => x(d.nationality) + x.bandwidth() / 2 - 2)
      //   .attr("y", d => -(y(d.count)) + margin.top + innerHeight) 
      //   .attr("text-anchor", "middle")
      //   .attr("fill", "white");

      svg.selectAll(".nationality-label")
        .data(data)
        .enter().append("text")
        .attr("class", "nationality-label")
        .text(d => d.nationality)
        .attr("x", d => x(d.nationality) + x.bandwidth() / 2)
        .attr("y", height - 35) 
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "12px")
        .style("font-weight", "bold");

      const yAxis = d3.axisLeft(y);
      svg.append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("color", "white")
          .call(yAxis);
    }
  }, [data]);

  return (
    <svg ref={d3Container} width={400} height={400} />
  );
}

export default WaffleChart;
