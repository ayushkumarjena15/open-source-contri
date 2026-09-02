/**
 * Search Algorithm Implementations
 */

/**
 * Performs a binary search on a sorted array within [left, right] bounds.
 * @param {Array<number>} arr - Sorted array of numbers
 * @param {number} target - Target element to find
 * @param {number} [left=0] - Start index
 * @param {number} [right] - End index
 * @returns {number} Index of target if found, otherwise -1
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function binarySearch(arr, target, left = 0, right = undefined) {
  if (!Array.isArray(arr) || arr.length === 0) return -1;

  const rBound = right !== undefined ? right : arr.length - 1;
  let l = Math.max(0, left);
  let r = Math.min(arr.length - 1, rBound);

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return -1;
}

/**
 * Performs a jump search on a sorted array.
 * @param {Array<number>} arr - Sorted array of numbers
 * @param {number} target - Target element to find
 * @returns {number} Index of target if found, otherwise -1
 * 
 * Time Complexity: O(sqrt(n))
 * Space Complexity: O(1)
 */
function jumpSearch(arr, target) {
  if (!Array.isArray(arr) || arr.length === 0) return -1;
  const n = arr.length;

  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }

  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }

  if (arr[prev] === target) return prev;
  return -1;
}

/**
 * Performs an exponential search on a sorted array.
 * Particularly efficient for unbounded or infinite arrays where target is near the beginning.
 * @param {Array<number>} arr - Sorted array of numbers
 * @param {number} target - Target element to find
 * @returns {number} Index of target if found, otherwise -1
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function exponentialSearch(arr, target) {
  if (!Array.isArray(arr) || arr.length === 0) return -1;
  if (arr[0] === target) return 0;

  const n = arr.length;
  let bound = 1;

  while (bound < n && arr[bound] <= target) {
    bound *= 2;
  }

  return binarySearch(arr, target, Math.floor(bound / 2), Math.min(bound, n - 1));
}

/**
 * Performs an interpolation search on a uniformly distributed sorted array.
 * @param {Array<number>} arr - Sorted array of numbers with uniform distribution
 * @param {number} target - Target element to find
 * @returns {number} Index of target if found, otherwise -1
 * 
 * Time Complexity: O(log(log n)) average, O(n) worst case
 * Space Complexity: O(1)
 */
function interpolationSearch(arr, target) {
  if (!Array.isArray(arr) || arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) return low;
      return -1;
    }

    // Estimate position with linear interpolation formula
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    if (arr[pos] === target) {
      return pos;
    }

    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1;
}

module.exports = {
  binarySearch,
  jumpSearch,
  exponentialSearch,
  interpolationSearch
};
