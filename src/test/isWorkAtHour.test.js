const isWorkAtHour = require('../isWorkAtHour');

describe('index', () => {
  it('should be true', () => {
    expect(isWorkAtHour(0, 0, 24)).toBe(true);
  });
  it('should be true', () => {
    expect(isWorkAtHour(23, 23, 2)).toBe(true);
    expect(isWorkAtHour(0, 23, 2)).toBe(true);
  });
});
