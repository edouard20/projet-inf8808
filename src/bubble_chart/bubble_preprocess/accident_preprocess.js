/**
 * The data preprocessing for the bubble charts
 *
 * @param {*} circuits A json format list of F1 circuits
 * @param {*} racesResults A json format list of the race results
 * @param {*} races A json format list of the race tracks
 * @param {*} countriesContinents A json format list of the countries and their continents
 * @param {*} drivers A json format list of the drivers
 */
function processRaces(
    circuits,
    racesResults,
    races,
    countriesContinents,
    drivers,
) {
    const filteredResults = racesResults.filter(
        (r) => r.statusId === 3 || r.statusId === 4,
    );

    const aggregation = filteredResults.reduce((acc, result) => {
        const race = races.find((r) => r.raceId === result.raceId);
        const circuit = circuits.find((c) => c.circuitId === race.circuitId);
        const driverDetail = drivers.find(
            (d) => d.driverId === result.driverId,
        );
        if (race && circuit) {
            const continentInfo = countriesContinents.find(
                (cc) => cc.country === circuit.country,
            );
            const key = `${race.year}-${circuit.circuitId}`;
            if (!acc[key]) {
                acc[key] = {
                    count: 1,
                    details: {
                        ...circuit,
                        continent: continentInfo
                            ? continentInfo.continent
                            : 'Unknown',
                    },
                    year: race.year,
                    drivers: [driverDetail],
                };
            } else {
                acc[key].count++;
                acc[key].drivers.push(driverDetail);
            }
        }
        return acc;
    }, {});
    return aggregation;
}
export default processRaces;
