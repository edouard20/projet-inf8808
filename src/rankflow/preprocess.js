import drivers from '../barchart_preprocess/drivers.json';
import races from '../barchart_preprocess/races.json';
import results from '../barchart_preprocess/results.json';

/**
 * Exports the already processed f1 teams data from https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020/data
 *
 * @param {*} data The json f1 team processed data
 */
export function preprocessF1Teams(data) {
    return data
}

/**
 * Returns the max ranking over all passed rankings over the data
 * 
 * @param {*} data The processed data
 */
export function getMaxRankingFromData(data) {

    let maxRanking = 0;

    Object.keys(data).forEach((teamName) => {
        Object.values(data[teamName]['ranking']).forEach((ranking) => {
            maxRanking = Math.max(maxRanking, ranking);
        });
    });

    return maxRanking;
}

/**
 * Exports processed driver data from https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020/data
 *
 * @param {*} n The desired nmber of drivers to return
 * @param {*} m The desired nmber of years from now to return
 */
export function preprocessTopDrivers(n, m) {
    const today = new Date();
    const targetYear = today.getFullYear() - m + 1;

    // Combine results, driver data and races for efficient lookup
    const combinedData = results.map(result => ({
        ...result,
        driver: drivers.find(driver => driver.driverId === result.driverId),
        race: races.find(race => race.raceId === result.raceId)
    }));

    // Filter data for the target year range
    const filteredData = combinedData.filter(data => {
        return data.race.year >= targetYear;
    });

    // Calculate points for each driver in each year
    const driversData = {};
    filteredData.forEach(data => {
        const driverName = data.driver.forename + " " + data.driver.surname;
        const year = data.race.year;

        if (!driversData[driverName]) {
            driversData[driverName] = { ranking: {}, points: 0 };
        }

        if (!driversData[driverName].ranking[year]) {
            driversData[driverName].ranking[year] = undefined;
        }

        driversData[driverName].ranking[year] = data.rank;
        driversData[driverName].points += data.points;
    });

    // Sort drivers by total points across the target year range
    const sortedDrivers = Object.entries(driversData).sort((a, b) => {
        const sumA = a[1].points;
        const sumB = b[1].points;
        return sumB - sumA;
    });

    // Generate a bright random color for each driver (avoiding dark colors)
    const colors = {};
    for (const driver of sortedDrivers) {
      let color;
      do {
        color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      } while (isColorDark(color) || color === '#000000' || color.length !== 7); // Ensure 6-digit hex code
      colors[driver[0]] = color;
    }

    // Select the top n drivers and format the output with random colors
    const topDrivers = {};
    for (let i = 0; i < n && i < sortedDrivers.length; i++) {
        const driver = sortedDrivers[i][0];
        const ranking = sortedDrivers[i][1].ranking;
        const points = sortedDrivers[i][1].points;
        topDrivers[driver] = { points, ranking, color: colors[driver] };
    }

    console.log(topDrivers)

    return topDrivers;
}

// Function to check if a hex color is dark 
function isColorDark(color) {
    const rgb = color.slice(1).match(/.{2}/g).map(val => parseInt(val, 16));
    const brightness = (rgb[0] * 2 + rgb[1] + rgb[2]) / 4;
    return brightness < 128; // Adjust threshold for desired brightness level
  }