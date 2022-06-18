//This file contains miscellaneous mathematical utility functions


//Finds distance between two coordinates in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

//Generates all permutations of a given array
//Example: permutationGenerator(['a', 'b', 'c']) would output
// [ ['a', 'b', 'c'], ['a', 'c', 'b'], ['b', 'a', 'c'] .... etc]
function permutationsGenerator(arr) {
    function generateAll(currentPermutation, markerArr) {
        if (currentPermutation.length === arr.length) {
            const arrCopy = [];
            for (let i = 0; i < currentPermutation.length; i++) {
                arrCopy.push(currentPermutation[i]);
            }

            permutations.push(arrCopy);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (markerArr[i]) {
                currentPermutation.push(arr[i]);
                markerArr[i] = false;
                generateAll(currentPermutation, markerArr);
                markerArr[i] = true;
                currentPermutation.pop();
            }
        }
    }

    const permutations = [];
    generateAll([], arr.map(() => true));
    return permutations;
}

module.exports = {
    getDistanceFromLatLonInKm,
    permutationsGenerator,
}