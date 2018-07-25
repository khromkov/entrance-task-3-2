const problem = require('../index');

describe('index', () => {
  it('should be 2', () => {
    expect(problem.test(1, 1)).toBe(2);
  });
});
