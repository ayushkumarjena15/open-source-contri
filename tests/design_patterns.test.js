const test = require('node:test');
const assert = require('node:assert/strict');
const EventEmitter = require('../src/design_patterns/observer');
const QueryBuilder = require('../src/design_patterns/builder');
const ConfigManager = require('../src/design_patterns/singleton');

test('EventEmitter subscribe, publish, once and unsubscribe', () => {
  const emitter = new EventEmitter();
  const received = [];

  const unsubscribe = emitter.subscribe('user:created', (user) => {
    received.push(`Created ${user.name}`);
  });

  let onceCount = 0;
  emitter.once('user:created', () => {
    onceCount++;
  });

  emitter.publish('user:created', { name: 'Alice' });
  emitter.publish('user:created', { name: 'Bob' });

  assert.equal(received.length, 2);
  assert.equal(onceCount, 1);

  unsubscribe();
  emitter.publish('user:created', { name: 'Charlie' });
  assert.equal(received.length, 2); // no new items received after unsubscribe
});

test('QueryBuilder fluent SQL generation and AST structure', () => {
  const qb = new QueryBuilder();
  const query = qb
    .from('users')
    .select('id', 'name', 'email')
    .where('age', '>=', 18)
    .where('status', 'active')
    .orderBy('created_at', 'DESC')
    .limit(10)
    .offset(20)
    .build();

  assert.equal(query.collection, 'users');
  assert.deepEqual(query.fields, ['id', 'name', 'email']);
  assert.equal(query.limit, 10);
  assert.equal(query.offset, 20);

  const sql = qb.toSQL();
  assert.equal(sql, "SELECT id, name, email FROM users WHERE age >= 18 AND status = 'active' ORDER BY created_at DESC LIMIT 10 OFFSET 20");
});

test('ConfigManager Singleton instance consistency and state', () => {
  ConfigManager.resetInstance();

  const instance1 = ConfigManager.getInstance();
  const instance2 = ConfigManager.getInstance();
  const instance3 = new ConfigManager();

  assert.equal(instance1, instance2);
  assert.equal(instance2, instance3);

  instance1.set('apiUrl', 'https://api.example.com');
  assert.equal(instance2.get('apiUrl'), 'https://api.example.com');
  assert.equal(instance3.has('apiUrl'), true);

  assert.equal(instance2.get('missingKey', 'defaultVal'), 'defaultVal');

  instance2.delete('apiUrl');
  assert.equal(instance1.has('apiUrl'), false);
});
