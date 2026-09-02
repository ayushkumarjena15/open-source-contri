const test = require('node:test');
const assert = require('node:assert/strict');
const PriorityQueue = require('../src/data_structures/priority_queue');

test('PriorityQueue default / min heap behavior', () => {
  const pq = PriorityQueue.min();
  pq.enqueue('Task 3', 3);
  pq.enqueue('Task 1', 1);
  pq.enqueue('Task 4', 4);
  pq.enqueue('Task 2', 2);

  assert.equal(pq.size, 4);
  assert.equal(pq.peek(), 'Task 1');
  assert.equal(pq.dequeue(), 'Task 1');
  assert.equal(pq.dequeue(), 'Task 2');
  assert.equal(pq.dequeue(), 'Task 3');
  assert.equal(pq.dequeue(), 'Task 4');
  assert.equal(pq.dequeue(), null);
  assert.equal(pq.isEmpty(), true);
});

test('PriorityQueue max heap behavior', () => {
  const pq = PriorityQueue.max();
  pq.enqueue('Low', 10);
  pq.enqueue('Critical', 100);
  pq.enqueue('Medium', 50);

  assert.equal(pq.peek(), 'Critical');
  assert.equal(pq.dequeue(), 'Critical');
  assert.equal(pq.dequeue(), 'Medium');
  assert.equal(pq.dequeue(), 'Low');
});

test('PriorityQueue handles peekEntry, clear, and toArray', () => {
  const pq = new PriorityQueue();
  pq.enqueue('A', 5);
  pq.enqueue('B', 2);

  assert.deepEqual(pq.peekEntry(), { element: 'B', priority: 2 });
  assert.equal(pq.toArray().length, 2);

  pq.clear();
  assert.equal(pq.size, 0);
  assert.equal(pq.peek(), null);
});
