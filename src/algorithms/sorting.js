/**
 * Sorting Algorithm Implementations
 */

/**
 * Default comparator function for numeric comparison.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
const defaultComparator = (a, b) => a - b;

/**
 * Sorts an array using the QuickSort algorithm.
 * @param {Array<number>} arr - Array to sort
 * @param {Function} [comparator=defaultComparator] - Comparison function
 * @returns {Array<number>} New sorted array
 * 
 * Time Complexity: O(n log n) average, O(n^2) worst case
 * Space Complexity: O(log n) stack space
 */
function quickSort(arr, comparator = defaultComparator) {
  if (!Array.isArray(arr) || arr.length <= 1) return Array.isArray(arr) ? [...arr] : [];

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const middle = [];
  const right = [];

  for (const item of arr) {
    const cmp = comparator(item, pivot);
    if (cmp < 0) left.push(item);
    else if (cmp > 0) right.push(item);
    else middle.push(item);
  }

  return [...quickSort(left, comparator), ...middle, ...quickSort(right, comparator)];
}

/**
 * Sorts an array using the MergeSort algorithm.
 * @param {Array<number>} arr - Array to sort
 * @param {Function} [comparator=defaultComparator] - Comparison function
 * @returns {Array<number>} New sorted array
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function mergeSort(arr, comparator = defaultComparator) {
  if (!Array.isArray(arr) || arr.length <= 1) return Array.isArray(arr) ? [...arr] : [];

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), comparator);
  const right = mergeSort(arr.slice(mid), comparator);

  return merge(left, right, comparator);
}

function merge(left, right, comparator) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (comparator(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Sorts an array in-place or returns a sorted copy using the HeapSort algorithm.
 * @param {Array<number>} arr - Array to sort
 * @param {Function} [comparator=defaultComparator] - Comparison function
 * @returns {Array<number>} New sorted array
 * 
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1) auxiliary (creates a copy of input)
 */
function heapSort(arr, comparator = defaultComparator) {
  if (!Array.isArray(arr) || arr.length <= 1) return Array.isArray(arr) ? [...arr] : [];
  const result = [...arr];
  const n = result.length;

  const heapify = (size, rootIdx) => {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    if (left < size && comparator(result[left], result[largest]) > 0) {
      largest = left;
    }

    if (right < size && comparator(result[right], result[largest]) > 0) {
      largest = right;
    }

    if (largest !== rootIdx) {
      const temp = result[rootIdx];
      result[rootIdx] = result[largest];
      result[largest] = temp;
      heapify(size, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements one by one from heap
  for (let i = n - 1; i > 0; i--) {
    const temp = result[0];
    result[0] = result[i];
    result[i] = temp;

    heapify(i, 0);
  }

  return result;
}

/**
 * Sorts an array of non-negative integers using Radix Sort (LSD).
 * @param {Array<number>} arr - Array of non-negative integers
 * @returns {Array<number>} Sorted array
 * 
 * Time Complexity: O(nk) where k is the number of digits in max number
 * Space Complexity: O(n + k)
 */
function radixSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return Array.isArray(arr) ? [...arr] : [];
  
  // Separate negatives and positives if any
  const negatives = arr.filter(x => x < 0).map(x => -x);
  const positives = arr.filter(x => x >= 0);

  const radixSortHelper = (nums) => {
    if (nums.length <= 1) return nums;
    let max = Math.max(...nums);
    let exp = 1;

    let res = [...nums];
    while (Math.floor(max / exp) > 0) {
      const count = Array(10).fill(0);
      const output = Array(res.length).fill(0);

      for (let i = 0; i < res.length; i++) {
        const digit = Math.floor(res[i] / exp) % 10;
        count[digit]++;
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      for (let i = res.length - 1; i >= 0; i--) {
        const digit = Math.floor(res[i] / exp) % 10;
        output[count[digit] - 1] = res[i];
        count[digit]--;
      }

      res = output;
      exp *= 10;
    }

    return res;
  };

  const sortedPositives = radixSortHelper(positives);
  const sortedNegatives = radixSortHelper(negatives).reverse().map(x => -x);

  return [...sortedNegatives, ...sortedPositives];
}

/**
 * Sorts an array using the InsertionSort algorithm.
 * Efficient for small or nearly sorted arrays.
 * @param {Array<number>} arr - Array to sort
 * @param {Function} [comparator=defaultComparator] - Comparison function
 * @returns {Array<number>} New sorted array
 * 
 * Time Complexity: O(n) best, O(n^2) average/worst
 * Space Complexity: O(1) auxiliary
 */
function insertionSort(arr, comparator = defaultComparator) {
  if (!Array.isArray(arr) || arr.length <= 1) return Array.isArray(arr) ? [...arr] : [];
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;

    while (j >= 0 && comparator(result[j], key) > 0) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = key;
  }

  return result;
}

module.exports = {
  quickSort,
  mergeSort,
  heapSort,
  radixSort,
  insertionSort
};
