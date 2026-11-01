#!/usr/bin/env node
// Prints everything the Daily Paper needs, compactly, so writing it costs few tokens:
// today's Launch Plan task, plan status for the last 3 days, and stories filed in those 3 days.
// Usage: node ~/phone-apps/daily-data.mjs [YYYY-MM-DD]   (default: today, Eastern)
import fs from 'node:fs';
import os from 'node:os';
import vm from 'node:vm';
import { execSync } from 'node:child_process';

const HOME = os.homedir();
const TOTAL = 364, LOOKBACK = 3;

// Phone check-offs land in the data repo, so get the latest. Offline still works.
try { execSync('git pull -q --ff-only', { cwd: `${HOME}/launch-plan-data`, stdio: 'ignore', timeout: 20000 }); }
catch { console.log('(could not pull launch-plan-data; progress may be stale)'); }

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(`${HOME}/phone-apps/docs/launch-plan/plan.js`, 'utf8') + '\n;globalThis.P = { SPRINT_WD, SPRINT_WE, GEN_WD, GEN_WE, PINNED };', ctx);
const { SPRINT_WD, SPRINT_WE, GEN_WD, GEN_WE, PINNED } = ctx.P;
const progress = JSON.parse(fs.readFileSync(`${HOME}/launch-plan-data/progress.json`, 'utf8'));
const start = progress.lp12_settings?.main?.start;
if (!start) { console.log('No start date saved in progress.json.'); process.exit(1); }

/* same day order as buildDays() in the app and remind.mjs */
const WD = [...SPRINT_WD, ...GEN_WD], WE = [...SPRINT_WE, ...GEN_WE], days = [];
let a = 0, b = 0;
const s = new Date(start + 'T12:00:00Z');
for (let n = 1; n <= TOTAL; n++) {
  const d = new Date(s); d.setUTCDate(s.getUTCDate() + n - 1);
  const iso = d.toISOString().slice(0, 10), we = d.getUTCDay() === 0 || d.getUTCDay() === 6;
  days.push({ n, iso, ...(PINNED[iso] || (we ? WE[b++] : WD[a++]) || { t: 'Buffer day: catch up', m: 20, w: 'Nothing overdue.' }) });
}

const today = process.argv[2] || new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
const td = days.find(d => d.iso === today);
if (!td) { console.log(`${today} is outside the plan.`); process.exit(1); }
const rec = n => progress.lp12_days?.['d' + n] || {};

console.log(`# TODAY ${today}: Day ${td.n}${td.phase ? ` (${td.phase})` : ''}`);
console.log(`Task: ${td.t}\nMinutes: ${td.m}\nGoal: ${td.d || ''}\nDone when: ${td.w || ''}`);
console.log(`Already done: ${!!rec(td.n).done}`);
if (rec(td.n).notes) console.log(`Notes: ${rec(td.n).notes}`);
const open = days.filter(d => d.n < td.n && !rec(d.n).done);
console.log(`Earlier days still open: ${open.map(d => `Day ${d.n} (${d.t})`).join('; ') || 'none'}`);

console.log(`\n# PLAN, LAST ${LOOKBACK} DAYS`);
for (const d of days.filter(d => d.n < td.n && d.n >= td.n - LOOKBACK)) {
  console.log(`- Day ${d.n} ${d.iso} [${rec(d.n).done ? 'done' : 'open'}] ${d.t}${rec(d.n).notes ? ` | ${rec(d.n).notes}` : ''}`);
}

const dayMs = 86400000, from = new Date(new Date(today + 'T12:00:00Z') - LOOKBACK * dayMs).toISOString().slice(0, 10);
console.log(`\n# STORIES FILED ${from} TO ${today}`);
const dir = `${HOME}/coach/newspaper/articles`;
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
  const x = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  if (x.date >= from && x.date <= today && !f.startsWith('daily-')) console.log(`- ${x.date} [${x.section}] ${x.headline}: ${x.dek || ''}`);
}
