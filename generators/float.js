const { getRandomFloat } = require('../utils');

/**
 * @export
 * @param {{
  *  key: string,
  *  type: string,
  *  config: {
  *    range: [number, number],
  *    precision: number,
  *    validator: (data: number) => boolean,
  *    hooks: {
  *      afterCreated: (result: any) => any
  *    }
  *  },
  * }} options
  */
function generator(options, _generator) {
  let result = 0.0;

  const {
    config = {}
  } = options;

  const precision = config.precision || 1; // 默认保留一位小数

  if (config.range) {
    result = getRandomFloat(config.range[0], config.range[1]);
    if (config.validator) {
      while (!config.validator(result)) {
        result = getRandomFloat(config.range[0], config.range[1]);
      }
    }
  }

  result = Math.round(random * Math.pow(10, precision)) / Math.pow(10, precision);

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;