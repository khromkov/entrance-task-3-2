const floatToFixed = require('../floatToFixed');

describe('floatToFixed', () => {
  test('zero sign after point', () => {
    expect(floatToFixed(1, 0)).toBe(1);
    expect(floatToFixed(0.900000009, 0)).toBe(1);
  });

  test('one sign after point', () => {
    expect(floatToFixed(1.0, 1)).toBe(1);
    expect(floatToFixed(0.900000009, 1)).toBe(0.9);
    expect(floatToFixed(0.95, 1)).toBe(1);
  });
});
