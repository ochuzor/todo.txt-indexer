import { add } from '../src';

describe('add', () => {
    it('should retun 3', () => {
        expect(add(1, 2)).toEqual(3);
    });
});
