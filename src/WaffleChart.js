import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function WaffleChart({ data }) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current && data) {
      // Select the container element
      const svg = d3.select(d3Container.current);

      // Set up properties for your visualization
      const width = 400;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Define x scale
      const x = d3.scaleBand()
        .domain(data.map(d => d.nationality))
        .range([margin.left, innerWidth + margin.left])
        .padding(0.1);

      // Define y scale
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([innerHeight, 0]);

      // Create individual cubes for each bar
      svg.selectAll("g.bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${x(d.nationality)}, ${margin.top})`)
        .selectAll("rect")
        .data(d => Array.from({ length: d.count }).map((_, i) => ({ index: i })))
        .enter().append("rect")
        .attr("x", 0) //(d, i) => Math.floor(i / 4) * 10) // Adjust cube stacking within columns
        .attr("y", (d, i) => innerHeight - i * 10)//(i % 4 + 1) * 10) // Adjust cube stacking within columns
        .attr("width", 8)
        .attr("height", 8)
        .attr("fill", "blue");

      // Add text labels
      svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .text(d => d.count)
        .attr("x", d => x(d.nationality) + x.bandwidth() / 2)
        .attr("y", d => y(d.count) + margin.top + 5) // Adjust text positioning
        .attr("text-anchor", "middle")
        .attr("fill", "white");
    }
  }, [data]);

  return (
    <svg ref={d3Container} width={400} height={400} />
  );
}

export default WaffleChart;
