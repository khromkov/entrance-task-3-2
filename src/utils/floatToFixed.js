module.exports = (number, fixedCount) => {
  const div = 10 ** fixedCount;
  return Math.round(number * div) / div;
};
