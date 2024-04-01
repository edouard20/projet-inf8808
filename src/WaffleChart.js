import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './WaffleChart.css';

function WaffleChart({ data }) {
  const d3Container = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateBars();
          observer.unobserve(entry.target);
        }
      });
    });
    
    if (d3Container.current && data) {
      observer.observe(d3Container.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [data]);

  const animateBars = () => {
    if (!data || !d3Container.current) return;

      const svg = d3.select(d3Container.current);

      const width = 600;
      const height = 600;
      const margin = { top: 30, right: 30, bottom: 80, left: 60 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.nationality))
        .range([margin.left, innerWidth + margin.left])
        .padding(0.3);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([innerHeight, 0]);

      const flagWidth = 30;
      const flagHeight = 30;

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
            .attr("width", 16)
            .attr("height", 16)
            .attr("x", (_, i) => (i % 5) * 15 - 2)
            .attr("y", (d) => -(Math.floor(d.index / 5) * 15) - 13);

          svg.append("text")
            .attr("class", "count-label")
            .text(`${count}`)
            .attr("x", x(nationality) + x.bandwidth() / 2 + 9)
            .attr("y", y(count) + margin.top + 40)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-weight", "bold");

          svg.append("image")
            .attr("xlink:href", flag)
            .attr("class", "flag-image")
            .attr("x", x(nationality) + x.bandwidth() / 2 - flagWidth / 2 + 9)
            .attr("y", y(count) + margin.top + 50)
            .attr("width", flagWidth)
            .attr("height", flagHeight);

          svg.selectAll(".nationality-label")
            .filter(d => d === data)
            .attr("font-weight", "bold");
        })
        .on("mouseout", function() {
          // const isMouseOverCountOrFlag = svg.select(".count-label").node() || svg.select(".flag-image").node();
          // if (!isMouseOverCountOrFlag) {
          d3.select(this)
            .selectAll("rect")
            .attr("fill", "blue")
            .attr("width", 12)
            .attr("height", 12)
            .attr("x", (_, i) => (i % 5) * 15)
            .attr("y", (d) => -(Math.floor(d.index / 5) * 15) - 11);
          svg.select(".count-label").remove();
          svg.select(".flag-image").remove();
          svg.selectAll(".nationality-label")
            .attr("font-weight", "normal");
          // }
        })
        .selectAll("rect")
        .data(d => Array.from({ length: Math.ceil(d.count / 5) }).flatMap((_, i) => Array.from({ length: Math.min(5, d.count - i * 5) }).map((_, j) => ({ index: i * 5 + j }))))
        .enter().append("rect")
        .attr("x", (_, i) => (i % 5) * 15)
        .attr("y", (d) => -(Math.floor(d.index / 5) * 15) - 11) 
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", "blue");

      svg.selectAll(".nationality-label")
        .data(data)
        .enter().append("text")
        .attr("class", "nationality-label")
        .text(d => d.nationality)
        .attr("x", d => x(d.nationality) + x.bandwidth() / 2 + 10)
        .attr("y", height - 35) 
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "15px")
        ;

      const yAxis = d3.axisLeft(y);
      svg.append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("color", "white")
          .style("font-size", "15px")
          .call(yAxis);
  };

  return (
    <svg ref={d3Container} width={600} height={600} className="waffle-chart"/>
  );
}

export default WaffleChart;
