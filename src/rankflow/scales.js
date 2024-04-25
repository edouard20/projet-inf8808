import * as d3 from 'd3';
import * as preprocess from './preprocess.js'

/**
 * Defines the linear scale used to position in Y for the rankflow chart.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScaleRankRankflow(height, data) {

    const dataScale = d3.scaleLinear()
        .domain([preprocess.getMaxRankingFromData(data)+1, 1])
        .range([height, 0])

    return dataScale
}

/**
 * Defines the linear scale used for the years for the rankflow chart.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScaleRankflow(width, data) {
    
    const years = new Set();
    Object.keys(data).forEach((key) => {
        Object.keys(data[key]['ranking']).forEach((year) => {
            years.add(parseInt(year));
        });
    });

    const yearsScale = d3.scaleLinear()
        .domain([d3.min(years)-1, d3.max(years)])
        .range([0, width])

    return yearsScale
}
