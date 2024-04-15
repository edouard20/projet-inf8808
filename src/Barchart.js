import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Barchart.css'; 
// import f1CarImage from './f1car.png'; 



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
      .attr('class', 'tooltip') 
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('text-align', 'center')
      .style('padding', '8px')
      .style('font', '12px sans-serif')
      .style('background', 'lightsteelblue')
      .style('border', '0px')
      .style('border-radius', '8px')
      .style('pointer-events', 'none'); 

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
              .html(`${d.name}<br/>Années actives: ${d.yearsActive}`)
              .style('left', `${event.pageX + 100}px`)
              .style('top', `${event.pageY}px`)
              .style('background-image', `url(${flagUrl})`)
              .style('background-size', 'cover')
              .transition()
              .duration(200)
              .style('opacity', 1);
          })
          .on('mouseout', () => {
            tooltip.transition()
              .duration(500)  
              .style('opacity', 0);
          });

          if (isVisible) {
            svg.selectAll(".bar")
              .data(data)
              .join("rect")
              .attr("class", "bar")
              .attr("x", 0)
              .attr("y", d => yScale(d.name))
              .attr("height", yScale.bandwidth())
              .attr("width", 0)
              .transition() 
              .duration(1000) 
              .attr("width", d => xScale(d.yearsActive)); 
          }

      }, [data, isVisible]);

      return <svg ref={svgRef}></svg>;
    };

  
export default Barchart;
