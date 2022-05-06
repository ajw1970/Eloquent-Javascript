const { describe, it, expect } = require('@jest/globals');

describe('ArrayToList', () => {

    function arrayToList(arr) {
        let list = {};
        for (let i = arr.length -1; i >= 0; i--) {
            list = {
                value: arr[i],
                rest: list.hasOwnProperty("value") ? list : null,
            };
            console.log(list.hasOwnProperty("value"));
        }
        return list;
    }

    it('builds up list structure', () => {
        let result = arrayToList([10,20]);

        let expected = {value: 10, rest: {value: 20, rest: null}};

        expect(result).toStrictEqual(expected);
    })
})

describe('listToArray', () => {

    function listToArray(list) {
        let result = [];
        while (list.rest !== null) {
            result.push(list.value);
            list = list.rest;
        }
        result.push(list.value);
        return result;
    }

    it('produces array from a list', () => {
        let result = listToArray({ value: 10, rest: { value: 20, rest: null } });

        let expected = [10, 20];

        expect(result).toEqual(expect.arrayContaining(expected));
    })
})