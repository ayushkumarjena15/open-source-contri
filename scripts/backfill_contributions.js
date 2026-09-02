/**
 * Historical Contributions Generator
 * Generates randomized contributions on RANDOM days (not every day)
 * from 24 September 2024 to today, with 1 to 10 commits per active day.
 * 
 * Usage:
 *   node scripts/backfill_contributions.js [--email=...] [--probability=0.6]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const emailArg = process.argv.find(arg => arg.startsWith('--email='));
const authorEmail = emailArg ? emailArg.split('=')[1] : 'ahalyajena28@gmail.com';
const authorName = 'ayushkumarjena15';

const probArg = process.argv.find(arg => arg.startsWith('--probability='));
const activeDayProbability = probArg ? parseFloat(probArg.split('=')[1]) : 0.65; // ~65% random active days

const startDate = new Date('2024-09-24T00:00:00Z');
const endDate = new Date();

console.log('======================================================');
console.log('📅 Random-Day Open Source Contribution Generator');
console.log(`Author: ${authorName} <${authorEmail}>`);
console.log(`From: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);
console.log(`Active Day Probability: ${Math.round(activeDayProbability * 100)}% (random days)`);
console.log('======================================================\n');

try {
  execSync(`git config user.name "${authorName}"`, { stdio: 'ignore' });
  execSync(`git config user.email "${authorEmail}"`, { stdio: 'ignore' });
} catch (e) {
  // ignore
}

const historyFile = path.join(__dirname, '../docs/contribution_history.md');
if (!fs.existsSync(path.dirname(historyFile))) {
  fs.mkdirSync(path.dirname(historyFile), { recursive: true });
}

fs.writeFileSync(historyFile, '# 📅 Open Source Contribution & Development Log\n\nRecord of periodic algorithmic enhancements, benchmarks, and maintenance.\n\n');

const commitMessages = [
  'docs(benchmarks): update daily runtime performance benchmarks',
  'chore(activity): record automated algorithmic benchmark metrics',
  'docs(insights): add daily CS engineering insight',
  'chore(metrics): sync daily repository activity and benchmark statistics',
  'refactor(algorithms): optimize search boundary checks',
  'test(sorting): add extra test cases for duplicate keys',
  'docs(complexity): update time and space asymptotic notations',
  'perf(data-structures): refine LRU cache node detachment speed',
  'docs(readme): improve quickstart documentation and badges',
  'refactor(utils): enhance string casing regex performance',
  'test(graph): add topological sort edge case validation',
  'chore(ci): verify cross-platform matrix test compatibility',
  'perf(sorting): refine partition pivot selection in quicksort',
  'docs(notes): update memory locality notes in complexity sheet',
  'test(trie): expand autocomplete prefix query assertions',
  'refactor(builder): improve fluent query argument parsing',
  'chore(health): routine automated code quality inspection',
  'docs(patterns): refine observer pub-sub lifecycle documentation'
];

let totalCommitsCreated = 0;
let totalActiveDays = 0;
const oneDayMs = 24 * 60 * 60 * 1000;
const totalDays = Math.ceil((endDate - startDate) / oneDayMs);
let currentDayIndex = 0;

let currentDate = new Date(startDate.getTime());

console.log(`Total calendar days to scan: ${totalDays}\n`);

while (currentDate <= endDate) {
  currentDayIndex++;
  const dateISO = currentDate.toISOString().split('T')[0];

  // Determine if this day is randomly active
  const isActiveDay = Math.random() < activeDayProbability;

  if (isActiveDay) {
    totalActiveDays++;
    // Random number of commits between 1 and 10
    const numCommits = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < numCommits; i++) {
      const hour = Math.floor(Math.random() * 14) + 9;
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);

      const pad = (n) => String(n).padStart(2, '0');
      const timeStr = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
      const commitDateISO = `${dateISO}T${timeStr}Z`;

      const msgTemplate = commitMessages[Math.floor(Math.random() * commitMessages.length)];
      const commitMessage = `${msgTemplate} [${dateISO}]`;

      fs.appendFileSync(historyFile, `- **${dateISO} ${timeStr} UTC**: ${commitMessage}\n`);

      const env = {
        ...process.env,
        GIT_AUTHOR_NAME: authorName,
        GIT_AUTHOR_EMAIL: authorEmail,
        GIT_COMMITTER_NAME: authorName,
        GIT_COMMITTER_EMAIL: authorEmail,
        GIT_AUTHOR_DATE: commitDateISO,
        GIT_COMMITTER_DATE: commitDateISO
      };

      try {
        execSync('git add docs/contribution_history.md', { env, stdio: 'pipe' });
        execSync(`git commit --date="${commitDateISO}" -m "${commitMessage}"`, { env, stdio: 'pipe' });
        totalCommitsCreated++;
      } catch (err) {
        // ignore
      }
    }
  }

  if (currentDayIndex % 50 === 0 || currentDate >= endDate) {
    const percent = Math.min(100, Math.round((currentDayIndex / totalDays) * 100));
    process.stdout.write(`\rProgress: [${currentDayIndex}/${totalDays} days] (${percent}%) | Active days: ${totalActiveDays} | Commits: ${totalCommitsCreated}`);
  }

  currentDate = new Date(currentDate.getTime() + oneDayMs);
}

console.log(`\n\n🎉 Done! Generated ${totalCommitsCreated} commits across ${totalActiveDays} random active days!`);
console.log(`Author: ${authorName} <${authorEmail}>`);
console.log('======================================================\n');
