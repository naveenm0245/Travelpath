const { getDistanceFromLatLonInKm } = require('./misc');

//Gets list of continents. Also returns a map of cities sorted by their continents
//Example: {europe: ['SCQ', 'SCR'... etc], asia: ['JRH', 'SCT'... etc], ...}
function getContinentWiseCitiesAndContinentList(cities, cityList, startCityCode) {
    const continentWiseCities = {};

    for (let i = 0; i < cityList.length; i++) {
        const cityI = cities[cityList[i]];

        if (cityI.contId === cities[startCityCode].contId && cityI.id !== startCityCode) {
            continue;
        }

        if (cityI.id !== startCityCode) {
            if (continentWiseCities.hasOwnProperty(cityI.contId)) {
                continentWiseCities[cityI.contId].push(cityI.id);
            }
            else {
                continentWiseCities[cityI.contId] = [cityI.id];
            }
        }
    }

    const continents = Object.keys(continentWiseCities);

    return { continentWiseCities, continents };
}

//Calculates distance in km between two cities
function getDistanceBetweenTwoCities(cityCodeI, cityCodeJ, cities) {
    const cityI = cities[cityCodeI];
    const cityJ = cities[cityCodeJ];

    return getDistanceFromLatLonInKm(
        cityI.location.lat,
        cityI.location.lon,
        cityJ.location.lat,
        cityJ.location.lon);
}

module.exports = {
    getContinentWiseCitiesAndContinentList,
    getDistanceBetweenTwoCities,
}