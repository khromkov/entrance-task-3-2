const floatToFixed = require('./floatToFixed');

module.exports = (data, position) => {
  const { devices, minPrice } = data;

  const result = {
    schedule: {},
    consumedEnergy: {
      devices: {},
      value: minPrice,
    },
  };

  for (let i = 0; i < position.length; i += 1) {
    const { duration, posiblePositions, id } = devices[i];
    const { start, price } = posiblePositions[position[i]];
    for (let j = start; j < start + duration; j += 1) {
      const normalizeJ = j % 24;
      if (!result.schedule[normalizeJ]) {
        result.schedule[normalizeJ] = [];
      }

      result.schedule[normalizeJ].push(id);
    }

    result.consumedEnergy.devices[id] = floatToFixed(price, 4);
  }

  return result;
};
