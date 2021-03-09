const { getRandomNumber } = require('../utils');

/**
 * @export
 * @param {{
  *  key: string,
  *  type: string,
  *  config: {
  *    range: [number, number],
  *    validator: (data: number) => boolean
  *    hooks: {
  *      afterCreated: (result: any) => any
  *    }
  *  },
  * }} options
  */
function generator(options, _generator) {
  let result = 0;

  const {
    config = {}
  } = options;

  if (config.range) {
    result = Math.round(getRandomNumber(config.range[0], config.range[1]));
    if (config.validator) {
      while(!config.validator(result)) {
        result = Math.round(getRandomNumber(config.range[0], config.range[1]));
      }
    }
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;