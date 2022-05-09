const { describe, it, expect } = require('@jest/globals');

describe('prototypes', () => {
    it('empty object has Object.prototype', () => {
        expect(Object.getPrototypeOf({})).toStrictEqual(Object.prototype);
    })

    it('Math.max has Function.prototype', () => {
        expect(Object.getPrototypeOf(Math.max)).toStrictEqual(Function.prototype);
    })

    it('empty array has Array.prototype', () => {
        expect(Object.getPrototypeOf([])).toStrictEqual(Array.prototype);
    })

})