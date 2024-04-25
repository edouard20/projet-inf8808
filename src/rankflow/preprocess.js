import { max } from 'd3';
import drivers from '../barchart_preprocess/drivers.json';
import races from '../barchart_preprocess/races.json';
import results from '../barchart_preprocess/results.json';
import driverStandings from './data/driver_standings.json';
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
 * @param {*} n The desired number of drivers to return
 * @param {*} m The desired number of years from now to return
 */
export function preprocessTopDrivers(n, m) {

    const validYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const validDriverNames = ["Lewis Hamilton", "Sebastian Vettel", "Valtteri Bottas", "Max Verstappen", "Daniel Ricciardo", "Charles Leclerc", "Sergio Pérez", "Carlos Sainz", "Fernando Alonso", "Esteban Ocon"]
    const today = new Date();
    const targetYear = today.getFullYear() - m + 1;

    const combinedData = results.map(result => ({
        ...result,
        driver: drivers.find(driver => driver.driverId === result.driverId),
        race: races.find(race => race.raceId === result.raceId)
    }));

    const combinedData2 = driverStandings.map(d => ({
        ...d,
        driver: drivers.find(driver => driver.driverId === d.driverId),
        race: races.find(race => race.raceId === d.raceId)
    }));

    const filteredData2 = combinedData2.filter(item => validYears.includes(item.race.year));
    
    const filteredDataDrivers = filteredData2.filter(item => validDriverNames.includes(item.driver.forename + " " + item.driver.surname));

    const maxPointsByDriverYear = {};

    filteredDataDrivers.forEach(item => {
        const year = item.race.year;
        const driverForename = item.driver.forename;
        const driverSurname = item.driver.surname;
        const driverId = item.driver.driverId;
        const points = item.points;

        const key = `${driverForename}_${driverSurname}-${year}`;

        if (!maxPointsByDriverYear[key] || maxPointsByDriverYear[key].points < points) {
            maxPointsByDriverYear[key] = {
                forename: driverForename,
                surname: driverSurname,
                driverId: driverId,
                year: year,
                points: points,
                color: generateRandomColor()        
            };
        }
    });

    const pointsDrivers = {};

    for (let i = 0; i < Object.values(maxPointsByDriverYear).length; i++) {
        const year = Object.values(maxPointsByDriverYear)[i].year;
        const points = Object.values(maxPointsByDriverYear)[i].points;
        const driverName = `${Object.values(maxPointsByDriverYear)[i].forename} ${Object.values(maxPointsByDriverYear)[i].surname}`;
    
        if (!pointsDrivers[driverName]) {
            pointsDrivers[driverName] = {
                points: {},
                ranking: {},
                color: Object.values(maxPointsByDriverYear)[i].color
            };
        }

        if (!pointsDrivers[driverName].points[year]) {
            pointsDrivers[driverName].points[year] = 0;
        }
    
        pointsDrivers[driverName].points[year]= points;
    }

    for (let driver in pointsDrivers) {
        for (let year of validYears) {
            if (!pointsDrivers[driver].points[year]) {
                pointsDrivers[driver].points[year] = 0;
            }
        }
    }

    function updateRankings(pointsDrivers) {
        const years = Object.keys(pointsDrivers[Object.keys(pointsDrivers)[0]].points);
        years.forEach(year => {
            let yearPoints = [];
            for (let driver in pointsDrivers) {
                yearPoints.push({ driver, points: pointsDrivers[driver].points[year] });
            } 
            yearPoints.sort((a, b) => b.points - a.points);
    
            yearPoints.forEach((entry, index) => {
                if (!pointsDrivers[entry.driver].ranking) {
                    pointsDrivers[entry.driver].ranking = {};
                }
                pointsDrivers[entry.driver].ranking[year] = index + 1;
            });
        });
    }
    
    updateRankings(pointsDrivers);

    // console.log(maxPointsByDriverYear)

    // const driverData = {};
    // const rankingsByYear = {};
    // maxPointsByDriverYear.forEach(item => {
    //     const year = item.year;
    //     if (!rankingsByYear[year]) {
    //         rankingsByYear[year] = [];
    //     }
    //     rankingsByYear[year].push({ name: `${item.forename} ${item.surname}`, points: item.points });
    // });

    // for (const year in rankingsByYear) {
    //     rankingsByYear[year].sort((a, b) => b.points - a.points);
    //     rankingsByYear[year].forEach((entry, index) => {
    //         driverData[entry.name].ranking[year] = index + 1;
    //     });
    // }
    
    // console.log(driverData);

    // const filteredData = combinedData.filter(data => {
    //     return data.race.year >= targetYear;
    // });
    // const driversData = {};
    // filteredData.forEach(data => {
    //     const driverName = data.driver.forename + " " + data.driver.surname;
    //     const year = data.race.year;

    //     if (!driversData[driverName]) {
    //         driversData[driverName] = { ranking: {}, points: {}, allTimePoints: 0 };
    //     }

    //     if (!driversData[driverName].ranking[year]) {
    //         driversData[driverName].ranking[year] = undefined;
    //     }

    //     if (!driversData[driverName].points[year]) {
    //         driversData[driverName].points[year] = undefined;
    //     }

    //     driversData[driverName].ranking[year] = data.rank;
    //     driversData[driverName].points[year] = data.points;
    //     driversData[driverName].allTimePoints += data.points;
    // });

    // const sortedDrivers = Object.entries(driversData).sort((a, b) => {
    //     const sumA = a[1].allTimePoints;
    //     const sumB = b[1].allTimePoints;
    //     return sumB - sumA;
    // });

    // const colors = {};
    // for (const driver of pointsDrivers) {
    //     let color;
    //     do {
    //         color = generateRandomColor();
    //     } while (isColorDark(color) || color === '#000000' || color.length !== 7);
    //     colors[driver[0]] = color;
    // }

    // const topDrivers = {};
    // for (let i = 0; i < n && i < sortedDrivers.length; i++) {
    //     const driver = sortedDrivers[i][0];
    //     const ranking = sortedDrivers[i][1].ranking;
    //     const points = sortedDrivers[i][1].points;
    //     const allTimePoints = sortedDrivers[i][1].allTimePoints;
    //     topDrivers[driver] = { points, allTimePoints, ranking, color: colors[driver] };
    // }
    console.log(pointsDrivers)
    return pointsDrivers;
}

export function preprocessTopDrivers2(n, m) {
    const today = new Date();
    const targetYear = today.getFullYear() - m + 1;

    const combinedData = driverStandings.map(result => ({
        driver: drivers.find(driver => driver.driverId === result.driverId),
        race: races.find(race => race.raceId === result.raceId)
    }));
}

/**
 * Generates a random color
 */
function generateRandomColor() {
    let color;
    do {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const hex = ((r << 16) | (g << 8) | b).toString(16);
        color = "#" + ("000000" + hex).slice(-6);
    } while (isColorDark(color) || color === '#000000' || color.length !== 7);
    
    return color;
}

/**
 * Checks if a color is black or its variant
 * @param {*} color The desired number of years from now to return
 */
function isColorDark(color) {
    const rgb = color.slice(1).match(/.{2}/g).map(val => parseInt(val, 16));
    const brightness = (rgb[0] * 2 + rgb[1] + rgb[2]) / 4;
    return brightness < 128;
}   