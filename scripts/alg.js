function rand(min, max) {
    return min + Math.random() * (max - min);
}
function floorRand(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
function ind(arr, e) {
    return arr.indexOf(e);
}
function rem(arr, e) {
    arr.splice(arr.indexOf(e), 1);
}
function matchArr(arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (e === arr[i]) {
            return true;
        }   
    }
}
function searchArr(arr, e) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].includes(e)) {
            return arr[i];
        }
    }
}
function arrRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export { rand, floorRand, ind, rem, matchArr, searchArr, arrRand };