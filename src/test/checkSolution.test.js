const checkSolution = require('../checkSolution');

describe('checkSolution', () => {
  describe('mode', () => {
    const input = {
      devices: [
        {
          id: '1',
          power: 1,
          duration: 1,
        },
      ],
      rates: [
        {
          from: 0,
          to: 0,
          value: 1000,
        },
      ],
      maxPower: 10,
    };

    const output = {
      schedule: {
        0: ['1'],
      },
      consumedEnergy: { devices: { '1': 1 }, value: 1 },
    };

    test('day', () => {
      expect(checkSolution(input, output)).toEqual(output.consumedEnergy);
    });

    test('night', () => {
      expect(checkSolution(input, output)).toEqual(output.consumedEnergy);
    });

    test('undefined', () => {
      expect(checkSolution(input, output)).toEqual(output.consumedEnergy);
    });
  });
});
