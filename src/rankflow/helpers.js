import * as d3 from 'd3';

export const margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {string} id The desired width
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize(id, width, height) {
    d3.select(id).select('svg')
        .attr('width', width)
        .attr('height', height)
}
