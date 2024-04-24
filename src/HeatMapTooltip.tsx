import React from 'react';
import { InteractionData } from './HeatMap.tsx';

type TooltipProps = {
  interactionData: InteractionData | null;
};

const HeatMapTooltip = ({ interactionData }: TooltipProps) => {
  if (!interactionData) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: interactionData.xPos,
        top: interactionData.yPos,
        color: interactionData.count > 140 ? "white" : "black",
      }}
    >
      {Math.round(interactionData.count)}
    </div>
  )
}

export default HeatMapTooltip;
