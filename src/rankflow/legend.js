import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend(colorScale, g, width) {
    // TODO : Generate the legend
    const legendGroup = g.append('g')
        .attr('id', 'legend')
        .attr('transform', 'translate(' + (width) + ',0)')
        .attr('font-family', 'Open Sans Condensed')
        .attr("fill", "white");

    const legend = d3Legend.legendColor()
        .title('F1 teams')
        .shape('circle')
        .scale(colorScale)
        .shapePadding(5)
        .labelOffset(5)
        .titleWidth(100)
        .labelAlign('start')
        .orient('vertical')

    legendGroup.call(legend)
    // For help, see : https://d3-legend.susielu.com/
}