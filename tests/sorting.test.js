const test = require('node:test');
const assert = require('node:assert/strict');
const {
  quickSort,
  mergeSort,
  heapSort,
  radixSort,
  insertionSort
} = require('../src/algorithms/sorting');

test('quickSort handles standard arrays, duplicates, and custom comparator', () => {
  const arr = [64, 34, 25, 12, 22, 11, 90, 22];
  assert.deepEqual(quickSort(arr), [11, 12, 22, 22, 25, 34, 64, 90]);
  assert.deepEqual(quickSort([5, 4, 3, 2, 1], (a, b) => b - a), [5, 4, 3, 2, 1]);
  assert.deepEqual(quickSort([]), []);
  assert.deepEqual(quickSort([42]), [42]);
});

test('mergeSort produces stable sorted results', () => {
  const arr = [38, 27, 43, 3, 9, 82, 10];
  assert.deepEqual(mergeSort(arr), [3, 9, 10, 27, 38, 43, 82]);
  assert.deepEqual(mergeSort([1, 2, 3]), [1, 2, 3]);
  assert.deepEqual(mergeSort([]), []);
});

test('heapSort correctly sorts in ascending and descending order', () => {
  const arr = [12, 11, 13, 5, 6, 7];
  assert.deepEqual(heapSort(arr), [5, 6, 7, 11, 12, 13]);
  assert.deepEqual(heapSort(arr, (a, b) => b - a), [13, 12, 11, 7, 6, 5]);
  assert.deepEqual(heapSort([]), []);
});

test('radixSort sorts arrays including multi-digit numbers and negatives', () => {
  const arr = [170, 45, 75, 90, 802, 24, 2, 66];
  assert.deepEqual(radixSort(arr), [2, 24, 45, 66, 75, 90, 170, 802]);
  assert.deepEqual(radixSort([-10, 5, -3, 0, 12, -1]), [-10, -3, -1, 0, 5, 12]);
  assert.deepEqual(radixSort([]), []);
});

test('insertionSort correctly sorts small and nearly sorted collections', () => {
  const arr = [29, 10, 14, 37, 13];
  assert.deepEqual(insertionSort(arr), [10, 13, 14, 29, 37]);
  assert.deepEqual(insertionSort([1, 2, 3]), [1, 2, 3]);
  assert.deepEqual(insertionSort([]), []);
});
