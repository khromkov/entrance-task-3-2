const isCorrectRunTime = require('../isCorrectRunTime');

describe('isCorrectRunTime', () => {
  test('mode === undefined', () => {
    expect(isCorrectRunTime(0, 24)).toBe(true);
    expect(isCorrectRunTime(1, 1)).toBe(true);
  });

  test('mode === night', () => {
    expect(isCorrectRunTime(0, 24, 'night')).toBe(false);
    expect(isCorrectRunTime(0, 7, 'night')).toBe(true);
    expect(isCorrectRunTime(0, 8, 'night')).toBe(false);
    expect(isCorrectRunTime(21, 3, 'night')).toBe(true);
    expect(isCorrectRunTime(20, 3, 'night')).toBe(false);
  });

  test('mode === day', () => {
    expect(isCorrectRunTime(0, 24, 'day')).toBe(false);
    expect(isCorrectRunTime(7, 14, 'day')).toBe(true);
    expect(isCorrectRunTime(7, 15, 'day')).toBe(false);
    expect(isCorrectRunTime(6, 14, 'day')).toBe(false);
  });
});
