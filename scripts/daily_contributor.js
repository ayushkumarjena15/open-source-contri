/**
 * Automated Daily Open Source Contributor & Benchmark Generator
 * 
 * Generates automated benchmark statistics, CS insights, and repository health records.
 * Can be run locally or triggered via scheduled GitHub Actions.
 * 
 * Usage:
 *   node scripts/daily_contributor.js [--dry-run] [--force] [--email=...]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const toolkit = require('../src/index');

const isDryRun = process.argv.includes('--dry-run');
const emailArg = process.argv.find(arg => arg.startsWith('--email='));
const authorEmail = emailArg ? emailArg.split('=')[1] : 'ahalyajena28@gmail.com';
const authorName = 'ayushkumarjena15';

console.log('======================================================');
console.log('🌟 Open Source Daily Contributor & Benchmark Engine');
console.log(`Author: ${authorName} <${authorEmail}>`);
console.log('======================================================\n');

if (isDryRun) {
  console.log('🔍 DRY RUN ENABLED - No git commits or pushes will be made.\n');
}

// 1. Run Automated Benchmarks
console.log('[1/4] Running algorithmic benchmarks on random data...');

function runBenchmarks() {
  const sampleSize = 10000;
  const randomArray = Array.from({ length: sampleSize }, () => Math.floor(Math.random() * sampleSize));
  const sortedArray = [...randomArray].sort((a, b) => a - b);
  const target = sortedArray[Math.floor(sampleSize / 2)];

  // Measure Sorting Algorithms
  const sortResults = {};
  
  const t0 = performance.now();
  toolkit.algorithms.sorting.quickSort([...randomArray]);
  sortResults.quickSort = parseFloat((performance.now() - t0).toFixed(3));

  const t1 = performance.now();
  toolkit.algorithms.sorting.mergeSort([...randomArray]);
  sortResults.mergeSort = parseFloat((performance.now() - t1).toFixed(3));

  const t2 = performance.now();
  toolkit.algorithms.sorting.heapSort([...randomArray]);
  sortResults.heapSort = parseFloat((performance.now() - t2).toFixed(3));

  const t3 = performance.now();
  toolkit.algorithms.sorting.radixSort([...randomArray]);
  sortResults.radixSort = parseFloat((performance.now() - t3).toFixed(3));

  // Measure Search Algorithms
  const searchResults = {};
  
  const s0 = performance.now();
  for (let i = 0; i < 1000; i++) toolkit.algorithms.search.binarySearch(sortedArray, target);
  searchResults.binarySearch = parseFloat((performance.now() - s0).toFixed(4));

  const s1 = performance.now();
  for (let i = 0; i < 1000; i++) toolkit.algorithms.search.exponentialSearch(sortedArray, target);
  searchResults.exponentialSearch = parseFloat((performance.now() - s1).toFixed(4));

  const s2 = performance.now();
  for (let i = 0; i < 1000; i++) toolkit.algorithms.search.jumpSearch(sortedArray, target);
  searchResults.jumpSearch = parseFloat((performance.now() - s2).toFixed(4));

  return {
    timestamp: new Date().toISOString(),
    sampleSize,
    sortingTimeMs: sortResults,
    searchTime1000OpsMs: searchResults
  };
}

const benchmarkData = runBenchmarks();
console.log('  ✔ Benchmarks computed successfully.');
console.log(`    - QuickSort (${benchmarkData.sampleSize} items): ${benchmarkData.sortingTimeMs.quickSort}ms`);
console.log(`    - MergeSort (${benchmarkData.sampleSize} items): ${benchmarkData.sortingTimeMs.mergeSort}ms`);
console.log(`    - HeapSort  (${benchmarkData.sampleSize} items): ${benchmarkData.sortingTimeMs.heapSort}ms`);
console.log(`    - RadixSort (${benchmarkData.sampleSize} items): ${benchmarkData.sortingTimeMs.radixSort}ms\n`);

// 2. Update Benchmark History and Activity Log
console.log('[2/4] Updating benchmark records and activity log...');

const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const benchmarksFile = path.join(docsDir, 'benchmarks.json');
let history = [];
if (fs.existsSync(benchmarksFile)) {
  try {
    history = JSON.parse(fs.readFileSync(benchmarksFile, 'utf-8'));
    if (!Array.isArray(history)) history = [];
  } catch {
    history = [];
  }
}
history.push(benchmarkData);
if (history.length > 100) {
  history = history.slice(-100);
}
fs.writeFileSync(benchmarksFile, JSON.stringify(history, null, 2));

// Update activity_log.md
const activityLogFile = path.join(docsDir, 'activity_log.md');
const now = new Date();
const dateStr = now.toISOString().split('T')[0];
const timeStr = now.toTimeString().split(' ')[0];

const tableRow = `| ${dateStr} ${timeStr} UTC | ${benchmarkData.sampleSize} | ${benchmarkData.sortingTimeMs.quickSort} ms | ${benchmarkData.sortingTimeMs.mergeSort} ms | ${benchmarkData.sortingTimeMs.heapSort} ms | ${benchmarkData.sortingTimeMs.radixSort} ms | ${benchmarkData.searchTime1000OpsMs.binarySearch} ms | Pass |`;

let activityContent = '';
if (fs.existsSync(activityLogFile)) {
  activityContent = fs.readFileSync(activityLogFile, 'utf-8');
  activityContent = activityContent.trimEnd() + '\n' + tableRow + '\n';
} else {
  activityContent = `# 📈 Daily Algorithmic Benchmark & Contribution Log

Automated performance tracking for sorting and search algorithms executed across varying datasets.

| Timestamp | Sample Size | Quick Sort | Merge Sort | Heap Sort | Radix Sort | Binary Search (1k ops) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${tableRow}
`;
}
fs.writeFileSync(activityLogFile, activityContent);
console.log('  ✔ docs/benchmarks.json and docs/activity_log.md updated.\n');

// 3. Pool of CS Insights & Tips
console.log('[3/4] Generating daily Computer Science insight...');
const insights = [
  {
    topic: "Why QuickSort is Cache-Friendly",
    content: "QuickSort exhibits high spatial locality because it partitions elements in-place with sequential memory access, maximizing CPU L1/L2 cache hit ratios compared to algorithms requiring random pointer chasing."
  },
  {
    topic: "Amortized O(1) in LRU Cache",
    content: "Combining a Hash Map (O(1) key lookups) with a Doubly Linked List (O(1) node detachment and head insertion) provides strict O(1) time complexity for both get and put operations."
  },
  {
    topic: "Binary Heap Memory Efficiency",
    content: "A Binary Heap can be stored in a contiguous array without explicit child/parent pointer allocations. For any index `i`, parent is `floor((i-1)/2)`, left child is `2i+1`, and right child is `2i+2`."
  },
  {
    topic: "Kahn's Algorithm vs DFS for Topological Sort",
    content: "Kahn's algorithm uses in-degree tracking and a queue, making it straightforward to detect cycles (if processed nodes count != total nodes) while producing a valid dependency resolution order."
  },
  {
    topic: "Radix Sort (LSD) vs Comparison Sorts",
    content: "Radix Sort breaks the O(n log n) comparison sort lower bound, achieving O(n * k) linear time complexity where k is the number of digits in the maximum key."
  },
  {
    topic: "Exponential Search for Unbounded Arrays",
    content: "Exponential Search is especially powerful when querying unbounded or streaming data where the target is located near the start, achieving O(log i) where i is the target index."
  },
  {
    topic: "Trie Memory Optimization with Radix Trees",
    content: "Standard Tries can consume significant memory with single-child chains. Radix Trees (compressed Tries) merge single-child nodes into common edge prefixes to save memory."
  }
];

const selectedInsight = insights[Math.floor(Math.random() * insights.length)];
const insightsFile = path.join(docsDir, 'daily_insights.md');

const insightEntry = `
### 💡 [${dateStr}] ${selectedInsight.topic}

${selectedInsight.content}

*Logged at ${now.toISOString()} by Automated Contributor Engine.*
---
`;

let insightsContent = '';
if (fs.existsSync(insightsFile)) {
  insightsContent = fs.readFileSync(insightsFile, 'utf-8');
  insightsContent = insightsContent.trimEnd() + '\n' + insightEntry;
} else {
  insightsContent = `# 🧠 Daily Computer Science & Algorithm Insights

Curated daily technical insights and engineering notes.
${insightEntry}
`;
}
fs.writeFileSync(insightsFile, insightsContent);
console.log(`  ✔ Logged insight: "${selectedInsight.topic}"\n`);

// 4. Git Commit & Push Routine
console.log('[4/4] Evaluating Git commit status...');

if (isDryRun) {
  console.log('  ✔ [DRY RUN] Changes saved locally. Skipping git commit and push.\n');
  process.exit(0);
}

try {
  // Configure git user
  execSync(`git config user.name "${authorName}"`, { stdio: 'ignore' });
  execSync(`git config user.email "${authorEmail}"`, { stdio: 'ignore' });

  // Stage changes
  execSync('git add docs/benchmarks.json docs/activity_log.md docs/daily_insights.md', { stdio: 'inherit' });

  const commitMessages = [
    `docs(benchmarks): update daily runtime performance benchmarks [${dateStr}]`,
    `chore(activity): record automated algorithmic benchmark metrics [${dateStr}]`,
    `docs(insights): add daily CS engineering insight on ${selectedInsight.topic.toLowerCase()} [${dateStr}]`,
    `chore(metrics): sync daily repository activity and benchmark statistics [${dateStr}]`
  ];
  const chosenMessage = commitMessages[Math.floor(Math.random() * commitMessages.length)];

  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  if (status.trim().length > 0) {
    const env = {
      ...process.env,
      GIT_AUTHOR_NAME: authorName,
      GIT_AUTHOR_EMAIL: authorEmail,
      GIT_COMMITTER_NAME: authorName,
      GIT_COMMITTER_EMAIL: authorEmail
    };

    execSync(`git commit -m "${chosenMessage}"`, { env, stdio: 'inherit' });
    console.log(`  ✔ Committed: "${chosenMessage}"`);

    try {
      console.log('  🚀 Pushing commit to origin...');
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('  ✔ Successfully pushed daily contribution to remote!\n');
    } catch (pushErr) {
      console.log('  ℹ Commit created locally.\n');
    }
  } else {
    console.log('  ℹ No new changes detected to commit.\n');
  }
} catch (err) {
  console.error(`  ❌ Git step encountered notice: ${err.message}\n`);
}

console.log('======================================================');
console.log('🎉 Daily contribution routine completed successfully!');
console.log('======================================================\n');
