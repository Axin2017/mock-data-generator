const _number = require('./number');
const _string = require('./string');
const _float = require('./float');
const _object = require('./object');
const _array = require('./array');
const _date = require('./date');
const _oneOf = require('./oneOf');


const TYPES_MAP = {
  number: 'number',
  string: 'string',
  float: 'float',
  object: 'object',
  array: 'array',
  date: 'date',
  oneOf: 'oneOf'
}

const typeMap = {
  [TYPES_MAP.number]: _number,
  [TYPES_MAP.string]: _string,
  [TYPES_MAP.float]: _float,
  [TYPES_MAP.object]: _object,
  [TYPES_MAP.array]: _array,
  [TYPES_MAP.date]: _date,
  [TYPES_MAP.oneOf]: _oneOf,
};

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

/**
 * 
 * @param {string} name 类型名称
 * @param {{ generator: (options: object) => any }} typeConfig 
 */
function registerType(name, typeConfig) {
  
  if (typeMap[name]) {
    throw new Error(`you have registered type of ${name} already`)
  }

  typeMap[name] = function(options) {
    const result = typeConfig.generator(options);
    return result;
  }
}

exports.generator = generator;
exports.registerType = registerType;
exports.TYPES_MAP = TYPES_MAP;