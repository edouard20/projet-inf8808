import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './WaffleChart.css';

function WaffleChart({ data, winner_data=[], colors=true, hover=true, animate=true }) {
  const d3Container = useRef(null);

  useEffect(() => {
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

      const customColors = ['#012169', '#BF0A30', '#027339', '#005CA8', '#edbe02', '#92D050'];

      const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.nationality))
        .range(customColors);

      const flagWidth = 30;
      const flagHeight = 30;

      svg.selectAll("g.bar")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", (d) => `translate(${x(d.nationality)}, ${margin.top + innerHeight})`)
        .on("mouseover", function (_, data) {
          if (!hover) return;
          let count;
          let yFlag;
          let yLabel;
          const nationality = data.nationality;
          const flag = `/flags/${nationality}.png`;

          if (winner_data.length > 0) {
            const winner = winner_data.find(winner => winner.nationality === nationality);
            count = winner ? winner.count : data.count;
            yLabel = y(count) + margin.top - 50;
            yFlag = y(count) + margin.top - 40;
            count = (count / data.count * 100).toFixed(2) + "%";
          } else {
            count = data.count;
            yLabel = y(count) + margin.top + 40;
            yFlag = y(count) + margin.top + 50;
          }

          d3.select(this)
            .selectAll("rect")
            .attr("width", 16)
            .attr("height", 16)
            .attr("x", (_, i) => (i % 5) * 15 - 2)
            .attr("y", (d) => -(Math.floor(d.index / 5) * 15) - 13);

          svg.append("text")
            .attr("class", "count-label")
            .text(`${count}`)
            .attr("x", x(nationality) + x.bandwidth() / 2 + 9)
            .attr("y", yLabel)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-weight", "bold");

          svg.append("image")
            .attr("xlink:href", flag)
            .attr("class", "flag-image")
            .attr("x", x(nationality) + x.bandwidth() / 2 - flagWidth / 2 + 9)
            .attr("y", yFlag) 
            .attr("width", flagWidth)
            .attr("height", flagHeight);

          svg.selectAll(".nationality-label")
            .filter((d) => d === data)
            .attr("font-weight", "bold");
        })
        .on("mouseout", function (event) {
          if (!hover) return;
          let isMouseOverCount = false;
          let isMouseOverFlag = false;

          if (svg.select(".count-label").node()) {
            const countElement = svg.select(".count-label").node();
            const isMouseOverCountX = event.clientX >= countElement.getBoundingClientRect().left &&
                                      event.clientX <= countElement.getBoundingClientRect().right;
            const isMouseOverCountY = event.clientY >= countElement.getBoundingClientRect().top &&
                                      event.clientY <= countElement.getBoundingClientRect().bottom;
            isMouseOverCount = isMouseOverCountX && isMouseOverCountY;
          }
        
          // check if mouse is over the flag 
          if (svg.select(".flag-image").node()) {
            const flagElement = svg.select(".flag-image").node();
            const isMouseOverFlagX = event.clientX >= flagElement.getBoundingClientRect().left &&
                                      event.clientX <= flagElement.getBoundingClientRect().right;
            const isMouseOverFlagY = event.clientY >= flagElement.getBoundingClientRect().top &&
                                      event.clientY <= flagElement.getBoundingClientRect().bottom;
            isMouseOverFlag = isMouseOverFlagX && isMouseOverFlagY;
          }
        
          if (!isMouseOverCount && !isMouseOverFlag) {
            d3.select(this)
              .selectAll("rect")
              .attr("width", 12)
              .attr("height", 12)
              .attr("x", (_, i) => (i % 5) * 15)
              .attr("y", (d) => -(Math.floor(d.index / 5) * 15) - 11);
              
            svg.selectAll(".count-label").remove();
            svg.selectAll(".flag-image").remove();
            svg.selectAll(".nationality-label").attr("font-weight", "normal");
          }
        })
        .selectAll("rect")
        .data((d) => {
          const cubes = Array.from({ length: Math.ceil(d.count / 5) })
          .flatMap((_, i) => Array.from({ length: Math.min(5, d.count - i * 5) })
          .map((_, j) => ({ index: i * 5 + j, nationality: d.nationality }))
          )
          cubes.forEach((cube, index) => {
            if (winner_data.length > 0) {
              for (let i = 0; i < winner_data.length; i++) {
                if (winner_data[i].nationality === d.nationality) {
                  cube.fill = index < winner_data[i].count ? colorScale(d.nationality) : "grey";
                }
              }
            }
            else {
              if (colors) cube.fill = colorScale(d.nationality); 
              else cube.fill = 'black';
            }
          });
          return cubes;
        }
        )
        .enter()
        .append("rect")
        .attr("x", (_, i) => (i % 5) * 15)
        .attr("y", (d) => -(Math.floor(d.index / 5) * 15) - 11)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", (d) => d.fill)
        .attr("data-animate", animate ? "true" : "false");

      svg.selectAll(".nationality-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "nationality-label")
        .text(d => d.nationality)
        .attr("x", d => x(d.nationality) + x.bandwidth() / 2 + 10)
        .attr("y", height - 35) 
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "15px");

      const yAxis = d3.axisLeft(y);
      svg.append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("color", "white")
          .style("font-size", "15px")
          .call(yAxis);
    };

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
  }, [data, d3Container, winner_data, colors, hover, animate]);

  return (
    <svg ref={d3Container} width={600} height={600} className="waffle-chart"/>
  );
}

export default WaffleChart;
