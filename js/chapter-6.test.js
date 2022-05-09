describe('prototypes', () => {
    it('empty object has Object.prototype', () => {
        expect(Object.getPrototypeOf({})).toStrictEqual(Object.prototype);
    })

    it('Object.prototype has no prototype', () => {
        expect(Object.getPrototypeOf(Object.prototype)).toBeNull();
    })

    it('Math.max has Function.prototype', () => {
        expect(Object.getPrototypeOf(Math.max)).toStrictEqual(Function.prototype);
    })

    it('empty array has Array.prototype', () => {
        expect(Object.getPrototypeOf([])).toStrictEqual(Array.prototype);
    })
})