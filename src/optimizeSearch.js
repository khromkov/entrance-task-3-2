const getPriceArray = require('./utils/getPriceArray');
const isCorrectRunTime = require('./utils/isCorrectRunTime');
const calculatePrice = require('./utils/calculatePrice');
const formatOptimizeSearch = require('./utils/formatOptimizeSearch');

module.exports = data => {
  const { maxPower, devices, rates } = data;

  const priceArray = getPriceArray(rates);
  const n = devices.length;

  // find all posible start times of devices and caclulate price for them
  const devicesScheme = [];
  for (let i = 0; i < n; i += 1) {
    const device = devices[i];
    const { duration, mode, power } = device;
    let posiblePositions = [];
    if (duration === 24) {
      posiblePositions = [
        {
          start: 0,
          price: calculatePrice(0, duration, power, priceArray),
        },
      ];
    } else {
      for (let j = 0; j < 24; j += 1) {
        if (isCorrectRunTime(j, duration, mode)) {
          posiblePositions.push({
            start: j,
            price: calculatePrice(j, duration, power, priceArray),
          });
        }
      }
    }

    const deviceScheme = {
      ...device,
      posiblePositions,
    };
    devicesScheme.push(deviceScheme);
  }

  devicesScheme.sort((a, b) => b.power - a.power);
  devicesScheme.forEach(device => {
    device.posiblePositions.sort((a, b) => a.price - b.price);
  });

  // find the solution of problem
  let minPrice = null;
  let minPricePosition = null;
  let positionIndex = 0;
  const currentPosition = new Array(n).fill(0);
  let isEndOfPosition = false;
  while (!isEndOfPosition) {
    let totalPrice = 0;
    const currentPower = new Array(24).fill(0);
    let isCorrectPostion = true;
    for (let i = 0; i < n; i += 1) {
      const { duration, power } = devicesScheme[i];
      const { start, price } = devicesScheme[i].posiblePositions[currentPosition[i]];
      for (let j = start; j < start + duration; j += 1) {
        const normalizeJ = j % 24;
        currentPower[normalizeJ] += power;
        if (currentPower[normalizeJ] > maxPower) {
          isCorrectPostion = false;
          break;
        }
      }

      if (!isCorrectPostion) {
        break;
      }

      totalPrice += price;
    }

    if (isCorrectPostion) {
      if (minPrice == null || totalPrice < minPrice) {
        minPrice = totalPrice;
        minPricePosition = currentPosition.concat();
      }
    }

    // calculate next position
    positionIndex += 1;
    let temp = positionIndex;
    for (let i = 0; i < n; i += 1) {
      const p = devicesScheme[i].posiblePositions.length;
      currentPosition[i] = temp % p;
      temp -= currentPosition[i];
      temp /= p;
    }

    // if temp !== 0 this mine we proccess all posible positions
    if (temp) {
      isEndOfPosition = true;
    }
  }

  if (!minPricePosition) {
    throw new Error('poblem has no solutions');
  }
  return formatOptimizeSearch({ ...data, devices: devicesScheme, minPrice }, minPricePosition);
};
