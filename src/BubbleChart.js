import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './BubbleChart.css';
const radiusMultiplier = 3;

function BubbleChart({
    data,
    setMaxRadius,
    setMaxValue,
}) {
    const d3Container = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(d3Container.current);
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.1,
            },
        );

        if (d3Container.current) {
            observer.observe(d3Container.current);
        }

        return () => {
            if (d3Container.current) {
                observer.unobserve(d3Container.current);
            }
        };
    }, []);

    useEffect(() => {
        if (data && d3Container.current && isVisible) {
            d3.selectAll('#tooltip').style('display', 'none');
            const names = (d) => d.split(/(?=[A-Z][a-z])|\s+/g);
            const width = 928;
            const height = width;
            const margin = 1;

            const continentColors = {
                Asia: '#EA1515',
                Europe: '#73C010',
                Africa: '#B06A00',
                Oceania: '#B06A00',
                Americas: '#376BF0',
                'South America': '#E7EA65',
                Unknown: '#8c564b',
            };
            const color = (d) =>
                continentColors[d.continent] || continentColors['Unknown'];
            const pack = d3
                .pack()
                .size([width - margin * 2, height - margin * 2])
                .padding(3);
            const root = pack(
                d3.hierarchy({ children: data }).sum((d) => d.value * 2),
            );
            if (setMaxRadius) {
                const nodes = root.descendants();
                const radii = [];
                const values = [];
                nodes.forEach((node, i) => {
                    console.log(node);
                    if (i !== 0) {
                        radii.push(node.r);
                        values.push(node.data.value);
                    }
                });
                setMaxRadius(d3.max(radii));
                setMaxValue(d3.max(values));
            }
            const svg = d3
                .select(d3Container.current)
                .attr('viewBox', [-margin, -margin, width, height])
                .attr('style', 'max-width: 100%; height: auto; color: blue;')
                .attr('text-anchor', 'middle');

            svg.selectAll('*').remove();

            const node = svg
                .append('g')
                .selectAll('g')
                .data(root.leaves())
                .join('g')
                .attr('transform', (d) => `translate(${d.x},${d.y})`)
                .on('mouseover', function (event, d) {
                    d3.select('#tooltip')
                        .style('display', 'block')
                        .html(
                            `Circuit: ${d.data.name}<br/>Accidents: ${d.data.value}`,
                        );
                })
                .on('mousemove', function (event) {
                    d3.select('#tooltip')
                        .style('left', event.pageX + 10 + 'px') 
                        .style('top', event.pageY + 10 + 'px');
                })
                .on('mouseout', function () {
                    d3.select('#tooltip').style('display', 'none');
                });

            node.append('title').text((d) => `${d.data.name}`);

            node.append('circle')
                .attr('fill-opacity', 0.7)
                .attr('fill', (d) => color(d.data))
                .attr('r', (d) => d.r);

            const text = node
                .append('text')
                .attr('clip-path', (d) => `circle(${d.r})`);

            text.selectAll()
                .data((d) => names(d.data.name))
                .join('tspan')
                .attr('x', 0)
                .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
                .text((d) => d)
                .style('font-size', `0.7vw`)
                .style('font-weight', 'bold');
        }
    }, [data, isVisible]);

    return (
        <>
            <div id='tooltip'></div>

            <svg
                ref={d3Container}
                width={600}
                height={500}
                className={`bubble-chart ${isVisible ? 'visible' : ''}`}
            />
        </>
    );
}

export default BubbleChart;
