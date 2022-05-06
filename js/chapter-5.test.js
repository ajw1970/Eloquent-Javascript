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
    });
});