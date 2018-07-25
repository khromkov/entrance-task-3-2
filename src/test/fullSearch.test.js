const fullSearch = require('../fullSearch');

describe('fullSearch', () => {
  test('test', () => {
    const input = {
      devices: [
        {
          power: 950,
          duration: 24,
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

    const output = new Array(24).fill(1).map((_, index) => [index]);

    expect(fullSearch(input)).toEqual(output);
  });

  test('test', () => {
    const input = {
      devices: [
        {
          power: 1,
          duration: 1,
        },
      ],
      rates: [
        {
          from: 0,
          to: 1,
          value: 1,
        },
        {
          from: 1,
          to: 0,
          value: 2,
        },
      ],
      maxPower: 2,
    };

    expect(fullSearch(input)).toEqual([[0]]);
  });

  test('test', () => {
    const input = {
      devices: [
        {
          power: 1,
          duration: 1,
        },
        {
          power: 1,
          duration: 1,
        },
      ],
      rates: [
        {
          from: 0,
          to: 1,
          value: 1,
        },
        {
          from: 1,
          to: 2,
          value: 1,
        },
        {
          from: 2,
          to: 0,
          value: 2,
        },
      ],
      maxPower: 1,
    };

    expect(fullSearch(input)).toEqual([[1, 0], [0, 1]]);
  });

  test('test', () => {
    const input = {
      devices: [
        {
          power: 2,
          duration: 2,
        },
        {
          power: 3,
          duration: 4,
        },
      ],
      rates: [
        {
          from: 0,
          to: 1,
          value: 1,
        },
        {
          from: 1,
          to: 5,
          value: 2,
        },
        {
          from: 5,
          to: 15,
          value: 4,
        },
        {
          from: 15,
          to: 0,
          value: 6,
        },
      ],
      maxPower: 4,
    };
    expect(fullSearch(input)).toEqual([[4, 0]]);
  });

  test('test', () => {
    const input = {
      devices: [
        {
          power: 2,
          duration: 2,
        },
        {
          power: 3,
          duration: 4,
        },
        {
          power: 4,
          duration: 4,
        },
      ],
      rates: [
        {
          from: 0,
          to: 1,
          value: 1,
        },
        {
          from: 1,
          to: 5,
          value: 2,
        },
        {
          from: 5,
          to: 15,
          value: 4,
        },
        {
          from: 15,
          to: 0,
          value: 6,
        },
      ],
      maxPower: 4,
    };
    expect(fullSearch(input)).toEqual([
      [8, 4, 0],
      [9, 4, 0],
      [10, 4, 0],
      [11, 4, 0],
      [12, 4, 0],
      [13, 4, 0],
    ]);
  });
});
