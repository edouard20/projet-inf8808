function dropColumns(jsonData, columns) {
    return jsonData.map(function(obj) {
        columns.forEach(function(column) {
            delete obj[column];
        });
        return obj;
    });
}

function countDriversPerNationality(data) {
    const nationalityCounts = {};
    
    data.forEach(driver => {
        const nationality = driver.nationality;
        if (nationalityCounts[nationality]) {
            nationalityCounts[nationality]++;
        } else {
            nationalityCounts[nationality] = 1;
        }
    });
    
    return nationalityCounts;
}

function countWinnersPerNationality(data) {
    const nationalityWinsMap = {};
    
    data.forEach(driver => {
        if (driver.totalWins > 0) {
            if (nationalityWinsMap[driver.nationality]) {
                nationalityWinsMap[driver.nationality]++;
            } else {
                nationalityWinsMap[driver.nationality] = 1;
            }
        }
    });
    return nationalityWinsMap;
}

function preprocessDrivers(jsonData, columnsToDrop, standingsData) {
    try {
        const modifiedData = dropColumns(jsonData, columnsToDrop);

        const totalWins = {};
        standingsData.forEach(standing => {
            if (standing.position === "1") {
                const driverId = standing.driverId;
                if (totalWins[driverId]) {
                    totalWins[driverId]++;
                } else {
                    totalWins[driverId] = 1;
                }
            }
        });
        modifiedData.forEach(driver => {
            driver.totalWins = totalWins[driver.driverId] || 0;
        });

        const nationalityCounts = countDriversPerNationality(modifiedData);
        const sortedCountsNationality = Object.entries(nationalityCounts).sort((a, b) => b[1] - a[1]);
        const winnerCounts = countWinnersPerNationality(modifiedData);
        const sortedCountsWinners = Object.entries(winnerCounts).sort((a, b) => b[1] - a[1]);
  
        const waffle_data = sortedCountsNationality.filter(item => item[1] > 25).map(item => {
        return { nationality: item[0], count: item[1] };
        });

        const winner_data = sortedCountsWinners.map(item => {
        return { nationality: item[0], count: item[1] };
        });

        return { waffle_data, winner_data };

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
    
}

export default preprocessDrivers;