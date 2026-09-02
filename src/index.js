/**
 * Open Source Developer Toolkit & Algorithms Collection
 * Main library entry point
 */

const algorithms = {
  search: require('./algorithms/search'),
  sorting: require('./algorithms/sorting'),
  graph: require('./algorithms/graph')
};

const dataStructures = {
  LRUCache: require('./data_structures/lru_cache'),
  Trie: require('./data_structures/trie'),
  PriorityQueue: require('./data_structures/priority_queue')
};

const designPatterns = {
  EventEmitter: require('./design_patterns/observer'),
  QueryBuilder: require('./design_patterns/builder'),
  ConfigManager: require('./design_patterns/singleton')
};

const utils = require('./utils/helpers');

module.exports = {
  algorithms,
  dataStructures,
  designPatterns,
  utils
};
