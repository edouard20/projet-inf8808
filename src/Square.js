import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Square = () => {
    const squareRef = useRef(null);

    useEffect(() => {
        const squareNode = squareRef.current;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    d3.select(squareNode)
                        .select('rect')
                        .transition()
                        .delay(2000)
                        .duration(1000) 
                        .attrTween('transform', function() {
                            return d3.interpolateString('rotate(0, 25, 25)', 'rotate(360, 25, 25)'); 
                        });
                }
            });
        });

        observer.observe(squareNode);

        return () => {
            observer.unobserve(squareNode);
        };
    }, []);

    return (
        <div className="square" ref={squareRef}>
            <svg width="50" height="50">
                <rect x="10" y="10" width="20" height="20" fill="#BF0A30" />
            </svg>
        </div>
    );
};

export default Square;
