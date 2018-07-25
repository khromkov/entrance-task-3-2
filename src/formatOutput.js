const getPriceArray = require('./getPriceArray');
const isWorkAtHour = require('./isWorkAtHour');

module.exports = (data, position) => {
  const { devices, rates } = data;
  const priceArray = getPriceArray(rates);

  const result = {
    schedule: {},
    consumedEnergy: {
      devices: {},
    },
  };

  let totalPrice = 0;
  for (let j = 0; j < position.length; j += 1) {
    const { id, duration, power } = devices[j];
    let price = 0;
    for (let i = 0; i < 24; i += 1) {
      if (isWorkAtHour(i, position[j], duration)) {
        if (!result.schedule[i]) {
          result.schedule[i] = [];
        }
        result.schedule[i].push(id);

        const devicePriceAtHour = power * priceArray[i];
        price += devicePriceAtHour;
        totalPrice += devicePriceAtHour;
      }
    }

    result.consumedEnergy.devices[id] = price / 1000;
  }

  result.consumedEnergy.value = totalPrice / 1000;

  return result;
};
