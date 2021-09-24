/**
 * @export
 * @param {{
 *  key: string,
 *  type: string,
 *  config: {
 *    validator: (data: any) => boolean,
 *    hooks: {
 *      afterCreated: (result: any) => any
 *    }
 *  },
 *  properties: [options]
 * }} options
 */
function generator (options, _generator) {
  const result = {};

  const {
    config = {},
    properties = []
  } = options;

  for (let i = 0; i < properties.length; i++) {
    let item = _generator(properties[i]);
    if (config.validator) {
      while (!config.validator(item)) {
        item = _generator(properties[i]);
      }
    }
    result[properties[i].key] = item;
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;