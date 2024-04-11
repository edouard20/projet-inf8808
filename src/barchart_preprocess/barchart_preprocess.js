import drivers from './drivers.json';
import races from './races.json';
import results from './results.json';

const nationalityToCountryCode = {
  'British': 'GB',
  'German': 'DE',
  'French': 'FR',
  'Italian': 'IT',
  'Spanish': 'ES',
  'Brazilian': 'BR',
  'Australian': 'AU',
  'Austrian': 'AT',
  'Argentine': 'AR',
  'Belgian': 'BE',
  'Finnish': 'FI',
  'Japanese': 'JP',
  'Dutch': 'NL',
  'Canadian': 'CA',
  'American': 'US',
  'Swiss': 'CH',
  'Russian': 'RU',
  'Mexican': 'MX',
  'Swedish': 'SE',
  'Danish': 'DK',
  'Norwegian': 'NO',
  'Polish': 'PL',
  'Indian': 'IN',
  'Irish': 'IE',
  'New Zealander': 'NZ',
  'South African': 'ZA',
  // ... 
};

function preprocessData() {
    const raceYearMap = new Map(races.map(r => [r.raceId, r.year]));
    console.log(drivers[0].nationality)

    const driverResults = results.filter(d => raceYearMap.has(d.raceId));
    const driverYears = driverResults.reduce((acc, result) => {
      const year = raceYearMap.get(result.raceId);
      if (!acc[result.driverId]) {
        acc[result.driverId] = new Set();
      }
      acc[result.driverId].add(year);
      return acc;
    }, {});
  
    const driverCareerLengths = Object.entries(driverYears).map(([driverId, years]) => {
        const driver = drivers.find(d => d.driverId.toString() === driverId.toString());
      return {
        name: driver ? `${driver.forename} ${driver.surname}` : 'Unknown',
        yearsActive: years.size,
        countryCode: nationalityToCountryCode[driver.nationality] || 'Unknown'
      };
    }).sort((a, b) => b.yearsActive - a.yearsActive);

    const sortedData = driverCareerLengths.sort((a, b) => b.yearsActive - a.yearsActive);

    // Sélectionner seulement les 8 premiers pilotes
    const topDrivers = sortedData.slice(0, 8);

  return topDrivers;
}



export default preprocessData;
