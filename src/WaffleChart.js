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

      const flagWidth = 30;
      const flagHeight = 30;

      // Create individual cubes for each bar
      svg.selectAll("g.bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${x(d.nationality)}, ${margin.top + innerHeight})`)
        .on("mouseover", function(_, data) {
          const count = data.count;
          const nationality = data.nationality;
          const flag = `/flags/${nationality}.png`
          d3.select(this)
            .selectAll("rect")
            .attr("fill", "#2515ff")
            .attr("width", 11)
            .attr("height", 11);
          svg.append("text")
            .attr("class", "count-label")
            .text(`${count}`)
            .attr("x", x(nationality) + x.bandwidth() / 2)
            .attr("y", y(count) + margin.top + 25)
            .attr("text-anchor", "middle")
            .attr("fill", "white");

          svg.append("image")
            .attr("xlink:href", flag)
            .attr("class", "flag-image")
            .attr("x", x(nationality) + x.bandwidth() / 2 - flagWidth / 2)
            .attr("y", y(count) + margin.top + 40)
            .attr("width", flagWidth)
            .attr("height", flagHeight);
        })
        .on("mouseout", function() {
          d3.select(this)
            .selectAll("rect")
            .attr("fill", "blue")
            .attr("width", 8)
            .attr("height", 8);
          svg.select(".count-label").remove();
          svg.select(".flag-image").remove();
        })
        .selectAll("rect")
        .data(d => Array.from({ length: Math.ceil(d.count / 5) }).flatMap((_, i) => Array.from({ length: Math.min(5, d.count - i * 5) }).map((_, j) => ({ index: i * 5 + j }))))
        .enter().append("rect")
        .attr("x", (d, i) => (i % 5) * 10)
        .attr("y", (d, i) => -(Math.floor(d.index / 5) * 10) - 5) 
        .attr("width", 8)
        .attr("height", 8)
        .attr("fill", "blue");

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
