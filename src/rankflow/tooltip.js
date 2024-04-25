import * as d3 from 'd3';
/**
 * Defines the contents of the tooltip for the top drivers rankflow chart.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getTooltipHtmlContent(d, driver = false) {
    const createDataItem = (label, value) => ({ label, value });
    const data = driver
        ? [
              createDataItem('Driver: ', d.name),
              createDataItem('Year: ', d.year),
              createDataItem('Rank: ', d.rank),
              createDataItem('Current year points: ', d.points),
          ]
        : [
              createDataItem('Team: ', d.teamName),
              createDataItem('Year: ', d.year),
              createDataItem('Rank: ', d.rank),
          ];

    const createContent = (data) => {
        const container = d3.create('div');
        data.forEach(({ label, value }) => {
            const itemContainer = container.append('div');
            itemContainer
                .append('span')
                .attr('class', 'tooltip-label')
                .text(label);
            itemContainer
                .append('span')
                .attr('class', 'tooltip-value')
                .style('font-weight', '500')
                .text(value);
        });
        return container.html();
    };

    return createContent(data);
}
