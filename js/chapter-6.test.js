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

describe('Vec', () => {

    class Vec {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        plus(vector) {
            return new Vec(this.x + vector.x, this.y + vector.y);
        }

        minus(vector) {
            return new Vec(this.x - vector.x, this.y - vector.y);
        }

        get length() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
    }

    it('represents a vector in two-dimensional space. It takes x and y parameters (numbers), which it should save to properties of the same name.', () => {
        const vector = new Vec(1, 2);
        expect(vector.x).toStrictEqual(1);
        expect(vector.y).toStrictEqual(2);
    })

    it('Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (this and the parameter) x and y values.', () => {
        const vSum = new Vec(1, 2).plus(new Vec(2, 3));
        expect(vSum.x).toStrictEqual(3);
        expect(vSum.y).toStrictEqual(5);

        const vDiff = new Vec(1, 2).minus(new Vec(2, 3));
        expect(vDiff.x).toStrictEqual(-1);
        expect(vDiff.y).toStrictEqual(-1);
    })

    it('Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).', () => {
        expect(new Vec(3, 4).length).toStrictEqual(5);
    })
})

describe('Group', () => {
    class Group {
        constructor() {
            this._group = [];
        }

        get isEmpty() { return this._group.length === 0 }

        add(value) { this._group.push(value); }

        has(value) { return this._group.indexOf(value) >= 0; }

        delete(value) {
            let index = this._group.indexOf(value);
            if (index >= 0) {
                delete this._group[index];
            }
        }

        static from(iterable) {
            let newGroup = new Group();
            iterable.forEach(v => newGroup.add(v));
            return newGroup;
        }

        [Symbol.iterator]() {
            // Use a new index for each iterator. This makes multiple
            // iterations over the iterable safe for non-trivial cases,
            // such as use of break or nested looping over the same iterable.
            let index = 0;

            return {
                next: () => {
                    if (index < this._group.length) {
                        return { value: this._group[index++], done: false }
                    } else {
                        return { done: true }
                    }
                }
            }
        }
    }


    it('Its constructor creates an empty group', () => {
        let group = new Group();
        expect(group.isEmpty).toStrictEqual(true);
    })

    it('a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it', () => {
        let group = Group.from([10, 20]);
        expect(group.has(10)).toStrictEqual(true);
    })

    it('a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it', () => {
        let group = Group.from([10, 20]);
        expect(group.has(10)).toStrictEqual(true);

        group.delete(10);
        expect(group.has(10)).toStrictEqual(false);
    })

    it('implements iterable interface', () => {
        const logSpy = jest.spyOn(console, 'log');

        for (let value of Group.from(["a", "b", "c"])) {
            console.log(value);
        }

        expect(logSpy).toHaveBeenNthCalledWith(1, "a");
        expect(logSpy).toHaveBeenNthCalledWith(2, "b");
        expect(logSpy).toHaveBeenNthCalledWith(3, "c");

    })
})