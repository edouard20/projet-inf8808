import * as d3 from 'd3';

/**
 * Defines the contents of the tooltip for the f1 teams rankflow chart.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getF1TeamsTooltipHtmlContent(d) {
  const createDataItem = (label, value) => ({ label, value })
  const data = [
    createDataItem('Team: ', d.teamName),
    createDataItem('Year: ', d.year),
    createDataItem('Rank: ', d.rank),
  ]

  const createContent = (data) => {
    const container = d3.create('div')
    data.forEach(({ label, value }) => {
      const itemContainer = container.append('div')
      itemContainer.append('span')
        .attr('class', 'tooltip-label')
        .text(label)
      itemContainer.append('span')
        .attr('class', 'tooltip-value')
        .text(value)
    })
    return container.html()
  }

  return createContent(data)
}

/**
 * Defines the contents of the tooltip for the top drivers rankflow chart.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getDriversTooltipHtmlContent(d) {
  const createDataItem = (label, value) => ({ label, value })
  const data = [
    createDataItem('Driver: ', d.driverName),
    createDataItem('Year: ', d.year),
    createDataItem('Rank: ', d.rank),
    createDataItem('Points: ', d.points),
  ]

  const createContent = (data) => {
    const container = d3.create('div')
    data.forEach(({ label, value }) => {
      const itemContainer = container.append('div')
      itemContainer.append('span')
        .attr('class', 'tooltip-label')
        .text(label)
      itemContainer.append('span')
        .attr('class', 'tooltip-value')
        .text(value)
    })
    return container.html()
  }

  return createContent(data)
}