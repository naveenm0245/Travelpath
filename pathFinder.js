const { getContinentWiseCitiesAndContinentList,
    getDistanceBetweenTwoCities } = require('./utils/helper');
const { permutationsGenerator } = require('./utils/misc');
const { getCityAndCityList, printResult, validate } = require('./utils/readWriteData');

let cities;
let cityList;
try {
    ({ cities, cityList } = getCityAndCityList());
} catch (err){
    console.error(err.message);
    process.exit(1);
}


const startCityCode = process.argv[2];

//Check if input given is a valid city code 
if (!validate(cities, cityList, startCityCode)) {
    console.error('Please enter a valid city code');
    process.exit(1);
}

//For a given sequence of continents finds the optimal way of travelling through them
//If bonus is false, finds the route with the minimum distance, else the maximum distance.
//Uses a heuristic algorithm to find the optimal distance.
//Example: 
// permutation: ['europe', 'africa', 'oceania', 'north-america', 'south'america']
// bonus: false -> finding the minimum distance
// source city: BOM (asia)
// Will calculate distance from BOM to all the cities in europe and select the one which is the least
// Suppose this is London, will next set London as the source city and repeat the above proceduce
// finding distances from London to all the cities in Africa and selecting the least one
// Continues this way and gets the optimal city sequence for a given continent permutation
function getOptimalDistanceForASinglePermutation(permutation, continentWiseCities, bonus) {
    function findOptimalDistanceCity(sourceCity, continent) {
        const cityCodeI = sourceCity;

        let optimalDistance = bonus ? 0 : Number.MAX_SAFE_INTEGER;
        let optimalCity = null;
        for (let j = 0; j < continentWiseCities[continent].length; j++) {
            const cityCodeJ = continentWiseCities[continent][j];
            const distance = getDistanceBetweenTwoCities(cityCodeI, cityCodeJ, cities);

            if (bonus) {
                if (distance > optimalDistance) {
                    optimalDistance = distance;
                    optimalCity = cityCodeJ;
                }
            }
            else {
                if (distance < optimalDistance) {
                    optimalDistance = distance;
                    optimalCity = cityCodeJ;
                }
            }
        }

        return { optimalDistance, optimalCity };
    }

    let totalDistance = 0;
    const sequence = [startCityCode];

    let sourceCity = startCityCode;

    for (let i = 0; i < permutation.length; i++) {
        const { optimalDistance, optimalCity } = findOptimalDistanceCity(sourceCity, permutation[i]);

        totalDistance += optimalDistance;
        sequence.push(optimalCity);

        sourceCity = optimalCity;

        if (i === permutation.length-1) {
            totalDistance += getDistanceBetweenTwoCities(sourceCity, startCityCode, cities);
            sequence.push(startCityCode);
        }
    }

    return { totalDistance, sequence };
}

const { continentWiseCities, continents } = getContinentWiseCitiesAndContinentList(cities, 
    cityList, startCityCode);

//Generate all valid permutations of visiting the continents
const permutationList = permutationsGenerator(continents);

//Runs all the permutations of continents and selects the one with the least total distance travelled
let minDistance = Number.MAX_SAFE_INTEGER;
let minSequence = [];
for (let i = 0; i < permutationList.length; i++) {
    const { totalDistance, sequence } = getOptimalDistanceForASinglePermutation(
        permutationList[i], continentWiseCities);

    if (totalDistance < minDistance) {
        minDistance = totalDistance;
        minSequence = sequence;
    }
}

printResult(minDistance, minSequence, cities);


//For bonus
//Does the exact thing as above except selects the sequence with the maximum distance travelled
let maxDistance = 0;
let maxSequence = [];

for (let i = 0; i < permutationList.length; i++) {
    const { totalDistance, sequence } = getOptimalDistanceForASinglePermutation(
        permutationList[i], continentWiseCities, true);

    if (totalDistance > maxDistance) {
        maxDistance = totalDistance;
        maxSequence = sequence;
    }
}

printResult(maxDistance, maxSequence, cities, true);
process.exit(0);