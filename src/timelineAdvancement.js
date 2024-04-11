import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const F1CarAnimation = ({ currentYear }) => {
  const svgRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const svgWidth = svgRef.current.clientWidth;
    const arcWidth = svgWidth - 200;
    const arcHeight = 10;
    const arcStartX = 50;
    const arcStartY = 10;

    const arcPathD = `M ${arcStartX} ${arcStartY} A ${arcWidth / 2} ${arcHeight} 0 0 0 ${svgWidth - 50} ${arcStartY}`;
    const textArcPathD  = `M ${arcStartX} ${arcStartY} A ${arcWidth / 2} ${arcHeight} 0 0 0 ${svgWidth - 50} ${arcStartY}`;

    d3.select(svgRef.current).select("#arc-path").attr('d', arcPathD);

    const textPath = d3.select(svgRef.current).selectAll("#text-arc-path").data([0]);
    textPath.enter()
      .append('path')
      .merge(textPath)
      .attr('id', 'text-arc-path')
      .attr('d', textArcPathD)
      .attr('fill', 'none')
      .attr('stroke', 'none');

    const t = d3.scaleLinear()
                .domain([1950, 2023])
                .range([0, 1])
                .clamp(true)(currentYear);

    const pathNode = d3.select(svgRef.current).select("#arc-path").node();
    const pathLength = pathNode.getTotalLength();
    const point = pathNode.getPointAtLength(t * pathLength);

    d3.select(carRef.current)
      .attr('x', point.x - 75)
      .attr('y', point.y - 57.5);

    const decades = d3.range(1950, 2025, 5);
    const textSelection = d3.select(svgRef.current).selectAll('.decade-text').data(decades);
    textSelection.enter()
      .append('text')
      .merge(textSelection)
      .attr('class', 'decade-text')
      .style('font-size', '10px')
      .style('fill', 'white')
      .each(function(year, i) {
        d3.select(this).selectAll('textPath').data([year])
          .enter()
          .append('textPath')
          .merge(d3.select(this).select('textPath'))
          .attr('xlink:href', '#text-arc-path')
          .style("text-anchor", "middle")
          .attr("startOffset", `${(i / decades.length) * 103}%`)
          .text(year);
      });

  }, [currentYear]);

  return (
    <svg ref={svgRef} width="100%" height="150" style={{ backgroundColor: "black" }}>
      <path id="arc-path" fill="none" stroke="white" />
      <path id="text-arc-path" fill="none" stroke="none" /> {}
      <image ref={carRef} href="f1_car_flip.png" id="f1-car"
             width="150" height="115" /> {}
    </svg>
  );
};

export default F1CarAnimation;