import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import { useMemo } from 'react';
import * as legend from './legend.js'
import '../HeatMap.css'
// import * as legend from './legend.js'
// import * as scales from './scales.js'
// import * as tooltip from './tooltip.js'
import d3Tip from 'd3-tip'

const margin = { top: 35, right: 200, bottom: 35, left: 200 }

const HeatMap = ({ data }) => {

    const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);
    const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);

    const svgSize = {
        width: 1200,
        height: 800
    }

    const graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
    }

    const svgContainerRef = useRef(null);

    useEffect(() => {
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

        const xAxis = svg.append("g")
           .call(d3.axisTop(x).tickSize(0));

        const y = d3.scaleBand()
                    .domain(allYGroups)
                    .range([0, graphSize.height])
                    .padding(0.1);

        const yAxis = svg.append("g")
           .call(d3.axisLeft(y).tickSize(0));

        xAxis.append("text")
            .attr("x", graphSize.width / 2)
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
           .data(data)
           .enter()
           .append("rect")
           .attr("x", d => x(d.x))
           .attr("y", d => y(d.y))
           .attr("width", x.bandwidth())
           .attr("height", y.bandwidth())
           .style("fill", d => colorScale(d.count))
           .on('mouseenter', function(event) {
            const rect = d3.select(event.currentTarget);
            const x = parseFloat(rect.attr('x')) + parseFloat(rect.attr('width')) / 2;
            const y = parseFloat(rect.attr('y')) + parseFloat(rect.attr('height')) / 2;

            rect
            .style('transform-origin', `${x}px ${y}px`)
            .transition()
            .duration(200)
            .attr('transform', 'scale(1.2)')
            .style('stroke', '#ffffff')
            .style('stroke-width', 2)
            .style('cursor', 'pointer');
          })
          .on('mouseleave', function(event) {
            d3.select(event.currentTarget)
              .transition()
              .duration(200)
              .attr('transform', 'scale(1)')
              .style('stroke', 'none')
              .style('stroke-width', 1);
           });

        legend.initGradient(colorScale);

        // set up legend bar and axis
        d3.select('.heatmap-svg')
            .append('rect')
            .attr('class', 'legend-bar');
        
        d3.select('.heatmap-svg')
            .append('g')
            .attr('class', 'legend-axis');

        legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale);

    }, [data]);

    return (
        <div ref={svgContainerRef} className="viz-container">
        </div>
    );
};

export default HeatMap;
