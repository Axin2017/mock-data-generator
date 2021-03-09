const { getRandomNumber, dateFormat } = require('../utils');

/**
 * @export
 * @param {{
 *  key: string,
 *  type: string,
 *  config: {
 *    dateRange: [Date, Date],
 *    validator: (data: Date) => boolean,
 *    formater: string,
 *    hooks: {
 *      afterCreated: (result: any) => any
 *    }
 *  },
 * }} options
 */
function generator (options, _generator) {
  let result = new Date();
  const {
    config = {},
  } = options;
  
  if (config.dateRange) {
    const startDate = new Date(config.dateRange[0]).valueOf();
    const endDate = new Date(config.dateRange[1]).valueOf();
    result = new Date(Math.round(getRandomNumber(startDate, endDate)));
  }

  if (config.formater) {
    result = dateFormat(result, config.formater);
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;