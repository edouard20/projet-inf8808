import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './BubbleChart.css';
import continentColors from '../bubble_preprocess/continent_colors.json';
/**
 * The bubble chart component for the crashes.
 *
 * @param {*} data The maximum radius of the bubbles
 * @param {*} setMaxRadius The effect function to set the max radius
 * @param {*} setMaxCrashes The effect function to set the max value of crashes
 */
function BubbleChart({ data, setMaxRadius, setMaxCrashes }) {
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
        const currentRef = d3Container.current;

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        if (data && d3Container.current && isVisible) {
            d3.selectAll('#tooltip-bubble').style('display', 'none');
            const names = (d) => d.split(/(?=[A-Z][a-z])|\s+/g);
            const width = 928;
            const height = width;
            const margin = 1;
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
                    if (i !== 0) {
                        radii.push(node.r);
                        values.push(node.data.value);
                    }
                });
                setMaxRadius(d3.max(radii));
                setMaxCrashes(d3.max(values));
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
                    d3.select('#tooltip-bubble')
                        .style('display', 'block')
                        .html(
                            `Circuit: ${d.data.name}<br/>Accidents: ${d.data.value}`,
                        );
                })
                .on('mousemove', function (event) {
                    d3.select('#tooltip-bubble')
                        .style('left', event.pageX + 10 + 'px')
                        .style('top', event.pageY + 10 + 'px');
                })
                .on('mouseout', function () {
                    d3.select('#tooltip-bubble').style('display', 'none');
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
                .style('font-size', `1.4vw`)
                .style('fill', 'white')
                .style('font-weight', 'bold');
        }
    }, [data, isVisible, setMaxRadius, setMaxCrashes]);

    return (
        <div>
            <div id='tooltip-bubble'></div>
            <svg
                ref={d3Container}
                width={600}
                height={500}
                className={`bubble-chart ${isVisible ? 'visible' : ''}`}
            />
        </div>
    );
}

export default BubbleChart;
