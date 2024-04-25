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

    const combinedData = results.map(result => ({
        ...result,
        driver: drivers.find(driver => driver.driverId === result.driverId),
        race: races.find(race => race.raceId === result.raceId)
    }));

    const filteredData = combinedData.filter(data => {
        return data.race.year >= targetYear;
    });

    const driversData = {};
    filteredData.forEach(data => {
        const driverName = data.driver.forename + " " + data.driver.surname;
        const year = data.race.year;

        if (!driversData[driverName]) {
            driversData[driverName] = { ranking: {}, points: {}, allTimePoints: 0 };
        }

        if (!driversData[driverName].ranking[year]) {
            driversData[driverName].ranking[year] = undefined;
        }

        if (!driversData[driverName].points[year]) {
            driversData[driverName].points[year] = undefined;
        }

        driversData[driverName].ranking[year] = data.rank;
        driversData[driverName].points[year] = data.points;
        driversData[driverName].allTimePoints += data.points;
    });

    const sortedDrivers = Object.entries(driversData).sort((a, b) => {
        const sumA = a[1].allTimePoints;
        const sumB = b[1].allTimePoints;
        return sumB - sumA;
    });

    const colors = {};
    for (const driver of sortedDrivers) {
        let color;
        do {
            color = generateRandomColor();
        } while (isColorDark(color) || color === '#000000' || color.length !== 7);
        colors[driver[0]] = color;
    }

    const topDrivers = {};
    for (let i = 0; i < n && i < sortedDrivers.length; i++) {
        const driver = sortedDrivers[i][0];
        const ranking = sortedDrivers[i][1].ranking;
        const points = sortedDrivers[i][1].points;
        const allTimePoints = sortedDrivers[i][1].allTimePoints;
        topDrivers[driver] = { points, allTimePoints, ranking, color: colors[driver] };
    }

    return topDrivers;
}

/**
 * Generates a random color
 */
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + ("000000" + hex).slice(-6);
}

/**
 * Checks if a color is black or its variant
 * @param {*} color The desired nmber of years from now to return
 */
function isColorDark(color) {
    const rgb = color.slice(1).match(/.{2}/g).map(val => parseInt(val, 16));
    const brightness = (rgb[0] * 2 + rgb[1] + rgb[2]) / 4;
    return brightness < 128;
}   