import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import important_crashes from './bubble_preprocess/important_crashes.json';
import './timelineAdvancement.css';
/**
 * Component for the timeline under the bubble legend.
 *
 * @param {*} currentYear The current displayed year
 */
const BubbleChartTimeline = ({ currentYear }) => {
    const svgRef = useRef(null);
    const carRef = useRef(null);

    useEffect(() => {
        const svgWidth = svgRef.current.clientWidth;
        const arcWidth = svgWidth - 200;

        const arcPathD = `M 50 10 A ${arcWidth / 2} 10 0 0 0 ${
            svgWidth - 50
        } 10`;
        d3.select(svgRef.current).select('#arc-path').attr('d', arcPathD);

        const textArcPathD = arcPathD;

        d3.select(svgRef.current)
            .select('#text-arc-path')
            .attr('d', textArcPathD);
        const t = d3
            .scaleLinear()
            .domain([1950, 2023])
            .range([0, 1])
            .clamp(true);

        const pathNode = d3.select(svgRef.current).select('#arc-path').node();
        const pathLength = pathNode.getTotalLength();
        const point = pathNode.getPointAtLength(t(currentYear) * pathLength);

        d3.select(carRef.current)
            .attr('x', point.x - 75)
            .attr('y', point.y - 57.5);

        const decades = d3.range(1950, 2025, 5);

        const textSelection = d3
            .select(svgRef.current)
            .selectAll('.decade-text')
            .data(decades);
            
        textSelection
            .enter()
            .append('text')
            .merge(textSelection)
            .attr('class', 'decade-text')
            .style('font-size', '10px')
            .style('fill', 'white')
            .append('textPath')
            .attr('xlink:href', '#text-arc-path')
            .style('text-anchor', 'middle')
            .attr('startOffset', (d, i) => `${(i / decades.length) * 103}%`)
            .text((d) => d);

        const markers = d3
            .select(svgRef.current)
            .selectAll('.crash-marker-group')
            .data(important_crashes)
            .enter()
            .append('g')
            .attr('class', 'crash-marker-group')
            .attr('transform', (crash) => {
                const infoPoint = pathNode.getPointAtLength(
                    t(crash.year) * pathLength,
                );
                return `translate(${infoPoint.x}, ${infoPoint.y})`;
            });
        markers
            .append('text')
            .attr('class', 'material-icons')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', 'white')
            .style('font-family', 'Material Icons')
            .style('font-size', '20px')
            .text('info')
            .style('cursor', 'pointer');

        markers
            .on('mouseover', function (event, crash) {
                d3.select('#tooltip-info')
                    .style('display', 'block')
                    .html(
                        `<div>Driver: ${crash.name}</div>
                         <div>Year: ${crash.year}</div>
                         <div>Location: ${crash.location}</div>
                         <img src="${crash.src}" alt="Crash image" style="width:175px; height: auto;">`,
                    );
            })
            .on('mousemove', function (event) {
                const tooltip = d3.select('#tooltip-info');
                const tooltipWidth = tooltip
                    .node()
                    .getBoundingClientRect().width;
                const pageWidth = window.innerWidth;
                if (event.pageX + tooltipWidth + 10 > pageWidth) {
                    tooltip.style(
                        'left',
                        event.pageX - tooltipWidth - 10 + 'px',
                    );
                } else {
                    tooltip.style('left', event.pageX + 10 + 'px');
                }
                tooltip.style('top', event.pageY - 200 + 'px');
            })
            .on('mouseout', function () {
                d3.select('#tooltip-info').style('display', 'none');
            })
            .on('click', function (event, crash) {
                if (crash.more && typeof crash.more === 'string') {
                    window.open(crash.more, '_blank');
                }
            });
    }, [currentYear]);

    return (
        <>
            <svg
                ref={svgRef}
                width='100%'
                height='150'
                style={{ backgroundColor: 'black' }}
            >
                <path id='arc-path' fill='none' stroke='white' />
                <path id='text-arc-path' fill='none' stroke='none' />
                <image
                    ref={carRef}
                    href='f1_car_flip.png'
                    id='f1-car'
                    width='150'
                    height='115'
                />
            </svg>
            <div id='tooltip-info'></div>
            <link
                href='https://fonts.googleapis.com/icon?family=Material+Icons'
                rel='stylesheet'
            />
        </>
    );
};

export default BubbleChartTimeline;
