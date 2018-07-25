/*
eslint-disable global-require
*/

const optimizeSearch = require('../optimizeSearch');
const checkSolution = require('../checkSolution');
const withPerformanceLogger = require('../utils/withPerformanceLogger');

const withPLOptimizeSearch = withPerformanceLogger(optimizeSearch);

describe('optimizeSearch', () => {
  test('test', () => {
    const input = require('./input.json');
    const output = require('./output.json');

    expect(checkSolution(input, withPLOptimizeSearch(input))).toEqual(output.consumedEnergy);
  });

  test('worst', () => {
    const input = {
      devices: [
        {
          id: '1',
          power: 1,
          duration: 1,
        },
        {
          id: '2',
          power: 1,
          duration: 1,
        },
        {
          id: '3',
          power: 1,
          duration: 1,
        },
        {
          id: '4',
          power: 1,
          duration: 1,
        },
        {
          id: '5',
          power: 1,
          duration: 1,
        },
      ],
      rates: [
        {
          from: 0,
          to: 1,
          value: 100,
        },
        {
          from: 1,
          to: 0,
          value: 101,
        },
      ],
      maxPower: 10,
    };

    const output = {
      consumedEnergy: { devices: { '1': 0.1, '2': 0.1, '3': 0.1, '4': 0.1, '5': 0.1 }, value: 0.5 },
      schedule: { '0': ['1', '2', '3', '4', '5'] },
    };

    expect(withPLOptimizeSearch(input)).toEqual(output);
  });
});
