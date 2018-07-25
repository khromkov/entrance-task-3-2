const getPriceArray = require('./getPriceArray');
const isCorrectRunTime = require('./isCorrectRunTime');
const isWorkAtHour = require('./isWorkAtHour');

module.exports = data => {
  const { maxPower, devices, rates } = data;

  const priceArray = getPriceArray(rates);
  const n = devices.length;

  const positons = new Array(n);
  let minPrice;
  let result;
  for (let i = 0; i < 24 ** n; i += 1) {
    let state = i;

    let isCorrectByPositions = true;
    for (let j = 0; j < n; j += 1) {
      const device = devices[j];
      const positon = state % 24;
      if (!isCorrectRunTime(positon, device.duration, device.mode)) {
        isCorrectByPositions = false;
        break;
      }
      positons[j] = positon;
      state = Math.floor(state / 24);
    }

    if (isCorrectByPositions) {
      let isCanBeAnswer = true;
      let price = 0;
      for (let j = 0; j < 24; j += 1) {
        let power = 0;
        for (let k = 0; k < n; k += 1) {
          const device = devices[k];
          if (isWorkAtHour(j, positons[k], device.duration)) {
            power += device.power;
            price += device.power * priceArray[j];

            if (power > maxPower || (minPrice && price > minPrice)) {
              isCanBeAnswer = false;
              break;
            }
          }
        }

        if (!isCanBeAnswer) {
          break;
        }
      }
      if (isCanBeAnswer) {
        if (!minPrice || price < minPrice) {
          result = [positons.concat()];
          minPrice = price;
        } else if (price === minPrice) {
          result.push(positons.concat());
        }
      }
    }
  }

  return result;
};
