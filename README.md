# Open Source Developer Toolkit & Algorithms Collection

[![CI Workflow](https://github.com/ayushkumarjena15/open-source-contri/actions/workflows/workflow.yml/badge.svg)](https://github.com/ayushkumarjena15/open-source-contri/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

A curated, high-performance repository of fundamental data structures, algorithms, design patterns, and day-to-day developer utilities written in clean, modern JavaScript.

---

## 🌟 Highlights

- **Zero External Dependencies**: Built entirely with native JavaScript / Node.js standard APIs.
- **Thoroughly Tested**: Includes 35+ automated unit tests verifying edge cases, boundary conditions, and performance characteristics using Node's native test runner (`node:test`).
- **Comprehensive Documentation**: Complete with time & space asymptotic complexity references in [`docs/complexity_cheat_sheet.md`](docs/complexity_cheat_sheet.md).
- **Modular & Extensible**: Modular design allowing algorithms, data structures, and utilities to be imported independently.
- **Automated Quality Checks**: Built-in contribution assistant with `npm run contribute:dry` and CI workflows.

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── workflow.yml         # Continuous integration matrix test workflow
├── docs/                        # Time complexity cheat sheets & notes
│   └── complexity_cheat_sheet.md
├── scripts/
│   └── contribute.js            # Automated contribution checker & validator
├── src/
│   ├── algorithms/              # Sorting, searching, and graph algorithms
│   │   ├── graph.js             # BFS, DFS, Dijkstra, Topological Sort, Cycle Detection
│   │   ├── search.js            # Binary, Jump, Exponential, Interpolation Search
│   │   └── sorting.js           # Quick, Merge, Heap, Radix, Insertion Sort
│   ├── data_structures/         # Cache, tree, and heap data structures
│   │   ├── lru_cache.js         # O(1) Least Recently Used Cache
│   │   ├── priority_queue.js    # Min / Max Binary Heap Priority Queue
│   │   └── trie.js              # Prefix Tree for dictionary & autocomplete
│   ├── design_patterns/         # Standard software design patterns
│   │   ├── builder.js           # Fluent QueryBuilder
│   │   ├── observer.js          # Event Emitter / Pub-Sub pattern
│   │   └── singleton.js         # Thread-safe ConfigManager Singleton
│   ├── utils/                   # Helper functions and utilities
│   │   └── helpers.js           # Functional composition, string/object transforms
│   └── index.js                 # Library entry point
├── tests/                       # Automated native test suite
│   ├── design_patterns.test.js
│   ├── graph.test.js
│   ├── lru_cache.test.js
│   ├── priority_queue.test.js
│   ├── search.test.js
│   ├── sorting.test.js
│   ├── trie.test.js
│   └── utils.test.js
├── package.json
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** (bundled with Node.js)

### Installation

Clone the repository:
```bash
git clone https://github.com/ayushkumarjena15/open-source-contri.git
cd open-source-contri
```

### Running Tests

Run the built-in test suite:
```bash
npm test
```

### Pre-Contribution Validation

Check test health, module exports, and repository sanity before submitting changes:
```bash
npm run contribute:dry
```

---

## 📚 Modules Overview & Code Examples

### 1. Algorithms

#### Search
```javascript
const { search } = require('open-source-toolkit').algorithms;

const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
search.binarySearch(arr, 23);       // Output: 5
search.exponentialSearch(arr, 56);  // Output: 7
search.jumpSearch(arr, 91);         // Output: 9
```

#### Sorting
```javascript
const { sorting } = require('open-source-toolkit').algorithms;

sorting.quickSort([64, 34, 25, 12, 22, 11, 90]); // [11, 12, 22, 25, 34, 64, 90]
sorting.mergeSort([38, 27, 43, 3, 9, 82, 10]);   // [3, 9, 10, 27, 38, 43, 82]
sorting.heapSort([12, 11, 13, 5, 6, 7]);         // [5, 6, 7, 11, 12, 13]
sorting.radixSort([170, 45, 75, 90, 802, 24]);   // [24, 45, 75, 90, 170, 802]
```

#### Graph & Traversal
```javascript
const { graph } = require('open-source-toolkit').algorithms;

const adjacencyList = {
  'A': [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'D', weight: 5 }],
  'C': [{ node: 'D', weight: 1 }],
  'D': []
};

graph.bfs(adjacencyList, 'A');      // ['A', 'B', 'C', 'D']
graph.dfs(adjacencyList, 'A');      // ['A', 'B', 'D', 'C']
graph.dijkstra(adjacencyList, 'A'); // Shortest distances: { A: 0, B: 4, C: 2, D: 3 }
```

---

### 2. Data Structures

#### LRU Cache
```javascript
const { LRUCache } = require('open-source-toolkit').dataStructures;

const cache = new LRUCache(2);
cache.put('user:1', { name: 'Alice' });
cache.put('user:2', { name: 'Bob' });
cache.get('user:1'); // Returns Alice, marks user:1 as MRU
cache.put('user:3', { name: 'Charlie' }); // Evicts user:2 (LRU)
```

#### Trie (Prefix Tree)
```javascript
const { Trie } = require('open-source-toolkit').dataStructures;

const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('application');

trie.search('apple');              // true
trie.startsWith('app');            // true
trie.wordsWithPrefix('app');       // ['app', 'apple', 'application']
trie.countWordsWithPrefix('app');  // 3
```

#### Priority Queue / Binary Heap
```javascript
const { PriorityQueue } = require('open-source-toolkit').dataStructures;

const pq = PriorityQueue.min();
pq.enqueue('Critical Job', 1);
pq.enqueue('Low Priority Job', 10);
pq.enqueue('Medium Job', 5);

pq.dequeue(); // 'Critical Job'
```

---

### 3. Design Patterns

#### Observer / Pub-Sub (EventEmitter)
```javascript
const { EventEmitter } = require('open-source-toolkit').designPatterns;

const events = new EventEmitter();
const unsubscribe = events.subscribe('order:created', (order) => {
  console.log(`Processing order #${order.id}`);
});

events.publish('order:created', { id: 101 });
unsubscribe();
```

#### Fluent Builder
```javascript
const { QueryBuilder } = require('open-source-toolkit').designPatterns;

const sql = new QueryBuilder()
  .from('users')
  .select('id', 'name', 'email')
  .where('age', '>=', 18)
  .where('status', 'active')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .toSQL();
// "SELECT id, name, email FROM users WHERE age >= 18 AND status = 'active' ORDER BY created_at DESC LIMIT 10"
```

#### Singleton (ConfigManager)
```javascript
const { ConfigManager } = require('open-source-toolkit').designPatterns;

const config = ConfigManager.getInstance();
config.set('env', 'production');

const sameConfig = ConfigManager.getInstance();
console.log(sameConfig.get('env')); // 'production'
```

---

### 4. Utilities

```javascript
const { pipe, compose, curry, kebabCase, camelCase, flattenObject, chunk } = require('open-source-toolkit').utils;

// Functional Composition
const transform = pipe(
  (x) => x + 5,
  (x) => x * 2
);
transform(10); // 30

// String helpers
kebabCase('HelloWorld and_welcome'); // "hello-world-and-welcome"
camelCase('hello-world_test case');  // "helloWorldTestCase"

// Object flattening
flattenObject({ a: { b: { c: 1 } } }); // { 'a.b.c': 1 }

// Array chunking
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

---

## 🤝 Contributing

Contributions, feature requests, and issue reports are welcome!
To contribute:
1. Fork the repository at [https://github.com/ayushkumarjena15/open-source-contri](https://github.com/ayushkumarjena15/open-source-contri).
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes following conventional commits (`git commit -m 'feat: add amazing feature'`).
4. Run validation: `npm run contribute:dry`.
5. Push to your branch and open a Pull Request.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
