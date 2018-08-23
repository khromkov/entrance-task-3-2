const checkInput = require('../checkInput');
const input = require('./input.json');

describe('checkSolution', () => {
  test('empty', () => {
    expect(checkInput({})).not.toBe(null);
  });

  test('empty devices', () => {
    expect(
      checkInput({
        devices: [],
      }),
    ).not.toBe(null);
  });

  test('duplicate devices', () => {
    expect(
      checkInput({
        devices: [{ id: '1' }, { id: '2' }],
      }),
    ).not.toBe(null);
  });

  test('cross rates', () => {
    expect(
      checkInput({
        devices: [{ id: '0', name: 'name', power: 1, duration: 1 }],
        rates: [{ from: 1, to: 2, value: 1 }, { from: 1, to: 2, value: 1 }],
        maxPower: 100,
      }),
    ).not.toBe(null);
  });

  test('problem example', () => {
    expect(checkInput(input)).toBe(null);
  });
});
