/**
 * Graph Algorithm Implementations
 * Works with Adjacency List representations:
 * e.g., { 'A': ['B', 'C'], 'B': ['D'], 'C': [], 'D': [] }
 * or weighted: { 'A': [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }] }
 */

/**
 * Performs Breadth-First Search (BFS) starting from a source node.
 * @param {Object.<string, Array<string>>} graph - Adjacency list representation
 * @param {string} startNode - Node to start search from
 * @returns {Array<string>} Array of visited nodes in BFS order
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function bfs(graph, startNode) {
  if (!graph || !graph[startNode]) return [];

  const visited = new Set();
  const queue = [startNode];
  const order = [];

  visited.add(startNode);

  while (queue.length > 0) {
    const current = queue.shift();
    order.push(current);

    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      const neighborNode = typeof neighbor === 'object' ? neighbor.node : neighbor;
      if (!visited.has(neighborNode)) {
        visited.add(neighborNode);
        queue.push(neighborNode);
      }
    }
  }

  return order;
}

/**
 * Performs Depth-First Search (DFS) starting from a source node.
 * @param {Object.<string, Array<string>>} graph - Adjacency list representation
 * @param {string} startNode - Node to start search from
 * @returns {Array<string>} Array of visited nodes in DFS order
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function dfs(graph, startNode) {
  if (!graph || !graph[startNode]) return [];

  const visited = new Set();
  const order = [];

  function traverse(node) {
    visited.add(node);
    order.push(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      const neighborNode = typeof neighbor === 'object' ? neighbor.node : neighbor;
      if (!visited.has(neighborNode)) {
        traverse(neighborNode);
      }
    }
  }

  traverse(startNode);
  return order;
}

/**
 * Finds the shortest path from startNode to all other reachable nodes using Dijkstra's algorithm.
 * @param {Object.<string, Array<{node: string, weight: number}>>} graph - Weighted graph
 * @param {string} startNode - Starting node
 * @returns {{ distances: Object.<string, number>, previous: Object.<string, string|null> }}
 * 
 * Time Complexity: O((V + E) log V) with priority queue / O(V^2) with array
 * Space Complexity: O(V)
 */
function dijkstra(graph, startNode) {
  if (!graph || !(startNode in graph)) {
    return { distances: {}, previous: {} };
  }

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    // Pick the unvisited node with minimum distance
    let minNode = null;
    let minDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }

    if (minNode === null || minDistance === Infinity) {
      break;
    }

    unvisited.delete(minNode);

    const neighbors = graph[minNode] || [];
    for (const edge of neighbors) {
      const neighbor = typeof edge === 'object' ? edge.node : edge;
      const weight = typeof edge === 'object' ? edge.weight : 1;

      if (unvisited.has(neighbor)) {
        const alt = distances[minNode] + weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = minNode;
        }
      }
    }
  }

  return { distances, previous };
}

/**
 * Computes topological ordering of a Directed Acyclic Graph (DAG) using Kahn's Algorithm.
 * @param {Object.<string, Array<string>>} graph - Adjacency list representation
 * @returns {Array<string>|null} Topological order array or null if graph has a cycle
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function topologicalSort(graph) {
  if (!graph) return [];

  const inDegree = {};
  const nodes = Object.keys(graph);

  for (const node of nodes) {
    inDegree[node] = 0;
  }

  for (const node of nodes) {
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      const neighborNode = typeof neighbor === 'object' ? neighbor.node : neighbor;
      if (inDegree[neighborNode] !== undefined) {
        inDegree[neighborNode]++;
      } else {
        inDegree[neighborNode] = 1;
      }
    }
  }

  const queue = [];
  for (const node of Object.keys(inDegree)) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }

  const order = [];
  while (queue.length > 0) {
    const current = queue.shift();
    order.push(current);

    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      const neighborNode = typeof neighbor === 'object' ? neighbor.node : neighbor;
      inDegree[neighborNode]--;
      if (inDegree[neighborNode] === 0) {
        queue.push(neighborNode);
      }
    }
  }

  if (order.length !== Object.keys(inDegree).length) {
    return null; // Cycle detected
  }

  return order;
}

/**
 * Detects whether a directed graph contains any cycles.
 * @param {Object.<string, Array<string>>} graph - Adjacency list representation
 * @returns {boolean} True if cycle exists, false otherwise
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function hasCycle(graph) {
  if (!graph) return false;

  const visited = new Set();
  const recStack = new Set();

  function isCyclicUtil(node) {
    visited.add(node);
    recStack.add(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      const neighborNode = typeof neighbor === 'object' ? neighbor.node : neighbor;
      if (!visited.has(neighborNode)) {
        if (isCyclicUtil(neighborNode)) return true;
      } else if (recStack.has(neighborNode)) {
        return true;
      }
    }

    recStack.delete(node);
    return false;
  }

  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      if (isCyclicUtil(node)) return true;
    }
  }

  return false;
}

module.exports = {
  bfs,
  dfs,
  dijkstra,
  topologicalSort,
  hasCycle
};
