import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function MyD3Component() {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      // Select the container element
      const svg = d3.select(d3Container.current);

      // Set up properties for your visualization
      const width = 400;
      const height = 200;
      svg.attr('width', width).attr('height', height);

      // Example: Create a simple bar chart
      const data = [4, 8, 15, 16, 23, 42]; // Example data
      svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("width", 40)
        .attr("height", d => d * 10)
        .attr("x", (d, i) => i * 45)
        .attr("y", d => height - d * 10)
        .attr("fill", "teal");
    }
  }, []);

  return (
    <svg ref={d3Container} />
  );
}

export default MyD3Component;
