import React from 'react';
import * as d3 from 'd3';
import { useMemo } from 'react';
import { InteractionData } from './HeatMap.tsx';
import * as d3Chromatic from 'd3-scale-chromatic';
import './HeatMap.css';

const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };

interface HeatMapRendererProps {
  width: number;
  height: number;
  data: {x: number, y: number, count: number}[];
  setHoveredCell: (hoverCell: InteractionData | null) => void;
}

const HeatMapRenderer = ({width, height, data, setHoveredCell}: HeatMapRendererProps) => {
  
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);
  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);

  const [min = 0, max = 0] = d3.extent(data.map((d) => d.count)); // extent can return [undefined, undefined], default to [0,0] to fix types

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [data, width]);
  
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, height]);

  const colorScale = d3
  .scaleSequential(d3Chromatic.interpolateReds)
  .domain([min, max]);

  // Build the rectangles
  const allShapes = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.count === null || !x || !y) {
      return;
    }

    return (
      <rect
        key={i}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={colorScale(d.count)}
        stroke={"white"}
        onMouseEnter={(e) => {
          setHoveredCell({
            xPos: x + xScale.bandwidth() + 510,
            yPos: y + xScale.bandwidth() - 30,
            count: d.count,
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        cursor="pointer"
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const x = xScale(name);

    if (!x) {
      return null;
    }

    return (
      <text
        key={i}
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fill='white'
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const y = yScale(name);

    if (!y) {
      return null;
    }

    return (
      <text
        key={i}
        x={-5}
        y={y + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
        fill='white'
      >
        {name}
      </text>
    );
  });
  
  return (
    <div className="heatmap-container">
      <svg id="svg-container" width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
          {xLabels}
          {yLabels}
        </g>
      </svg>
    </div>
  );
}

export default HeatMapRenderer;
