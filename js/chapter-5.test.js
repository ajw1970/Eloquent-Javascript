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