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
