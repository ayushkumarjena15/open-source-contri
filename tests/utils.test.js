const test = require('node:test');
const assert = require('node:assert/strict');
const {
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
} = require('../src/utils/helpers');

test('deepClone creates independent copies of nested structures, Dates, and RegExps', () => {
  const original = {
    a: 1,
    b: { c: [2, 3] },
    d: new Date('2026-01-01'),
    r: /test-regex/gi,
    s: new Set([1, 2]),
    m: new Map([['key', 'value']])
  };
  const cloned = deepClone(original);
  assert.deepEqual(cloned.a, original.a);
  assert.deepEqual(cloned.b, original.b);
  assert.equal(cloned.d.getTime(), original.d.getTime());
  assert.equal(cloned.r.source, original.r.source);
  assert.equal(cloned.s.size, 2);
  assert.equal(cloned.m.get('key'), 'value');

  cloned.b.c.push(4);
  assert.equal(original.b.c.length, 2);
});

test('chunk splits arrays properly', () => {
  const arr = [1, 2, 3, 4, 5];
  assert.deepEqual(chunk(arr, 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([], 3), []);
  assert.deepEqual(chunk(null, 2), []);
});

test('memoize caches function results', () => {
  let callCount = 0;
  const square = memoize((n) => {
    callCount++;
    return n * n;
  });

  assert.equal(square(5), 25);
  assert.equal(square(5), 25);
  assert.equal(callCount, 1);

  assert.equal(square(6), 36);
  assert.equal(callCount, 2);
});

test('pipe and compose execute functions in correct order', () => {
  const add5 = (x) => x + 5;
  const double = (x) => x * 2;
  const square = (x) => x * x;

  // pipe: ((2 + 5) * 2) ^ 2 = (7 * 2)^2 = 14^2 = 196
  const piped = pipe(add5, double, square);
  assert.equal(piped(2), 196);

  // compose: square(double(add5(2))) = (2 + 5 = 7 -> * 2 = 14 -> ^ 2 = 196)
  const composed = compose(square, double, add5);
  assert.equal(composed(2), 196);
});

test('curry transforms multi-arg function into curried chain', () => {
  const sum3 = (a, b, c) => a + b + c;
  const curriedSum = curry(sum3);

  assert.equal(curriedSum(1)(2)(3), 6);
  assert.equal(curriedSum(1, 2)(3), 6);
  assert.equal(curriedSum(1)(2, 3), 6);
  assert.equal(curriedSum(1, 2, 3), 6);
});

test('string casing transformations (kebab, camel, snake, pascal)', () => {
  assert.equal(kebabCase('HelloWorld and_welcome'), 'hello-world-and-welcome');
  assert.equal(camelCase('hello-world_test case'), 'helloWorldTestCase');
  assert.equal(snakeCase('helloWorldTest Case'), 'hello_world_test_case');
  assert.equal(pascalCase('hello-world_test'), 'HelloWorldTest');
});

test('flattenObject and unflattenObject roundtrip', () => {
  const nested = {
    user: {
      profile: {
        name: 'Ada',
        age: 36
      },
      settings: {
        theme: 'dark'
      }
    }
  };

  const flattened = flattenObject(nested);
  assert.deepEqual(flattened, {
    'user.profile.name': 'Ada',
    'user.profile.age': 36,
    'user.settings.theme': 'dark'
  });

  const unflattened = unflattenObject(flattened);
  assert.deepEqual(unflattened, nested);
});

test('groupBy clusters array items', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'banana' }
  ];

  const grouped = groupBy(items, 'type');
  assert.equal(grouped.fruit.length, 2);
  assert.equal(grouped.vegetable.length, 1);
});

test('pick and omit correctly filter object keys', () => {
  const user = { id: 1, name: 'Grace', role: 'admin', secret: '12345' };

  const picked = pick(user, ['id', 'name']);
  assert.deepEqual(picked, { id: 1, name: 'Grace' });

  const omitted = omit(user, ['secret', 'role']);
  assert.deepEqual(omitted, { id: 1, name: 'Grace' });
});

test('range generates numeric series', () => {
  assert.deepEqual(range(5), [0, 1, 2, 3, 4]);
  assert.deepEqual(range(2, 6), [2, 3, 4, 5]);
  assert.deepEqual(range(0, 10, 2), [0, 2, 4, 6, 8]);
  assert.deepEqual(range(5, 0, -1), [5, 4, 3, 2, 1]);
});

test('debounce delays execution', (t, done) => {
  let counter = 0;
  const increment = debounce(() => {
    counter++;
    assert.equal(counter, 1);
    done();
  }, 20);

  increment();
  increment();
  increment();
});

test('throttle limits execution rate', (t, done) => {
  let counter = 0;
  const increment = throttle(() => {
    counter++;
  }, 30);

  increment();
  increment();
  increment();
  assert.equal(counter, 1);

  setTimeout(() => {
    increment();
    assert.equal(counter, 2);
    done();
  }, 50);
});
