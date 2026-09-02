const test = require('node:test');
const assert = require('node:assert/strict');
const LRUCache = require('../src/data_structures/lru_cache');

test('LRUCache basic get, put and eviction mechanism', () => {
  const cache = new LRUCache(2);
  cache.put('a', 1);
  cache.put('b', 2);
  assert.equal(cache.get('a'), 1);
  cache.put('c', 3); // evicts 'b'
  assert.equal(cache.get('b'), -1);
  assert.equal(cache.get('c'), 3);
  assert.equal(cache.get('a'), 1);
});

test('LRUCache update existing keys and maintains size', () => {
  const cache = new LRUCache(3);
  cache.put(1, 10);
  cache.put(2, 20);
  cache.put(1, 100);
  assert.equal(cache.size, 2);
  assert.equal(cache.get(1), 100);
});

test('LRUCache has, delete, clear, and key order', () => {
  const cache = new LRUCache(3);
  cache.put('x', 1);
  cache.put('y', 2);
  cache.put('z', 3);

  assert.equal(cache.has('y'), true);
  assert.equal(cache.has('nonexistent'), false);

  assert.equal(cache.delete('y'), true);
  assert.equal(cache.delete('y'), false);
  assert.equal(cache.size, 2);

  cache.get('x'); // moves 'x' to MRU
  assert.deepEqual(cache.keys(), ['x', 'z']);
  assert.deepEqual(cache.values(), [1, 3]);

  cache.clear();
  assert.equal(cache.size, 0);
  assert.equal(cache.get('x'), -1);
});

test('LRUCache throws on invalid capacity', () => {
  assert.throws(() => new LRUCache(0));
  assert.throws(() => new LRUCache(-5));
});
