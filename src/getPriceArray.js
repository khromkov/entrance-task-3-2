module.exports = rates => {
  const arr = new Array(24);

  rates.forEach(rate => {
    let index = rate.from;
    const { value, to } = rate;
    do {
      arr[index] = value;
      index = (index + 1) % 24;
    } while (index !== to);
  });

  return arr;
};
