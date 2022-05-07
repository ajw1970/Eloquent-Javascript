const { describe, it, expect } = require('@jest/globals');

function arrayToList(arr) {
    let list = {};
    for (let i = arr.length - 1; i >= 0; i--) {
        list = {
            value: arr[i],
            rest: list.hasOwnProperty("value") ? list : null,
        };
        console.log(list.hasOwnProperty("value"));
    }
    return list;
}

function listToArray(list) {
    let result = [];
    while (list.rest !== null) {
        result.push(list.value);
        list = list.rest;
    }
    result.push(list.value);
    return result;
}

function prepend(element, list) {
    return {
        value: element,
        rest: list,
    };
}

function nth(list, index) {
    return listToArray(list)[index];
}

describe('ArrayToList', () => {
    it('builds up list structure', () => {
        let result = arrayToList([10,20]);

        let expected = {value: 10, rest: {value: 20, rest: null}};

        expect(result).toStrictEqual(expected);
    })
})

describe('listToArray', () => {
    it('produces array from a list', () => {
        let result = listToArray({ value: 10, rest: { value: 20, rest: null } });

        let expected = [10, 20];

        expect(result).toEqual(expect.arrayContaining(expected));
    })
})

describe('prepend', () => {
    it('adds the element to the front of the input list', () => {
        let result = prepend(10, prepend(20, null));

        let expected = arrayToList([10, 20]);

        expect(result).toStrictEqual(expected);
    })
})

describe('nth', () => {

    it('returns the element at the given position in the list (with zero referring to the first element)', () => {
        let result = nth(arrayToList([10, 20, 30]), 1);

        expect(result).toBe(20);
    })

    it('returns undefined when there is no such element', () => {
        let result = nth(arrayToList([10, 20]), 99);

        expect(result).toBeUndefined();
    })
})