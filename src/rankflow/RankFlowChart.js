import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as legend from './legend.js'
import * as scales from './scales.js'
import * as tooltip from './tooltip.js'
import d3Tip from 'd3-tip'


/**
 * Draws the F1 teams Rankflow chart.
 *
 * @param {*} data The F1 tems preprocessed data
 */
export const F1TeamsRankFlowChart = ({ data }) => {

    const svgRef = useRef(null);

    useEffect(() => {

        let svgSize, graphSize

        const margin = { top: 30, right: 50, bottom: 50, left: 100 };

        svgSize = {
            width: window.innerWidth - 20,
            height: 600
        }

        graphSize = {
            width: Math.round(svgSize.width * 0.8) - margin.right - margin.left,
            height: svgSize.height - margin.bottom - margin.top
        }

        const svg = d3.select(svgRef.current)
            .attr("width", svgSize.width)
            .attr("height", svgSize.height);

        const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .html(function (d) {
                return tooltip.getF1TeamsTooltipHtmlContent(d)
            });
        g.call(tip)

        const xScale = scales.setXScaleRankflow(graphSize.width, data)
        const yScale = scales.setYScaleRankRankflow(graphSize.height, data)

        const line = d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.rank))
            .curve(d3.curveMonotoneX)

        const colors = Object.keys(data).map((team) => data[team]['color'])

        const teamNames = Object.keys(data);

        teamNames.forEach((teamName, i) => {
            const teamColor = data[teamName]['color'];
            const teamRankingData = data[teamName]['ranking'];
            const lineData = Object.keys(teamRankingData).map((year) => ({
                year: +year,
                rank: teamRankingData[year],
                teamName: teamName,
            }));

            g.append("path")
                .datum(lineData)
                .attr("fill", "none")
                .attr("stroke", teamColor)
                .attr("stroke-width", 30)
                .attr("stroke-opacity", 0.5)
                .attr("d", line);

            g.selectAll("dot")
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", (d) => xScale(d.year))
                .attr("cy", (d) => yScale(d.rank))
                .attr("r", 20)
                .attr("fill", teamColor)
                .on('mouseover', (event, d) => {
                    d3.select(event.currentTarget)
                        .transition()
                        .duration(200)
                        .attr('r', 25)
                        .style('stroke', 'white')
                        .style('stroke-width', 2)
                        .style('opacity', 1)
                        .style('cursor', 'pointer');

                    const content = tooltip.getF1TeamsTooltipHtmlContent(d)
                    d3.select(event.currentTarget).style('opacity', 1)
                    tip.offsetX = event.offsetX
                    tip.offsetY = event.offsetY
                    tip.html(content)
                    tip.style('left', event.pageX + 'px')
                        .style('top', event.pageY + 'px')
                        .style('font-weight', 300)
                        .show(data, event.currentTarget)
                })
                .on('mouseout', (event) => {
                    d3.select(event.currentTarget)
                        .transition()
                        .duration(200)
                        .attr('r', 20)
                        .style('stroke', 'none')
                        .style('opacity', 0.7)
                        .style('cursor', 'none');
                    tip.hide()
                })

        }, [data]);

        g.append("g")
            .attr("transform", `translate(0,${graphSize.height})`)
            .call(d3.axisBottom(xScale)
                .tickFormat((d, i) => i > 0 ? d3.format(".0f")(d) : null))
            .selectAll("text")
            .attr("angle", -45)
            .attr("text-anchor", "center")
            .style("font-size", "16px");

        g.append("g")
        .call(d3.axisLeft(yScale)
            .tickValues([1, 2, 3, 4, 5])
            .tickFormat(d => d))
        .selectAll("text")
        .style("font-size", "16px");

        const legendColorScale = d3.scaleOrdinal().domain(teamNames).range(colors);
        legend.drawRankflowChartLegend(legendColorScale, d3.select(svgRef.current), Math.round(svgSize.width * 0.8))

    }, [data]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};

/**
 * Draws the top dominant Drivers Rankflow chart.
 *
 * @param {*} data The top drovers preprocessed data
 */
export const TopDriversRankFlowChart = ({ data }) => {

    const svgRef = useRef(null);

    useEffect(() => {

        let svgSize, graphSize

        const margin = { top: 30, right: 50, bottom: 50, left: 100 };

        svgSize = {
            width: window.innerWidth - 20,
            height: 600
        }

        graphSize = {
            width: Math.round(svgSize.width * 0.8) - margin.right - margin.left,
            height: svgSize.height - margin.bottom - margin.top
        }

        const svg = d3.select(svgRef.current)
            .attr("width", svgSize.width)
            .attr("height", svgSize.height);

        const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .html(function (d) {
                return tooltip.getDriversTooltipHtmlContent(d)
            });
        g.call(tip)

        const xScale = scales.setXScaleRankflow(graphSize.width, data)
        const yScale = scales.setYScaleRankRankflow(graphSize.height, data)

        const line = d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.rank))
            .curve(d3.curveMonotoneX)

        const colors = Object.keys(data).map((key) => data[key]['color'])

        const driverNames = Object.keys(data);

        driverNames.forEach((driverName, i) => {
            const driverColor = data[driverName]['color'];
            const driverRankingData = data[driverName]['ranking'];
            const driverPointsData = data[driverName]['points'];
            const driverAllTimePoints = data[driverName]['allTimePoints'];
            const lineData = Object.keys(driverRankingData).map((year) => ({
                year: +year,
                rank: driverRankingData[year],
                name: driverName,
                points: driverPointsData[year],
                allTimePoints: driverAllTimePoints
            }));

            g.append("path")
                .datum(lineData)
                .attr("fill", "none")
                .attr("stroke", driverColor)
                .attr("stroke-width", 30)
                .attr("stroke-opacity", 0.5)
                .attr("d", line);

            g.selectAll("dot")
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", (d) => xScale(d.year))
                .attr("cy", (d) => yScale(d.rank))
                .attr("r", 20)
                .attr("fill", driverColor)
                .on('mouseover', (event, d) => {
                    d3.select(event.currentTarget)
                        .transition()
                        .duration(200)
                        .attr('r', 25)
                        .style('stroke', 'white')
                        .style('stroke-width', 2)
                        .style('opacity', 1)
                        .style('cursor', 'pointer');

                    const content = tooltip.getDriversTooltipHtmlContent(d)
                    d3.select(event.currentTarget).style('opacity', 1)
                    tip.offsetX = event.offsetX
                    tip.offsetY = event.offsetY
                    tip.html(content)
                    tip.style('left', event.pageX + 'px')
                        .style('top', event.pageY + 'px')
                        .style('font-weight', 300)
                        .show(data, event.currentTarget)
                })
                .on('mouseout', (event) => {
                    d3.select(event.currentTarget)
                        .transition()
                        .duration(200)
                        .attr('r', 20)
                        .style('stroke', 'none')
                        .style('opacity', 0.7)
                        .style('cursor', 'none');
                    tip.hide()
                })

        }, [data]);

        g.append("g")
            .attr("transform", `translate(0,${graphSize.height})`)
            .call(d3.axisBottom(xScale)
                .tickFormat((d, i) => i > 0 ? d3.format(".0f")(d) : null))
            .selectAll("text")
            .attr("angle", -45)
            .attr("text-anchor", "center")
            .style("font-size", "16px");

        g.append("g")
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d))
        .selectAll("text")
        .style("font-size", "16px");

        const legendColorScale = d3.scaleOrdinal().domain(driverNames).range(colors);
        legend.drawRankflowChartLegend(legendColorScale, d3.select(svgRef.current), Math.round(svgSize.width * 0.8))

    }, [data]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};
