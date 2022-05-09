const { describe, it, expect } = require('@jest/globals');

describe('flattenArrays', () => {
    it('Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.', () => {
        let arrays = [[1, 2, 3], [4, 5], [6]];

        expect(flattenArrays(arrays)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
    })

    function flattenArrays(arr) {
        return arr.reduce((prev, curr) => prev.concat(curr));
    }

})

describe('loop', () => {
    it('Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning. When defining the function, you can use a regular loop to do the actual looping.', () => {
        const logSpy = jest.spyOn(console, 'log');

        //act
        loop(3, n => n > 0, n => n - 1, console.log);

        expect(logSpy).toHaveBeenNthCalledWith(1, 3);
        expect(logSpy).toHaveBeenNthCalledWith(2, 2);
        expect(logSpy).toHaveBeenNthCalledWith(3, 1);
    })

    /**
    It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.
    */
    function loop(value, testFn, updateFn, bodyFn) {
        bodyFn(value);
        if (testFn(value)) {
            value = updateFn(value);
            loop(value, testFn, updateFn, bodyFn);
        }
    }
})

describe('everyWithLoop', () => {
    it('returns true when the given function returns true for every element in the array', () => {
        expect(every([1, 3, 5], n => n < 10)).toBe(true);
        expect(every([2, 4, 16], n => n < 10)).toBe(false);
        expect(every([], n => n < 10)).toBe(true);
    })

    function every(array, test) {
        for (let e of array) {
            if (!test(e)) return false;
        }
        return true;
    }
})

describe('everyWithSome', () => {
    it('returns true when the given function returns true for every element in the array', () => {
        expect(every([1, 3, 5], n => n < 10)).toBe(true);
        expect(every([2, 4, 16], n => n < 10)).toBe(false);
        expect(every([], n => n < 10)).toBe(true);
    })

    function every(array, test) {
        return !array.some(e => !test(e));
    }
})