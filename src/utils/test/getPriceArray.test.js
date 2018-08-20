const getPriceArray = require('../getPriceArray');

const rates = [
  {
    from: 7,
    to: 10,
    value: 1,
  },
  {
    from: 10,
    to: 17,
    value: 2,
  },
  {
    from: 17,
    to: 21,
    value: 3,
  },
  {
    from: 21,
    to: 23,
    value: 4,
  },
  {
    from: 23,
    to: 7,
    value: 5,
  },
];

const arr = [5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5];

describe('getPriceArray', () => {
  test('custom', () => {
    expect(getPriceArray(rates)).toEqual(arr);
  });
  test('one range', () => {
    expect(getPriceArray([{ from: 0, to: 0, value: 1 }])).toEqual(new Array(24).fill(1));
  });
});
