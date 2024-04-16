import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Barchart.css'; 

const Barchart = ({ data }) => {
  const svgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 200 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const tooltip = 
    d3.select('body').append('div')
      .attr('class', 'tooltip');

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.yearsActive)-1, d3.max(data, d => d.yearsActive)])
        .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, height])
      .padding(0.4)

    svg.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(yScale));  

    svg.append("g")
        .style("font-size", 15)
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
          .tickFormat(d3.format("d"))
          .tickValues(d3.range(xScale.domain()[0], xScale.domain()[1] + 1)));
            
    svg.append("text")
      .attr("class", "axis-title")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`) 
      .style("text-anchor", "middle")
      .text("Active Years");

    svg.append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 30) 
      .attr("x", 0 - (height / 2))
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Pilotes");

    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => yScale(d.name))
      .attr("width", d => xScale(d.yearsActive))
      .attr("height", yScale.bandwidth())
      .on('mouseover', (event, d) => {
        const flagUrl = `https://flagsapi.com/${d.countryCode}/shiny/64.png`;
        tooltip
          .html(`<div><b>${d.name}</b><br/>Années actives : ${d.yearsActive}</div><img src="${flagUrl}" />`)
          .style('left', `${event.pageX + 100}px`)
          .style('top', `${event.pageY}px`)
          .transition()
          .duration(400)
          .style('opacity', 1);
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(400)  
          .style('opacity', 0);
      });

      if (isVisible) {
        const firstBar = svg.select(".bar").node();
        const firstBarX = parseFloat(firstBar.getAttribute("x"));
        const firstBarWidth = parseFloat(firstBar.getAttribute("width"));
        const firstBarY = parseFloat(firstBar.getAttribute("y"));
        const carImageWidth = 110; 

        svg.append("image")
          .attr("xlink:href", "f1_car_flip.png") 
          .attr("x", 0)
          .attr("y", firstBarY - 44)
          .attr("width", carImageWidth)
          .attr("height", 110)
          .transition()
          .duration(1500)
          .attr("x", firstBarX + firstBarWidth - 96);

        svg.selectAll(".bar")
          .data(data)
          .join("rect")
          .attr("class", "bar")
          .attr("x", 0)
          .attr("y", d => yScale(d.name))
          .attr("height", yScale.bandwidth())
          .attr("width", 0)
          .transition() 
          .duration(1500) 
          .attr("width", d => xScale(d.yearsActive)); 
      }
      }, [data, isVisible]);

      return <svg ref={svgRef}></svg>;
    };

export default Barchart;
