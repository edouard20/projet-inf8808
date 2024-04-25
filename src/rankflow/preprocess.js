import drivers from '../barchart_preprocess/drivers.json';
import races from '../barchart_preprocess/races.json';
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
export function preprocessTopDrivers() {

    const validYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const validDriverNames = ["Lewis Hamilton", "Sebastian Vettel", "Valtteri Bottas", "Max Verstappen", "Daniel Ricciardo", "Charles Leclerc", "Sergio Pérez", "Carlos Sainz", "Fernando Alonso", "Esteban Ocon"]
    const driverColors = ['#FFD700', '#C0C0C0', '#0000FF', '#FF0000', '#FFA500', '#02a3c0', '#ab00cd', '#FF4500', '#00FF00', '#FF1493'];
    const combinedData = driverStandings.map(d => ({
        ...d,
        driver: drivers.find(driver => driver.driverId === d.driverId),
        race: races.find(race => race.raceId === d.raceId)
    }));

    const filteredData = combinedData.filter(item => validYears.includes(item.race.year));
    
    const filteredDataDrivers = filteredData.filter(item => validDriverNames.includes(item.driver.forename + " " + item.driver.surname));

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
                points: points
            };
        }
    });

    const pointsDrivers = {};
    let colorIndex = 0
    for (let i = 0; i < Object.values(maxPointsByDriverYear).length; i++) {
        const year = Object.values(maxPointsByDriverYear)[i].year;
        const points = Object.values(maxPointsByDriverYear)[i].points;
        const driverName = `${Object.values(maxPointsByDriverYear)[i].forename} ${Object.values(maxPointsByDriverYear)[i].surname}`;
    
        if (!pointsDrivers[driverName]) {
            pointsDrivers[driverName] = {
                points: {},
                ranking: {},
                color: driverColors[colorIndex++]
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

    return pointsDrivers;
}