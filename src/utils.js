function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function similarArr(firstArr, secondArr) {
    if (firstArr.length !== secondArr.length) return false;
    for (let j = 0; j < firstArr.length; j += 1) {
        if (firstArr[j].length !== secondArr[j].length) return false;
        for (let i = 0; i < firstArr[j].length; i += 1) {
            if (firstArr[j][i] !== secondArr[j][i]) return false;
        }
    }
    return true;
}

export {
    getRandom,
    similarArr
}