import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import { useMemo } from 'react';
import * as legend from './legend.js'
// import * as legend from './legend.js'
// import * as scales from './scales.js'
// import * as tooltip from './tooltip.js'
import d3Tip from 'd3-tip'

const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };
const margin = { top: 35, right: 200, bottom: 35, left: 200 }

const width = 1000
const height = 800

const HeatMap = ({ data }) => {

    const svgRef = useRef(null);
    const colorScale = d3.scaleSequential(d3Chromatic.interpolateReds).nice();
    // const svgSize = { width: 800, height: 800 };

    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);
    const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);

    const svgSize = {
        width: 550,
        height: 550
    }

    const graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
    }

    useEffect (() => {
        const svg = d3.select(svgRef.current)
            .attr("class", "heatmap-svg")
            .attr("width", svgSize.width)
            .attr("height", svgSize.height);

        const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);   

        const counts = data.map((d) => d.count);
        const minValue = Math.min(...counts);
        const maxValue = Math.max(...counts);
        colorScale.domain([minValue, maxValue]);

        const groups = svg.selectAll('g').data(data).enter().append('g');

        groups
            .append('rect')
            .attr('Count', (d) => d.count)
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y);
        
        // update XScale
        const xData = data.map((d) => d.x);
        const xScale = d3.scaleBand().domain(xData.sort()).range([0, boundsWidth]);

        // update YScale
        const yData = data.map((d) => d.y);
        const yScale = d3.scaleBand().domain(yData.sort()).range([0, boundsHeight]);

        // draw X axis
        d3.select('.x').call(d3.axisTop(xScale));

        // draw Y axis
        d3.select('.y')
            .attr('transform', `translate(${boundsWidth}, 0)`)
            .call(d3.axisRight(yScale));
        
        // rotate Y ticks
        d3.selectAll('.y .tick text').attr('transform', 'rotate(-30)');

        // update rects
        const rects = d3.select('#heatmap').select('svg').select('#graph-g').selectAll('rect');

        rects
            .attr('x', (d) => xScale(d.x))
            .attr('y', (d) => yScale(d.y))
            .attr('width', (d) => xScale(d.x))
            .attr('height', (d) => xScale(d.y))
            .attr('fill', (d) => colorScale(d.count));

        legend.initGradient(colorScale)
        legend.initLegendBar()
        legend.initLegendAxis()

        legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale)

    }, [data])

    return (
        <svg ref={svgRef}></svg>
    )
};

// viz.updateXScale(xScale, data, graphSize.width, util.range)
//       viz.updateYScale(yScale, neighborhoodNames, graphSize.height)

//       viz.drawXAxis(xScale)
//       viz.drawYAxis(yScale, graphSize.width)

//       viz.rotateYTicks()
//       viz.updateRects(xScale, yScale, colorScale)

export default HeatMap;
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain(colorScale, data) {
    const counts = data.map((d) => d.Counts);
    const minValue = Math.min(...counts);
    const maxValue = Math.max(...counts);
    colorScale.domain([minValue, maxValue]);
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects(data) {
    // TODO : Append SVG rect elements
    const svg = d3
        .select('#heatmap')
        .select('svg')
        .select('#graph-g')
        .append('g');
    const groups = svg.selectAll('g').data(data).enter().append('g');
    groups
        .append('rect')
        .attr('Counts', (d) => d.Counts)
        .attr('Year', (d) => d.Plantation_Year)
        .attr('Name', (d) => d.Arrond_Nom);
}

export function drawLegend(colorScale, g, width) {
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale(xScale, data, width, range) {
    // TODO : Update X scale
    const xData = data.map((d) => d.Plantation_Year);

    xScale.domain(xData.sort()).range([0, width]);
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale(yScale, neighborhoodNames, height) {
    // TODO : Update Y scale
    // Make sure to sort the neighborhood names alphabetically
    const newDomain = neighborhoodNames.sort();

    yScale.domain(newDomain).range([0, height]);
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis(xScale) {
    // TODO : Draw X axis
    d3.select('.x').call(d3.axisTop(xScale));
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis(yScale, width) {
    // TODO : Draw Y axis
    d3.select('.y')
        .attr('transform', `translate(${width}, 0)`)
        .call(d3.axisRight(yScale));
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
export function rotateYTicks() {
    // TODO : Rotate Y ticks.
    d3.selectAll('.y .tick text').attr('transform', 'rotate(-30)');
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects(xScale, yScale, colorScale) {
    // TODO : Set position, size and fill of rectangles according to bound data
    const rects = d3
        .select('#heatmap')
        .select('svg')
        .select('#graph-g')
        .selectAll('rect');

    rects
        .attr('x', (d) => xScale(d.Plantation_Year))
        .attr('y', (d) => yScale(d.Arrond_Nom))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('fill', (d) => colorScale(d.Counts));
}
