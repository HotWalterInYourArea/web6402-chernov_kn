 
function isInteger(n) {
    if (typeof n !== 'number' || !isFinite(n)) return false;
    return (n | 0) === n;
}

function even() {
    const result = [];
    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }
    return result;
}

/**
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * @param {*} n
 */
function recSumTo(n) {
    if (n <= 1) return n;
    return n + recSumTo(n - 1);
}

/**
 * @param {*} n
 */
function factorial(n) {
    if (n < 0) return NaN;
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * @param {*} n
 */
function isBinary(n) {
    if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0) return false;
    if ((n | 0) !== n) return false; // must be integer
    return (n & (n - 1)) === 0;
}

/**
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

/**
 
 * @param initialValue
 * @param operatorFn
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;
    return function (newValue) {
        if (typeof operatorFn !== 'function') {
            return storedValue;
        }
        storedValue = operatorFn(storedValue, newValue);
        return storedValue;
    };
}

/**

 * @param {number} start 
 * @param {number} step  
 */
function sequence(start = 0, step = 1) {
    let current = start;
    let first = true;
    return function generator() {
        if (first) {
            first = false;
            return current;
        }
        current += step;
        return current;
    };
}

/**
 * @param {object} firstObject
 * @param {object} secondObject 
 * @returns {boolean}
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) return true;

    if (typeof firstObject === 'number' && typeof secondObject === 'number'
        && Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }

    if (typeof firstObject !== 'object' || typeof secondObject !== 'object'
        || firstObject === null || secondObject === null) {
        return false;
    }

    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(secondObject, key)) {
            return false;
        }
        if (!deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};