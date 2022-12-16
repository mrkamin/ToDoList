

import add from './sum.js';

describe('sum.js', function () {
    test('add two numbers', function () {
        expect(add(1, 2)).toBe(3);
    });
});