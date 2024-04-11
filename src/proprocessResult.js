function preprocessResults(results) {
  const gridToPositions = {};
  results.forEach((entry) => {
    if (entry.grid !== 0 && entry.position !== "\\N") {
      const grid = entry.grid;
      const position = entry.position;
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
    if (entry.grid !== 0 && entry.position === "\\N") {
      entry.position = meanPositions[entry.grid];
    }
  });

  const heatmapData = [];
  results.forEach((entry) => {
    if (entry.grid === 0 || entry.position === "\\N" || entry.position === undefined) {
      return;
    }
    const x = entry.grid;
    const y = entry.position;
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
        heatmapData.push({ x, y, count: 0.00001 });
      }
    }
  }
  return heatmapData;
}

export default preprocessResults;
