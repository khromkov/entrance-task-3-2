module.exports = func => (...args) => {
  const start = Date.now();
  const result = func(...args);
  const end = Date.now();
  console.log(end - start);
  return result;
};
