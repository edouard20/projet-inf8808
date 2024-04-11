import * as d3 from 'd3';
import * as preprocess from './preprocess.js'

/**
 * Defines the linear scale used to position in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScaleRank(height, data) {

    const dataScale = d3.scaleLinear()
        .domain([preprocess.getMaxRankingFromData(data)+1, 1])
        .range([height, 0])

    return dataScale
}

/**
 * Defines the linear scale used for the years.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScaleYears(width, data) {
    
    const years = new Set();

    Object.keys(data).forEach((teamName) => {
        Object.keys(data[teamName]['ranking']).forEach((year) => {
            years.add(parseInt(year));
        });
    });

    const yearsScale = d3.scaleLinear()
        .domain([d3.min(years)-1, d3.max(years)])
        .range([0, width])

    return yearsScale
}