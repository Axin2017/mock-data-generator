const { getRandomNumber } = require('../utils');
/**
 * @export
 * @param {{
 *  key: string,
 *  type: string,
 *  config: {
 *    oneOf: [],
 *    hooks: {
 *      afterCreated: (result: any) => any
 *    }
 *  },
 * }} options
 */
function generator(options, _generator) {
  let result = '';
  let count = 0;

  const {
    config = {}
  } = options;

  const {
    oneOf = []
  } = config;


  const randomOneOf = (items) => {
    const index = getRandomNumber(0, items.length - 1);
    return items[index];
  }

  if (!oneOf.length) {
    result = undefined;
  } else {
    result = randomOneOf(oneOf);
  }

  if (config.validator) {
    while(!config.validator(result) && count < 1000) {
      count ++;
      result = randomOneOf(oneOf);
    }
  }


  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;