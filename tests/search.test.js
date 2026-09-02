const test = require('node:test');
const assert = require('node:assert/strict');
const {
  binarySearch,
  jumpSearch,
  exponentialSearch,
  interpolationSearch
} = require('../src/algorithms/search');

test('binarySearch handles standard targets, missing elements, and empty arrays', () => {
  const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  assert.equal(binarySearch(arr, 2), 0);
  assert.equal(binarySearch(arr, 23), 5);
  assert.equal(binarySearch(arr, 91), 9);
  assert.equal(binarySearch(arr, 100), -1);
  assert.equal(binarySearch(arr, 0), -1);
  assert.equal(binarySearch([], 5), -1);
  assert.equal(binarySearch(null, 5), -1);
});

test('jumpSearch locates elements across various block sizes', () => {
  const arr = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
  assert.equal(jumpSearch(arr, 55), 10);
  assert.equal(jumpSearch(arr, 0), 0);
  assert.equal(jumpSearch(arr, 610), 15);
  assert.equal(jumpSearch(arr, 77), -1);
  assert.equal(jumpSearch([], 1), -1);
});

test('exponentialSearch locates elements near beginning and end', () => {
  const arr = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
  assert.equal(exponentialSearch(arr, 1), 0);
  assert.equal(exponentialSearch(arr, 9), 2);
  assert.equal(exponentialSearch(arr, 144), 11);
  assert.equal(exponentialSearch(arr, 50), -1);
  assert.equal(exponentialSearch([], 10), -1);
});

test('interpolationSearch finds elements in uniformly distributed arrays', () => {
  const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  assert.equal(interpolationSearch(arr, 10), 0);
  assert.equal(interpolationSearch(arr, 50), 4);
  assert.equal(interpolationSearch(arr, 100), 9);
  assert.equal(interpolationSearch(arr, 45), -1);
  assert.equal(interpolationSearch([], 20), -1);
});
