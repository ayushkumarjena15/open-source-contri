const test = require('node:test');
const assert = require('node:assert/strict');
const {
  bfs,
  dfs,
  dijkstra,
  topologicalSort,
  hasCycle
} = require('../src/algorithms/graph');

test('bfs traverses graph layer by layer', () => {
  const graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
  };

  const order = bfs(graph, 'A');
  assert.deepEqual(order, ['A', 'B', 'C', 'D', 'E', 'F']);
  assert.deepEqual(bfs(graph, 'NonExistent'), []);
});

test('dfs traverses deeply before backtracking', () => {
  const graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': [],
    'E': []
  };

  const order = dfs(graph, 'A');
  assert.deepEqual(order, ['A', 'B', 'D', 'C', 'E']);
  assert.deepEqual(dfs(graph, 'NonExistent'), []);
});

test('dijkstra computes shortest paths from source', () => {
  const graph = {
    'A': [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
    'B': [{ node: 'C', weight: 5 }, { node: 'D', weight: 10 }],
    'C': [{ node: 'E', weight: 3 }],
    'D': [{ node: 'Z', weight: 11 }],
    'E': [{ node: 'D', weight: 4 }],
    'Z': []
  };

  const { distances, previous } = dijkstra(graph, 'A');
  assert.equal(distances['A'], 0);
  assert.equal(distances['B'], 4);
  assert.equal(distances['C'], 2);
  assert.equal(distances['E'], 5);
  assert.equal(distances['D'], 9); // A -> C -> E -> D (2+3+4=9 vs A->B->D=14)
  assert.equal(distances['Z'], 20); // 9 + 11
  assert.equal(previous['D'], 'E');
});

test('topologicalSort returns valid order for DAG and detects cycle', () => {
  const dag = {
    '5': ['2', '0'],
    '4': ['0', '1'],
    '2': ['3'],
    '3': ['1'],
    '1': [],
    '0': []
  };

  const order = topologicalSort(dag);
  assert.ok(Array.isArray(order));
  assert.equal(order.length, 6);
  // Verify ordering constraints
  assert.ok(order.indexOf('5') < order.indexOf('2'));
  assert.ok(order.indexOf('2') < order.indexOf('3'));
  assert.ok(order.indexOf('3') < order.indexOf('1'));

  const cyclicGraph = {
    'A': ['B'],
    'B': ['C'],
    'C': ['A']
  };
  assert.equal(topologicalSort(cyclicGraph), null);
});

test('hasCycle accurately detects cycles in graphs', () => {
  const cyclicGraph = {
    'A': ['B'],
    'B': ['C'],
    'C': ['A']
  };
  assert.equal(hasCycle(cyclicGraph), true);

  const acyclicGraph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
  };
  assert.equal(hasCycle(acyclicGraph), false);
});
