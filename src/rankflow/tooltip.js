import * as d3 from 'd3';

/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getTooltipHtmlContent (d) {
    const createDataItem = (label, value) => ({ label, value })
    console.log(d)
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