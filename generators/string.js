const { getRandomNumber, getRandomChineseWord } = require('../utils');

function GetRandomString(len) {
  let str = '';
  for (i = 0; i < len; i++) {
    str += getRandomChineseWord();
  }
  return str;
}

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
 * }} options
 */
function generator(options, _generator) {
  let result = '';

  const {
    config = {}
  } = options;

  let length = 5; // 默认长度为5
  if (config.lengthRange) {
    const randomLength = getRandomNumber(config.lengthRange[0], config.lengthRange[1]);
    length = randomLength;
  } else {
    length = config.length ? config.length : length;
  }
  result = GetRandomString(length);

  if (config.validator) {
    while(!config.validator(result)) {
      result = GetRandomString(length);
    }
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;