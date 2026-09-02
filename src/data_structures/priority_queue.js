/**
 * Priority Queue implemented via Binary Heap
 * Supports custom comparators or default Min/Max ordering.
 */

class PriorityQueue {
  /**
   * @param {Function} [comparator] - Function (a, b) => number. Returns < 0 if `a` has higher priority than `b`.
   * Default is Min-Priority (lowest value dequeued first).
   */
  constructor(comparator = (a, b) => a.priority - b.priority) {
    this.comparator = comparator;
    this.heap = [];
  }

  /**
   * Creates a MinPriorityQueue instance
   * @returns {PriorityQueue}
   */
  static min() {
    return new PriorityQueue((a, b) => a.priority - b.priority);
  }

  /**
   * Creates a MaxPriorityQueue instance
   * @returns {PriorityQueue}
   */
  static max() {
    return new PriorityQueue((a, b) => b.priority - a.priority);
  }

  /**
   * Internal helper: Get parent index
   * @private
   */
  _parent(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Internal helper: Get left child index
   * @private
   */
  _leftChild(index) {
    return 2 * index + 1;
  }

  /**
   * Internal helper: Get right child index
   * @private
   */
  _rightChild(index) {
    return 2 * index + 2;
  }

  /**
   * Internal helper: Swap two elements in heap
   * @private
   */
  _swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  /**
   * Internal helper: Bubble up element to restore heap property
   * @private
   */
  _siftUp(index) {
    let current = index;
    while (current > 0) {
      const p = this._parent(current);
      if (this.comparator(this.heap[current], this.heap[p]) < 0) {
        this._swap(current, p);
        current = p;
      } else {
        break;
      }
    }
  }

  /**
   * Internal helper: Bubble down element to restore heap property
   * @private
   */
  _siftDown(index) {
    let current = index;
    const size = this.heap.length;

    while (this._leftChild(current) < size) {
      let candidate = this._leftChild(current);
      const right = this._rightChild(current);

      if (right < size && this.comparator(this.heap[right], this.heap[candidate]) < 0) {
        candidate = right;
      }

      if (this.comparator(this.heap[candidate], this.heap[current]) < 0) {
        this._swap(current, candidate);
        current = candidate;
      } else {
        break;
      }
    }
  }

  /**
   * Inserts an element into the priority queue.
   * @param {*} element - Payload element
   * @param {number} [priority=0] - Numeric priority score
   */
  enqueue(element, priority = 0) {
    const node = typeof priority === 'number' && priority !== undefined
      ? { element, priority }
      : (typeof element === 'object' && element !== null && 'priority' in element ? element : { element, priority: 0 });

    this.heap.push(node);
    this._siftUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the highest priority element.
   * @returns {*} The element with highest priority, or null if empty
   */
  dequeue() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop().element;

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._siftDown(0);
    return top.element;
  }

  /**
   * Returns highest priority element without removing it.
   * @returns {*}
   */
  peek() {
    if (this.isEmpty()) return null;
    return this.heap[0].element;
  }

  /**
   * Returns highest priority item (including priority score) without removing it.
   * @returns {{ element: *, priority: number }|null}
   */
  peekEntry() {
    if (this.isEmpty()) return null;
    return { ...this.heap[0] };
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Returns the number of elements in the queue.
   * @returns {number}
   */
  get size() {
    return this.heap.length;
  }

  /**
   * Clears the priority queue.
   */
  clear() {
    this.heap = [];
  }

  /**
   * Returns array copy of items currently in the heap.
   * @returns {Array}
   */
  toArray() {
    return this.heap.map(item => item.element);
  }
}

module.exports = PriorityQueue;
