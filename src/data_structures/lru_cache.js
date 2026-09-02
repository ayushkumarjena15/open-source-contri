/**
 * Doubly Linked List Node for LRU Cache
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * Least Recently Used (LRU) Cache implementation
 * Time Complexity: O(1) for get, put, delete, and has
 * Space Complexity: O(capacity)
 */
class LRUCache {
  /**
   * @param {number} capacity - Maximum number of items the cache can hold
   */
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error('Capacity must be a positive integer');
    }
    this.capacity = capacity;
    this.cache = new Map();
    
    // Initialize dummy head and tail
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Internal helper: Add node right after head (most recently used)
   * @private
   */
  _addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * Internal helper: Remove an existing node from the linked list
   * @private
   */
  _removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  /**
   * Internal helper: Move an existing node to head (mark as most recently used)
   * @private
   */
  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  /**
   * Internal helper: Pop the current tail item (least recently used)
   * @private
   */
  _popTail() {
    const res = this.tail.prev;
    this._removeNode(res);
    return res;
  }

  /**
   * Get value by key from cache and mark as most recently used
   * @param {*} key 
   * @returns {*} Value or -1 if not found
   */
  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this._moveToHead(node);
    return node.value;
  }

  /**
   * Insert or update key-value pair in cache
   * @param {*} key 
   * @param {*} value 
   */
  put(key, value) {
    const node = this.cache.get(key);
    if (node) {
      node.value = value;
      this._moveToHead(node);
    } else {
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this._addNode(newNode);

      if (this.cache.size > this.capacity) {
        const tail = this._popTail();
        this.cache.delete(tail.key);
      }
    }
  }

  /**
   * Check if key exists in cache (does not update LRU position)
   * @param {*} key 
   * @returns {boolean}
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Delete item by key from cache
   * @param {*} key 
   * @returns {boolean} True if found and deleted, false otherwise
   */
  delete(key) {
    const node = this.cache.get(key);
    if (!node) return false;
    this._removeNode(node);
    this.cache.delete(key);
    return true;
  }

  /**
   * Clear all items from the cache
   */
  clear() {
    this.cache.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Returns array of keys in MRU (Most Recently Used) to LRU order
   * @returns {Array}
   */
  keys() {
    const keys = [];
    let current = this.head.next;
    while (current !== this.tail) {
      keys.push(current.key);
      current = current.next;
    }
    return keys;
  }

  /**
   * Returns array of values in MRU to LRU order
   * @returns {Array}
   */
  values() {
    const vals = [];
    let current = this.head.next;
    while (current !== this.tail) {
      vals.push(current.value);
      current = current.next;
    }
    return vals;
  }

  /**
   * Returns array of [key, value] pairs in MRU to LRU order
   * @returns {Array<[*, *]>}
   */
  entries() {
    const pairs = [];
    let current = this.head.next;
    while (current !== this.tail) {
      pairs.push([current.key, current.value]);
      current = current.next;
    }
    return pairs;
  }

  /**
   * Get current size of cache
   */
  get size() {
    return this.cache.size;
  }
}

module.exports = LRUCache;
