const { describe, it, expect } = require('@jest/globals');

function arrayToList(arr) {
    let list = {};
    for (let i = arr.length - 1; i >= 0; i--) {
        list = {
            value: arr[i],
            rest: list.hasOwnProperty("value") ? list : null,
        };
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

describe('deepEqual', () => {

    function deepEqual(a, b) {
        if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {

            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);

            if (!aKeys.every(k => aKeys[k] === bKeys[k]) || aKeys.length != bKeys.length) {
                //Differing property names or number of properties
                return false;
            }

            for (let key of Object.keys(a)) {
                if (!deepEqual(a[key], b[key])) {
                    //found an unequal value
                    return false;
                }
            }

            //these are equal values all the way down
            return true;
        }

        return a === b;
    }

    it('returns true if they are the same value', () => {

        expect(deepEqual(1, '1')).toBe(false);

        expect(deepEqual(2, 2)).toBe(true);

        let obj = { here: { is: "an" }, object: 2 };



    })

    it('returns true if they are objects with the same properties, where the values of the properties are equal when compared with a recursive call', () => {

        let obj = { here: { is: "an" }, object: 2 };

        expect(deepEqual(obj, { here: 1, object: 2 })).toBe(false);

        expect(deepEqual(obj, { here: { is: "an" }, object: 2 })).toBe(true);

    })
})