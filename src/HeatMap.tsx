import * as d3 from 'd3'
import React, {useMemo} from 'react'
import './HeatMap.css'

import * as d3Chromatic from 'd3-scale-chromatic'

const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };

interface HeatMapProps {
  width: number;
  height: number;
  data: {x: number, y: number, count: number}[];
}

const HeatMap = ({width, height, data}: HeatMapProps) => {
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);
  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);

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

  const [min, max] = d3.extent(data.map((d) => d.count));

  if (!min || !max) {
    return null;
  }

  const colorScale = d3
  .scaleSequential(d3Chromatic.interpolateReds)
  .domain([min, max]);

  const allRects = data.map((d, i) => {
    return (
      <rect
        key={i}
        // r={4}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={colorScale(d.count)}
        // rx={5}
        stroke={"white"}
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        color='white'
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <div className='heatmap-container'>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allRects}
          {xLabels}
          {yLabels}
        </g>
      </svg>
    </div>
  )
}

export default HeatMap
