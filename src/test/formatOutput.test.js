const formatOutput = require('../formatOutput');

test('test', () => {
  const input = {
    devices: [
      {
        id: 'id',
        power: 950,
        duration: 2,
      },
    ],
    rates: [
      {
        from: 0,
        to: 0,
        value: 1,
      },
    ],
    maxPower: 950,
  };

  const output = {
    schedule: {
      0: ['id'],
      1: ['id'],
    },
    consumedEnergy: {
      value: (950 * 2) / 1000,
      devices: {
        id: (950 * 2) / 1000,
      },
    },
  };

  expect(formatOutput(input, [0])).toEqual(output);
});
