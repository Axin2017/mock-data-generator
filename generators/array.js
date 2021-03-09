const { getRandomNumber } = require('../utils');

/**
 * @export
 * @param {{
 *  key: string,
 *  type: string,
 *  config: {
 *    length: number,
 *    lengthRange: [number, number],
 *    validator: (data: any) => boolean,
 *    hooks: {
 *      afterCreated: (result: any) => any
 *    }
 *  },
 *  children: [options]
 * }} options
 */
function generator (options, _generator) {
  const result = [];
  const {
    config = {},
    children = [],
  } = options;
  let length = 0;
  if (config.lengthRange) {
    const randomLength = Math.round(getRandomNumber(config.lengthRange[0], config.lengthRange[1]));
    length = randomLength;
  } else {
    length = config.length ? config.length : length;
  }

  while (result.length < length) {
    const childOption = children[0]
    const item = _generator(childOption);
    if (config.validator) {
      const isValidate = config.validator(item);
      if (isValidate) {
        result.push(item);
      }
    } else {
      result.push(item);
    }
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;