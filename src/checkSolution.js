/*
eslint-disable
guard-for-in,
no-restricted-syntax
*/

const getPriceArray = require('./utils/getPriceArray');
const floatToFixed = require('./utils/floatToFixed');

module.exports = (input, output) => {
  const { rates, devices, maxPower } = input;
  const priceArray = getPriceArray(rates);

  const isDay = new Array(24).fill(false);
  for (let i = 7; i < 21; i += 1) {
    isDay[i] = true;
  }

  const normalizeDevices = devices.reduce(
    (pv, v) => ({
      ...pv,
      [v.id]: v,
    }),
    {},
  );

  const { schedule } = output;

  const powerByHour = {};

  const consumedEnergy = {
    devices: {},
    value: 0,
  };

  const devicesRunHour = {};

  for (const key in schedule) {
    const hour = parseInt(key, 10);
    schedule[hour].forEach(id => {
      const device = normalizeDevices[id];
      const { mode, power } = device;
      if (mode && ((mode === 'day' && !isDay[hour]) || (mode === 'night' && isDay[hour]))) {
        throw new Error(`device (${id}) should not work at this time (${hour})`);
      }

      if (!powerByHour[hour]) {
        powerByHour[hour] = 0;
      }

      powerByHour[hour] += power;
      if (powerByHour[hour] > maxPower) {
        throw new Error(`power at ${hour} more that maxPower=${maxPower}`);
      }

      if (!consumedEnergy.devices[id]) {
        consumedEnergy.devices[id] = 0;
      }

      if (!devicesRunHour[id]) {
        devicesRunHour[id] = new Array(24).fill(false);
      }

      devicesRunHour[id][hour] = true;

      const price = (power * priceArray[hour]) / 1000;
      consumedEnergy.devices[id] = floatToFixed(consumedEnergy.devices[id] + price, 4);
      consumedEnergy.value = floatToFixed(consumedEnergy.value + price, 4);
    });
  }

  for (const id in normalizeDevices) {
    let changes = 0;
    let duration = 0;

    const deviceRunHour = devicesRunHour[id];
    deviceRunHour.forEach((flag, index) => {
      if (flag) {
        duration += 1;
      }

      if (index !== 0 && deviceRunHour[index] !== deviceRunHour[index - 1]) {
        changes += 1;
        if (changes === 3) {
          throw new Error(`runtime of ${id} is not one interval`);
        }
      }
    });

    const device = normalizeDevices[id];
    if (duration !== device.duration) {
      throw new Error(`duration of ${id} no equal to ${device.duration}`);
    }
  }

  return consumedEnergy;
};
