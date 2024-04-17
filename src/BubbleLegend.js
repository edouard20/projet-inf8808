import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';
import './BubbleLegend.css';
import continentColors from './Preprocessing/continent_colors.json';
const BubbleLegend = ({ maxRadius, maxCrash }) => {
    const ref = useRef(null);
    const scale = useRef(null);
    useEffect(() => {
        if (!maxRadius) return;
        const svg = d3.select(ref.current);
        const scaleSvg = d3.select(scale.current);
        const width = +svg.attr('width');
        const height = +svg.attr('height');

        const scaleWidth = +scaleSvg.attr('width');
        const scaleHeight = +scaleSvg.attr('height');
        scaleSvg.selectAll('*').remove();

        const crashToDiameterScale = d3
            .scaleLinear()
            .domain([0, maxCrash])
            .range([0, maxRadius]);
        const axis = d3
            .axisBottom(crashToDiameterScale)
            .tickValues([0, maxCrash])
            .tickFormat(d3.format('d'));
        const gAxis = scaleSvg
            .append('g')
            .call(axis)
            .attr('transform', `translate(0, ${scaleHeight - 20})`);

        const axisWidth = gAxis.node().getBBox().width;

        const translateX = (scaleWidth - axisWidth) / 2;

        gAxis.attr(
            'transform',
            `translate(${translateX}, ${scaleHeight - 20})`,
        );
        scaleSvg.selectAll('path').style('stroke', 'white');
        scaleSvg.selectAll('line').style('stroke', 'white');
        scaleSvg.selectAll('text').style('fill', 'white');

        const colorScale = d3
            .scaleOrdinal()
            .domain(Object.keys(continentColors))
            .range(Object.values(continentColors));
        const legend = legendColor()
            .scale(colorScale)
            .shape('circle')
            .shapePadding(0)
            .labelOffset(10);

        const legendG = svg
            .append('g')
            .attr('class', 'legendColor')
            .call(legend);

        legendG
            .selectAll('g.cell')
            .attr('transform', (d, i) => `translate(${i * 140}, 0)`);

        const legendBBox = legendG.node().getBBox();

        const legendX = (width - legendBBox.width) / 2;
        const legendY = (height - legendBBox.height) / 2;

        legendG.attr('transform', `translate(${legendX}, ${legendY})`);
    }, [maxRadius]);

    return (
        <div className='legend-box'>
            <svg ref={scale} width='600' height='50' />
            <div style={{ marginTop: '-15px' }}>Crash Count</div>
            <svg ref={ref} width='1000' height='50' />
        </div>
    );
};

export default BubbleLegend;
