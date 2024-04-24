import React, { useState} from 'react';
import './HeatMap.css';
import HeatMapRenderer from './HeatMapRenderer.tsx';
import HeatMapTooltip from './HeatMapTooltip.tsx';

interface HeatMapProps {
  width: number;
  height: number;
  data: {x: number, y: number, count: number}[];
}

export interface InteractionData {
  xPos: number;
  yPos: number;
  count: number;
}

const HeatMap = ({width, height, data}: HeatMapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);

  return (
    <div style={{ position: "relative" }}>
      <HeatMapRenderer
        width={width}
        height={height}
        data={data}
        setHoveredCell={setHoveredCell}
      />
      <HeatMapTooltip interactionData={hoveredCell} />
    </div>
  );
}

export default HeatMap;
