import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import * as legend from './legend.js';
import * as scales from './scales.js';
import * as tooltip from './tooltip.js';
import d3Tip from 'd3-tip';

function useChartSetup(data) {
    const svgRef = useRef(null);
    const margin = { top: 30, right: 50, bottom: 50, left: 100 };
    const svgSize = {
        width: window.innerWidth - 20,
        height: 600,
    };
    const graphSize = useMemo(() => {
        return {
            width: Math.round(svgSize.width * 0.8) - margin.right - margin.left,
            height: svgSize.height - margin.bottom - margin.top,
        };
    }, [svgSize.width, margin.right, margin.left, svgSize.height, margin.bottom, margin.top]);

    const xScale = scales.setXScaleRankflow(graphSize.width, data);
    const yScale = scales.setYScaleRankRankflow(graphSize.height, data);

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .attr('width', svgSize.width)
            .attr('height', svgSize.height);

        svg.selectAll('*').remove();

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const tip = d3Tip().attr('class', 'd3-tip').offset([-10, 0]);

        g.call(tip);

        svg.node().__chartSetup__ = { g, graphSize, xScale, yScale, tip };
    }, [data,margin.left,margin.top,svgSize.height,svgSize.width, xScale, yScale, graphSize]);

    return { svgRef,svgSize, margin, graphSize, xScale, yScale };
}

function drawChartComponents(
    g,
    data,
    tooltipContent,
    graphSize,
    xScale,
    yScale,
    tip,
    svgRef,
    svgSize
) {
    const line = d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.rank))
        .curve(d3.curveMonotoneX);

    Object.keys(data).forEach((key) => {
        let driver = false;
        const rankingData = data[key].ranking;
        const pointsData = data[key].points;
        console.log(data);

        const items = Object.keys(rankingData).map((year) => {
            const item = {
                year: +year,
                rank: rankingData[year],
                teamName: key,
                name: key,
            };
            if (pointsData && pointsData.hasOwnProperty(year)) {
                driver = true
                item.points = pointsData[year];
            }
            return item;
        });

        g.append('path')
            .datum(items)
            .attr('fill', 'none')
            .attr('stroke', data[key].color)
            .attr('stroke-width', 30)
            .attr('stroke-opacity', 0.5)
            .attr('d', line);

        g.selectAll(`dot-${key}`)
            .data(items)
            .enter()
            .append('circle')
            .attr('cx', (d) => xScale(d.year))
            .attr('cy', (d) => yScale(d.rank))
            .attr('r', 20)
            .attr('fill', data[key].color)
            .on('mouseover', (event, d) => {
                tip.html(tooltipContent(d, driver));
                tip.show(d, event.currentTarget);
                tip.style('left', event.pageX - 30 + 'px')
                    .style('top', event.pageY - 30 + 'px')
                    .style('font-weight', 300)
                    .style('color', 'black')
                    .style('padding', '20px')
                    .style('border-radius', '20px')
                    .style('background-color', 'white')
                    .show(data, event.currentTarget);
            })
            .on('mouseout', tip.hide);
    });

    g.append('g')
        .attr('transform', `translate(0, ${graphSize.height})`)
        .call(
            d3
                .axisBottom(xScale)
                .tickFormat((d, i) => (i > 0 ? d3.format('')(d) : '')),
        )
        .selectAll('text')
        .style('text-anchor', 'end')
        .style('font-size', '16px')
        .attr('dx', '1em')
        .attr('dy', '1em');

    const maxY = d3.max(
        Object.values(data).map((d) => d3.max(Object.values(d.ranking))),
    );
    g.append('g')
        .call(
            d3
                .axisLeft(yScale)
                .tickValues(d3.range(1, maxY + 1))
                .tickFormat(d3.format('d')),
        )
        .selectAll('text')
        .style('font-size', '16px');
    const legendColorScale = d3
        .scaleOrdinal()
        .domain(Object.keys(data))
        .range(Object.values(data).map((d) => d.color));
    legend.drawRankflowChartLegend(
        legendColorScale,
        d3.select(svgRef.current),
        Math.round(svgSize.width * 0.8),
    );
}

export const FlowChart = ({ data }) => {
    const { svgRef, svgSize } = useChartSetup(data);

    useEffect(() => {
        const setup = d3.select(svgRef.current).node().__chartSetup__;
        if (setup) {
            drawChartComponents(
                setup.g,
                data,
                tooltip.getTooltipHtmlContent,
                setup.graphSize,
                setup.xScale,
                setup.yScale,
                setup.tip,
                svgRef,
                svgSize
            );
        }
    }, [data, svgRef, svgSize]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};
