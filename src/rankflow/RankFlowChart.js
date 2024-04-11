import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as legend from './legend.js'
import * as scales from './scales.js'
import * as preprocess from './preprocess.js'
import * as helpers from './helpers.js'

const RankFlowChart = ({ data }) => {

    const svgRef = useRef(null);

    useEffect(() => {

        let svgSize, graphSize

        const margin = { top: 30, right: 50, bottom: 50, left: 100 };

        svgSize = {
            width: window.innerWidth,
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

        const xScale = scales.setXScaleYears(graphSize.width, data)
        const yScale = scales.setYScaleRank(graphSize.height, data)

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
            // const maxRanking = preprocess.getMaxRankingFromData(data)
            const lineData = Object.keys(teamRankingData).map((year) => ({
                year: +year,
                rank: teamRankingData[year],
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
                .attr("fill", teamColor);

            const labelG = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top + svg.height})`);

        }, [data]);

        g.append("g")
            .attr("transform", `translate(0,${graphSize.height})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.format(".0f")))
            .selectAll("text")
            .attr("angle", -45)
            .attr("text-anchor", "end");

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(d3.format(".0f"))
                .tickFormat((d) => (Number.isInteger(d) ? d : ""))); //display only integer values

        const legendColorScale = d3.scaleOrdinal().domain(teamNames).range(colors);
        legend.drawLegend(legendColorScale, d3.select(svgRef.current), Math.round(svgSize.width * 0.8))

    }, [data]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};

export default RankFlowChart;
