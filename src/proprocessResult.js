function preprocessResults(results) {
  const gridToPositions = {};
  results.forEach((entry) => {
    console.log(entry)
    if (entry.grid !== 0 && entry.positionOrder !== "\\N") {
      const grid = entry.grid;
      const position = entry.positionOrder;
      if (!gridToPositions[grid]) {
        gridToPositions[grid] = [];
      }
      gridToPositions[grid].push(position);
    }
  });

  const meanPositions = {};
  for (const grid in gridToPositions) {
    const positions = gridToPositions[grid];
    const sum = positions.reduce((acc, position) => acc + position, 0);
    meanPositions[grid] = Math.round(sum / positions.length);
  }

  results.forEach((entry) => {
    if (entry.grid !== 0 && entry.positionOrder === "\\N") {
      entry.positionOrder = meanPositions[entry.grid];
    }
  });

  const heatmapData = [];
  results.forEach((entry) => {
    if (entry.grid === 0 || entry.positionOrder === "\\N" || entry.positionOrder === undefined) {
      return;
    }
    const x = entry.positionOrder;
    const y = entry.grid;
    const existingEntry = heatmapData.find((item) => item.x === x && item.y === y);
    if (existingEntry) {
      existingEntry.count++;
    } else {
      heatmapData.push({ x, y, count: 1 });
    }
  });

  for (let x = 1; x <= 33; x++) {
    for (let y = 1; y <= 33; y++) {
      if (!heatmapData.find((item) => item.x === x && item.y === y)) {
        heatmapData.push({ x, y, count: 0.0001 });
      }
    }
  }

  heatmapData.sort((a, b) => a.x - b.x || a.y - b.y);
  return heatmapData.filter((item) => item.x < 21 && item.y < 21);
}

function processResults(results) {
  const countMap = {};

  results.forEach((entry) => {
    const key = `${entry.grid}-${entry.positionOrder}`;
    if (entry.grid === 0 || entry.positionOrder === "\\N" || entry.positionOrder === undefined) {
      return;
    }
    if (countMap[key]) {
      countMap[key].count++;
    }
    else {
      countMap[key] = {
        x: parseInt(entry.positionOrder, 10),
        y: parseInt(entry.grid, 10),
        count: 1
      }
    }
  });

  for(let x = 1; x <= 33; x++) {
    for(let y = 1; y <= 33; y++) {
      const key = `${y}-${x}`;
      if (!countMap[key]) {
        countMap[key] = {
          x,
          y,
          count: 0
        }
      }
    }
  }
  return Object.values(countMap)
    .filter((item) => item.x < 21 && item.y < 21)
    .sort((a, b) => a.x - b.x || a.y - b.y);
}
export default processResults;
// export default preprocessResults;
