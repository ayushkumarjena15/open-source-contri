const test = require('node:test');
const assert = require('node:assert/strict');
const Trie = require('../src/data_structures/trie');

test('Trie insert, search, and startsWith', () => {
  const trie = new Trie();
  trie.insert('apple');
  trie.insert('app');
  trie.insert('application');
  trie.insert('apt');

  assert.equal(trie.search('apple'), true);
  assert.equal(trie.search('app'), true);
  assert.equal(trie.search('appl'), false);
  assert.equal(trie.search('banana'), false);

  assert.equal(trie.startsWith('app'), true);
  assert.equal(trie.startsWith('ap'), true);
  assert.equal(trie.startsWith('apt'), true);
  assert.equal(trie.startsWith('bat'), false);
});

test('Trie wordsWithPrefix and countWordsWithPrefix', () => {
  const trie = new Trie();
  trie.insert('cat');
  trie.insert('caterpillar');
  trie.insert('catering');
  trie.insert('dog');

  const catWords = trie.wordsWithPrefix('cat');
  assert.equal(catWords.length, 3);
  assert.ok(catWords.includes('cat'));
  assert.ok(catWords.includes('caterpillar'));
  assert.ok(catWords.includes('catering'));

  assert.equal(trie.countWordsWithPrefix('cat'), 3);
  assert.equal(trie.countWordsWithPrefix('d'), 1);
  assert.equal(trie.countWordsWithPrefix('z'), 0);
});

test('Trie delete and size tracking', () => {
  const trie = new Trie();
  trie.insert('hello');
  trie.insert('help');
  trie.insert('helium');
  assert.equal(trie.size, 3);

  assert.equal(trie.delete('help'), true);
  assert.equal(trie.search('help'), false);
  assert.equal(trie.search('hello'), true);
  assert.equal(trie.size, 2);

  assert.equal(trie.delete('nonexistent'), false);
  assert.equal(trie.size, 2);

  trie.clear();
  assert.equal(trie.size, 0);
  assert.equal(trie.search('hello'), false);
});
