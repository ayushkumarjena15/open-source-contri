/**
 * Common Developer Utility Functions
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} func 
 * @param {number} [wait=100] 
 * @returns {Function}
 */
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 * @param {Function} func 
 * @param {number} [limit=100] 
 * @returns {Function}
 */
function throttle(func, limit = 100) {
  let inThrottle = false;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Deep clones an object or array handling nested structures, Dates, and RegExps.
 * @param {*} obj 
 * @returns {*}
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  if (obj instanceof Set) {
    const clonedSet = new Set();
    for (const item of obj) {
      clonedSet.add(deepClone(item));
    }
    return clonedSet;
  }

  if (obj instanceof Map) {
    const clonedMap = new Map();
    for (const [key, value] of obj) {
      clonedMap.set(deepClone(key), deepClone(value));
    }
    return clonedMap;
  }

  const clonedObj = {};
  for (const key of Object.keys(obj)) {
    clonedObj[key] = deepClone(obj[key]);
  }

  return clonedObj;
}

/**
 * Memoizes a function result based on its arguments.
 * @param {Function} fn 
 * @param {Function} [keyResolver] - Optional custom cache key resolver
 * @returns {Function}
 */
function memoize(fn, keyResolver) {
  const cache = new Map();
  return function memoized(...args) {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Splits an array into chunks of a given size.
 * @param {Array} array 
 * @param {number} [size=1] 
 * @returns {Array<Array>}
 */
function chunk(array, size = 1) {
  if (!Array.isArray(array) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Performs left-to-right function composition.
 * @param {...Function} fns 
 * @returns {Function}
 */
function pipe(...fns) {
  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

/**
 * Performs right-to-left function composition.
 * @param {...Function} fns 
 * @returns {Function}
 */
function compose(...fns) {
  return (initialValue) => fns.reduceRight((acc, fn) => fn(acc), initialValue);
}

/**
 * Converts a function of multiple arguments into a sequence of curried functions.
 * @param {Function} fn 
 * @param {number} [arity=fn.length] 
 * @returns {Function}
 */
function curry(fn, arity = fn.length) {
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

/**
 * Converts a string into kebab-case.
 * @param {string} str 
 * @returns {string}
 */
function kebabCase(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

/**
 * Converts a string into camelCase.
 * @param {string} str 
 * @returns {string}
 */
function camelCase(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, c => c.toLowerCase());
}

/**
 * Converts a string into snake_case.
 * @param {string} str 
 * @returns {string}
 */
function snakeCase(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
}

/**
 * Converts a string into PascalCase.
 * @param {string} str 
 * @returns {string}
 */
function pascalCase(str) {
  const camel = camelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Flattens a nested object into dot-notated key-value pairs.
 * @param {Object} obj 
 * @param {string} [prefix=''] 
 * @returns {Object}
 */
function flattenObject(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object' || obj instanceof Date || obj instanceof RegExp) {
    return prefix ? { [prefix]: obj } : {};
  }

  const flattened = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof RegExp)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}

/**
 * Unflattens a dot-notated object into nested structure.
 * @param {Object} obj 
 * @returns {Object}
 */
function unflattenObject(obj) {
  if (obj === null || typeof obj !== 'object') return {};

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i];
      if (!(part in current) || typeof current[part] !== 'object') {
        current[part] = {};
      }
      current = current[part];
    }

    current[keys[keys.length - 1]] = value;
  }

  return result;
}

/**
 * Groups array items based on an iteratee criterion.
 * @param {Array} array 
 * @param {Function|string} iteratee 
 * @returns {Object.<string, Array>}
 */
function groupBy(array, iteratee) {
  if (!Array.isArray(array)) return {};
  const getKey = typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];

  return array.reduce((acc, item) => {
    const key = String(getKey(item));
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * Creates an object composed of the picked object properties.
 * @param {Object} obj 
 * @param {Array<string>} keys 
 * @returns {Object}
 */
function pick(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates an object composed of properties omitting the specified keys.
 * @param {Object} obj 
 * @param {Array<string>} keys 
 * @returns {Object}
 */
function omit(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  const keySet = new Set(keys);
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!keySet.has(key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Generates an array of numbers over an arithmetic progression.
 * @param {number} start 
 * @param {number} [stop] 
 * @param {number} [step=1] 
 * @returns {Array<number>}
 */
function range(start, stop, step = 1) {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  if (step === 0) throw new Error('Step cannot be 0');

  const result = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }
  return result;
}

module.exports = {
  debounce,
  throttle,
  deepClone,
  memoize,
  chunk,
  pipe,
  compose,
  curry,
  kebabCase,
  camelCase,
  snakeCase,
  pascalCase,
  flattenObject,
  unflattenObject,
  groupBy,
  pick,
  omit,
  range
};
