module.exports = (start, duration, power, priceArray) => {
  let price = 0;
  for (let i = start; i < start + duration; i += 1) {
    price += (power / 1000) * priceArray[i % 24];
  }
  return price;
};
