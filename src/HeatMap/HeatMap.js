import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useMemo } from 'react';
import * as legend from './legend.js'
import '../HeatMap.css'

const margin = { top: 35, right: 200, bottom: 35, left: 200 }

const HeatMap = ({ data }) => {
    const svgContainerRef = useRef(null);
    const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);
    const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);

    useEffect(() => {

        const svgSize = {
            width: 1200,
            height: 800
        }
    
        const graphSize = {
            width: svgSize.width - margin.right - margin.left,
            height: svgSize.height - margin.bottom - margin.top
        }
        const counts = data.map(d => d.count);
        const minValue = Math.min(...counts);
        const maxValue = Math.max(...counts);
        const colorScale = d3.scaleSequential(d3.interpolateOrRd)
                             .domain([minValue, maxValue]);
    
        d3.select(svgContainerRef.current).selectAll("svg").remove();
        
        const svg = d3.select(svgContainerRef.current)
                      .append("svg")
                      .attr("width", svgSize.width)
                      .attr("height", svgSize.height)
                      .append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.select(svgContainerRef.current)
                      .append('svg')
                      .attr('class', 'heatmap-svg');

        const x = d3.scaleBand()
                    .domain(allXGroups)
                    .range([0, graphSize.width])
                    .padding(0.1);
    
        const y = d3.scaleBand()
                    .domain(allYGroups)
                    .range([0, graphSize.height])
                    .padding(0.1);

                    const xAxis = svg.append("g")
           .call(d3.axisTop(x).tickSize(0));

        const yAxis = svg.append("g")
           .call(d3.axisLeft(y).tickSize(0));

        xAxis.append("text")
            .attr("x", graphSize.width / 1.75)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "end")
            .attr("font-size", "2em")
            .attr("fill", "white")
            .text("Ending Position")
        
        yAxis.append("text")
            .attr("x", -graphSize.width / 4)
            .attr("y", -margin.top)
            .attr("text-anchor", "end")
            .attr("font-size", "2em")
            .attr("fill", "white")
            .attr("transform", "rotate(-90)")
            .text("Starting Position")

        svg.selectAll("rect")
    
        svg.append("g").call(d3.axisTop(x).tickSize(0));
        svg.append("g").call(d3.axisLeft(y).tickSize(0));
    
        const groups = svg.selectAll(".rect-group")
                          .data(data)
                          .enter()
                          .append("g")
                          .attr("class", "rect-group")
                          .attr("transform", d => `translate(${x(d.x)}, ${y(d.y)})`);
    
        groups.append("rect")
              .attr("width", x.bandwidth())
              .attr("height", y.bandwidth())
              .style("fill", d => colorScale(d.count))
              .on('mouseenter', function(event, d) {
                    d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('transform', 'scale(1.2)')
                    .style('stroke', '#ffffff')
                    .style('stroke-width', 2)
                    .style('cursor', 'pointer');

                d3.select(this.parentNode)
                    .append('text')
                    .text(Math.round(d.count))
                    .attr('x', x.bandwidth() / 2)
                    .attr('y', y.bandwidth() / 2 + 10)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '1em')
                    .style('fill', d.count < 140 ? '#000000': '#ffffff')
                    .style('pointer-events', 'none');
              })
              .on('mouseleave', function(event) {
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('transform', '')
                    .style('stroke', 'none')
                    .style('stroke-width', 1);
    
                  d3.select(this.parentNode).select('text').remove();
              });
    
        legend.initGradient(colorScale);
        d3.select('.heatmap-svg')
            .append('rect')
            .attr('class', 'legend-bar');
            
        d3.select('.heatmap-svg')
            .append('g')
            .attr('class', 'legend-axis');
    
        legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale);
    }, [data, allXGroups, allYGroups]);
    

    return (
        <div ref={svgContainerRef} className="viz-container">
        </div>
    );
};

export default HeatMap;
