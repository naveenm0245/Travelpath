//This file contains functions to help safely handle data operations



const fs = require('fs');

//Reads data from file. Also returns list of cities.
function getCityAndCityList() {
    const path = `${__dirname}/../cities.json`;
    try {
        const cities = JSON.parse(fs.readFileSync(path, 'utf8'));
        const cityList = Object.keys(cities);
    
        return { cities, cityList };
    }
    catch (err) {
        throw new Error('Missing or corrupted file. Please ensure you have a valid file on the following path optimalPath/cities.json');
    }

}

//Formats the final result and outputs to console
function printResult (distance, sequence, cities, bonus) {
    const resultStringDistance = `${bonus ? 'Maximum' : 'Minimum'} distance is: ${distance}`;
    console.log(resultStringDistance);

    for(let i = 0; i < sequence.length; i++){
        const resultStringSequence = `${sequence[i]} ( ${cities[sequence[i]].countryName} , ${cities[sequence[i]].contId} )`;
        console.log(resultStringSequence);
    }
    console.log('\n\n');
}

//Validates user input ie. source city
function validate(cities, cityList, startCityCode) {
    let valid = false;
    for (let i = 0; i < cityList.length; i++) {
        const city = cities[cityList[i]];
        if (city.id === startCityCode) {
            valid = true;
            break;
        }
    }
    return valid;
}

module.exports = {
    getCityAndCityList,
    printResult,
    validate,
}