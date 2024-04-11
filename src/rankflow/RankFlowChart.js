import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as legend from './legend.js'

const RankFlowChart = ({ data }) => {

    const svgRef = useRef(null);

    useEffect(() => {

        const svgWidth = 900;
        const svgHeight = 500;

        const margin = { top: 30, right: 50, bottom: 50, left: 100 };

        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr("width", svgWidth)
            .attr("height", svgHeight);


        const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([2013.5, 2023])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, 5])
            .range([height, 0]);

        const line = d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.rank));

        const colors = ["blue", "orange", "red", "purple", "green"];

        const teamNames = Object.keys(data);

        teamNames.forEach((teamName, i) => {
            const teamData = data[teamName];
            const lineData = Object.keys(teamData).map((year) => ({
                year: +year,
                rank: teamData[year],
            }));

            g.append("path")
                .datum(lineData)
                .attr("fill", "none")
                .attr("stroke", colors[i])
                .attr("stroke-width", 20)
                .attr("stroke-opacity", 0.8)
                .attr("d", line);

            g.selectAll("dot")
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", (d) => xScale(d.year))
                .attr("cy", (d) => yScale(d.rank))
                .attr("r", 20)
                .attr("fill", colors[i]);

            const labelG = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top + height})`);

        }, [data]);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("angle", -45)
            .attr("text-anchor", "end");

        g.append("g")
            .call(d3.axisLeft(yScale)
                .tickFormat((d) => (Number.isInteger(d) ? d : ""))); //display only integer values

        const legendColorScale = d3.scaleOrdinal().domain(teamNames).range(colors);
        legend.drawLegend(legendColorScale, d3.select(svgRef.current))

    }, [data]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};

export default RankFlowChart;
