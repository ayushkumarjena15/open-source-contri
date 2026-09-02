/**
 * Trie (Prefix Tree) Node
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.prefixCount = 0;
  }
}

/**
 * Trie (Prefix Tree) Data Structure
 * Ideal for dictionary lookups, autocomplete, and prefix search.
 * 
 * Time Complexity:
 * - Insert: O(L) where L is length of word
 * - Search: O(L)
 * - StartsWith: O(L)
 * Space Complexity: O(N * L) where N is number of words
 */
class Trie {
  constructor() {
    this.root = new TrieNode();
    this._wordCount = 0;
  }

  /**
   * Inserts a word into the trie.
   * @param {string} word 
   */
  insert(word) {
    if (typeof word !== 'string' || word.length === 0) return;

    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
      current.prefixCount++;
    }

    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this._wordCount++;
    }
  }

  /**
   * Checks if the exact word exists in the trie.
   * @param {string} word 
   * @returns {boolean}
   */
  search(word) {
    if (typeof word !== 'string' || word.length === 0) return false;

    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return current.isEndOfWord === true;
  }

  /**
   * Checks if any word in the trie starts with the given prefix.
   * @param {string} prefix 
   * @returns {boolean}
   */
  startsWith(prefix) {
    if (typeof prefix !== 'string') return false;
    if (prefix.length === 0) return true;

    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return true;
  }

  /**
   * Deletes a word from the trie.
   * @param {string} word 
   * @returns {boolean} True if deleted, false if word not present
   */
  delete(word) {
    if (typeof word !== 'string' || word.length === 0) return false;

    let wordDeleted = false;

    const _deleteHelper = (node, str, index) => {
      if (index === str.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        this._wordCount--;
        wordDeleted = true;
        return node.children.size === 0;
      }

      const char = str[index];
      if (!node.children.has(char)) return false;

      const childNode = node.children.get(char);
      const shouldDeleteChild = _deleteHelper(childNode, str, index + 1);

      if (wordDeleted) {
        childNode.prefixCount--;
      }

      if (shouldDeleteChild) {
        node.children.delete(char);
        return !node.isEndOfWord && node.children.size === 0;
      }

      return false;
    };

    _deleteHelper(this.root, word, 0);
    return wordDeleted;
  }

  /**
   * Retrieves all words in the trie that start with the given prefix.
   * @param {string} [prefix=''] 
   * @returns {Array<string>}
   */
  wordsWithPrefix(prefix = '') {
    if (typeof prefix !== 'string') return [];

    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char);
    }

    const words = [];
    const collect = (node, currentWord) => {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }
      for (const [char, childNode] of node.children.entries()) {
        collect(childNode, currentWord + char);
      }
    };

    collect(current, prefix);
    return words;
  }

  /**
   * Returns count of words starting with prefix.
   * @param {string} prefix 
   * @returns {number}
   */
  countWordsWithPrefix(prefix = '') {
    if (typeof prefix !== 'string') return 0;
    if (prefix.length === 0) return this._wordCount;

    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return 0;
      }
      current = current.children.get(char);
    }

    return current.prefixCount;
  }

  /**
   * Returns the total number of unique words stored in the trie.
   */
  get size() {
    return this._wordCount;
  }

  /**
   * Clears the entire trie.
   */
  clear() {
    this.root = new TrieNode();
    this._wordCount = 0;
  }
}

module.exports = Trie;
