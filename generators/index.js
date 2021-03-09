const _number = require('./number');
const _string = require('./string');
const _float = require('./float');
const _object = require('./object');
const _array = require('./array');
const _date = require('./date');


const TYPES_MAP = {
  number: 'number',
  string: 'string',
  float: 'float',
  object: 'object',
  array: 'array',
  date: 'date'
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
  *     afterCreated: (result: any) => any
  *    }
  *  },
  *  children: [options]
  * }} options
  */
function generator(options = {}) {
  const typeMap = {
    [TYPES_MAP.number]: _number,
    [TYPES_MAP.string]: _string,
    [TYPES_MAP.float]: _float,
    [TYPES_MAP.object]: _object,
    [TYPES_MAP.array]: _array,
    [TYPES_MAP.date]: _date,
  };

  let result = null;

  const {
    type = TYPES_MAP.string,
    config = {},
  } = options;

  const typeFunc = typeMap[type];
  if (typeFunc) {
    result = typeFunc(options, generator);
  }

  const { hooks = {} } = config;
  if (hooks.afterCreated) {
    result = hooks.afterCreated(result);
  }
  
  return result;
}

exports.generator = generator;
exports.TYPES_MAP = TYPES_MAP;