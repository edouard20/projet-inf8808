import * as d3 from 'd3';

/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
export function initGradient(colorScale) {
  const svg = d3.select('.heatmap-svg');
  const defs = svg.append('defs');
  const linearGradient = defs.append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0);

  const numStops = 10;
  const domain = colorScale.domain();
  const range = [domain[0], Math.exp(domain[1])];

  const stops = Array.from({length: numStops}, (_, i) => {
      const value = range[0] + (range[1] - range[0]) * i / (numStops - 1);
      return {
          offset: `${100 * i / (numStops - 1)}%`,
          color: colorScale(value)
      };
  });

  linearGradient.selectAll('stop')
      .data(stops)
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);
}

  
  /**
   * Initializes the SVG rectangle for the legend.
   */
  export function initLegendBar () {
    const svg = d3.select('.heatmap-svg')
    svg.append('rect').attr('class', 'legend-bar')
  }
  
  /**
   *  Initializes the group for the legend's axis.
   */
  export function initLegendAxis () {
    const svg = d3.select('.heatmap-svg')
    svg
      .append('g')
      .attr('class', 'legend-axis')
  }
  
  /**
   * Draws the legend to the left of the graphic.
   *
   * @param {number} x The x position of the legend
   * @param {number} y The y position of the legend
   * @param {number} height The height of the legend
   * @param {number} width The width of the legend
   * @param {string} fill The fill of the legend
   * @param {*} colorScale The color scale represented by the legend
   */
  export function draw(x, y, height, width, fill, colorScale) {
    d3.select('.legend-bar')
      .attr('x', x)
      .attr('y', y)
      .attr('height', height)
      .attr('width', width)
      .style('fill', fill);

    const ticks = [5, 10, 20, 50, 100, 200, 400];

    const logDomain = colorScale.domain();
    const range = [Math.exp(logDomain[0]), Math.exp(logDomain[1])];
    const axisScale = d3.scaleLog()
                        .domain([Math.max(1, range[0]), range[1]])
                        .range([height, 0]);

    const axis = d3.axisLeft(axisScale)
                   .tickValues(ticks)

    d3.select('.legend-axis')
      .attr('transform', `translate(${x}, ${y})`)
      .call(axis);

    const padding = 15;
    d3.select('.legend-axis').selectAll('text')
      .attr('transform', `translate(${width - padding}, 0)`);
}


