const Joi = require('joi');

const deviceScheme = Joi.object().keys({
  id: Joi.string()
    .alphanum()
    .uppercase()
    .required(),
  name: Joi.string().required(),
  power: Joi.number().required(),
  duration: Joi.number()
    .min(1)
    .max(24)
    .required(),
  mode: Joi.any().valid(['day', 'night']),
});

const rateScheme = Joi.object().keys({
  from: Joi.number()
    .min(0)
    .max(23)
    .required(),
  to: Joi.number()
    .min(0)
    .max(23)
    .required(),
  value: Joi.number()
    .min(0)
    .required(),
});

const inputScheme = Joi.object().keys({
  devices: Joi.array()
    .unique('id')
    .items(deviceScheme)
    .min(1)
    .required(),
  rates: Joi.array()
    .items(rateScheme)
    .min(1)
    .required(),
  maxPower: Joi.number()
    .min(0)
    .required(),
});

module.exports = input => {
  let result = null;
  Joi.validate(input, inputScheme, error => {
    result = error;
  });

  if (!result) {
    const hours = Array(24);
    for (let i = 0; i < input.rates.length; i += 1) {
      const rate = input.rates[i];
      let index = rate.from;
      do {
        if (hours[index] != null) {
          result = new Error(`rate ${hours[index]} cross with rate ${i}`);
        } else {
          hours[index] = i;
        }
        index = (index + 1) % 24;
      } while (index !== rate.to);

      if (result) {
        break;
      }
    }
  }

  return result;
};
