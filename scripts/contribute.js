/**
 * Open Source Contribution Assistant & Quality Checker
 * Run with: node scripts/contribute.js [--dry-run]
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const isDryRun = process.argv.includes('--dry-run');

console.log('======================================================');
console.log('🚀 Open Source Contribution Quality & Sanity Checker');
console.log('======================================================\n');

if (isDryRun) {
  console.log('🔍 Mode: DRY RUN (Validating suite without modifying git state)\n');
}

let hasErrors = false;

// Step 1: Validate Node Version
const nodeVersion = process.version;
console.log(`[1/5] Checking Node.js environment: ${nodeVersion}...`);
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
if (majorVersion < 18) {
  console.error(`❌ Node.js >= 18 is required. Found: ${nodeVersion}`);
  process.exit(1);
}
console.log('  ✔ Node.js version is compatible.\n');

// Step 2: Test Suite Execution
console.log('[2/5] Running automated test suite (native test runner)...');
try {
  const testOutput = execSync('node --test tests/**/*.test.js', {
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  console.log('  ✔ All tests passed successfully!');
  const match = testOutput.match(/ℹ pass \d+/);
  if (match) {
    console.log(`  📊 ${match[0]}`);
  }
} catch (err) {
  console.error('❌ Test suite failed!');
  console.error(err.stdout || err.message);
  hasErrors = true;
}
console.log('');

// Step 3: Module Sanity & Export Verification
console.log('[3/5] Verifying module exports and library entry point...');
try {
  const toolkit = require('../src/index');
  const requiredCategories = ['algorithms', 'dataStructures', 'designPatterns', 'utils'];
  
  for (const cat of requiredCategories) {
    if (!toolkit[cat]) {
      throw new Error(`Missing exported category: ${cat}`);
    }
  }

  // Verify submodules
  if (typeof toolkit.algorithms.search.binarySearch !== 'function') throw new Error('algorithms.search.binarySearch missing');
  if (typeof toolkit.algorithms.sorting.quickSort !== 'function') throw new Error('algorithms.sorting.quickSort missing');
  if (typeof toolkit.algorithms.graph.bfs !== 'function') throw new Error('algorithms.graph.bfs missing');
  if (typeof toolkit.dataStructures.LRUCache !== 'function') throw new Error('dataStructures.LRUCache missing');
  if (typeof toolkit.dataStructures.Trie !== 'function') throw new Error('dataStructures.Trie missing');
  if (typeof toolkit.dataStructures.PriorityQueue !== 'function') throw new Error('dataStructures.PriorityQueue missing');
  if (typeof toolkit.designPatterns.EventEmitter !== 'function') throw new Error('designPatterns.EventEmitter missing');
  if (typeof toolkit.designPatterns.QueryBuilder !== 'function') throw new Error('designPatterns.QueryBuilder missing');
  if (typeof toolkit.designPatterns.ConfigManager !== 'function') throw new Error('designPatterns.ConfigManager missing');
  if (typeof toolkit.utils.pipe !== 'function') throw new Error('utils.pipe missing');

  console.log('  ✔ All core modules, algorithms, data structures & utilities properly exported.\n');
} catch (err) {
  console.error(`❌ Module verification failed: ${err.message}`);
  hasErrors = true;
  console.log('');
}

// Step 4: Documentation & File Integrity
console.log('[4/5] Checking documentation files...');
const requiredDocs = [
  path.join(__dirname, '../README.md'),
  path.join(__dirname, '../docs/complexity_cheat_sheet.md'),
  path.join(__dirname, '../package.json'),
  path.join(__dirname, '../LICENSE')
];

let docsOk = true;
for (const doc of requiredDocs) {
  if (!fs.existsSync(doc)) {
    console.error(`  ❌ Missing required documentation file: ${doc}`);
    docsOk = false;
    hasErrors = true;
  }
}
if (docsOk) {
  console.log('  ✔ All core documentation files present.\n');
}

// Step 5: Git & Contribution Status
console.log('[5/5] Inspecting Git status...');
try {
  let branch = 'main';
  try {
    branch = execSync('git branch --show-current', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim() || 'main';
  } catch {
    // fallback
  }
  console.log(`  🌿 Target Branch: ${branch}`);

  const status = execSync('git status --short', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
  if (status.trim().length === 0) {
    console.log('  ✔ Working directory is clean.');
  } else {
    console.log('  📝 Changes detected in working directory:');
    const lines = status.trim().split('\n').map(l => `     ${l}`).join('\n');
    console.log(lines);
  }
} catch {
  console.log('  ℹ Git not configured or not a git repository yet.');
}

console.log('\n======================================================');
if (hasErrors) {
  console.error('❌ Contribution check completed with ERRORS.');
  process.exit(1);
} else {
  console.log('🎉 Contribution checks PASSED with 100% success!');
  if (isDryRun) {
    console.log('Ready for staging & commit.');
  } else {
    console.log('All checks verified for open source submission.');
  }
  console.log('======================================================\n');
  process.exit(0);
}
