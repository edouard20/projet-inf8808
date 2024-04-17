function preprocessF1Teams(jsonData) {
    return jsonData
}

export function getMaxRankingFromData(data) {
    
    let maxRanking = 0;

    Object.keys(data).forEach((teamName) => {
        Object.values(data[teamName]['ranking']).forEach((ranking) => {
            maxRanking = Math.max(maxRanking, ranking);
        });
    });

    return maxRanking;
}

export default preprocessF1Teams;