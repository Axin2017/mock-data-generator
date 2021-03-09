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
 *  children: [options]
 * }} options
 */
function generator (options, _generator) {
  const result = {};

  const {
    config = {},
    children = []
  } = options;

  for (let i = 0; i < children.length; i++) {
    let item = _generator(children[i]);
    if (config.validator) {
      while (!config.validator(item)) {
        item = _generator(children[i]);
      }
    }
    result[children[i].key] = item;
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }

  return result;
}

module.exports = generator;