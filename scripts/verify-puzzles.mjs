// Verifies candidate puzzle chains against the live English Wikipedia link graph.
// For each puzzle, keeps the first chain whose every consecutive edge (A -> B)
// verifies: B (or a redirect to B) appears in A's outgoing wikitext links.
// Emits src/data/puzzles.json (dated daily from START_DATE) + a console report.
import { CANDIDATES } from './candidates.mjs';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';

const CACHE_FILE = '.verify-cache.json';

const API = 'https://en.wikipedia.org/w/api.php';
const UA = 'RabbitholePuzzleVerifier/0.1 (alex11bouchard@gmail.com)';
const START_DATE = '2026-07-15';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let apiCalls = 0;
async function api(params) {
  apiCalls++;
  const qs = new URLSearchParams({ format: 'json', formatversion: '2', maxlag: '5', ...params });
  for (let attempt = 1; attempt <= 7; attempt++) {
    try {
      const res = await fetch(`${API}?${qs}`, { headers: { 'User-Agent': UA } });
      if (res.status === 429 || res.status >= 500) {
        const retryAfter = Number(res.headers.get('retry-after')) || 0;
        const wait = Math.max(retryAfter * 1000, 3000 * attempt);
        if (attempt === 7) throw new Error(`HTTP ${res.status} after retries`);
        await sleep(wait);
        continue;
      }
      const json = await res.json();
      if (json.error) {
        if (json.error.code === 'maxlag' && attempt < 7) { await sleep(5000 * attempt); continue; }
        throw new Error(`API error: ${json.error.code} ${json.error.info ?? ''}`);
      }
      await sleep(400);
      return json;
    } catch (e) {
      if (attempt === 7) throw e;
      await sleep(3000 * attempt);
    }
  }
}

// Canonical title (follows redirects); null if page missing.
const canonCache = new Map();
async function canonical(title) {
  const key = title.toLowerCase();
  if (canonCache.has(key)) return canonCache.get(key);
  const j = await api({ action: 'query', titles: title, redirects: '1' });
  const page = j.query?.pages?.[0];
  const result = page && !page.missing ? page.title : null;
  canonCache.set(key, result);
  return result;
}

// All outgoing ns=0 wikitext links of a page (lowercased set). Cached.
const linksCache = new Map();
async function outgoingLinks(title) {
  const key = title.toLowerCase();
  if (linksCache.has(key)) return linksCache.get(key);
  const j = await api({ action: 'parse', page: title, prop: 'links', redirects: '1' });
  const raw = j.parse?.links;
  if (!raw || raw.length === 0) throw new Error(`empty parse links for "${title}" — refusing to cache`);
  const links = new Set(
    raw.filter((l) => l.ns === 0).map((l) => (l.title ?? l['*']).toLowerCase()),
  );
  linksCache.set(key, links);
  return links;
}

// All redirect titles pointing at `title` (lowercased). Cached.
const redirCache = new Map();
async function redirectsTo(title) {
  const key = title.toLowerCase();
  if (redirCache.has(key)) return redirCache.get(key);
  const j = await api({ action: 'query', titles: title, prop: 'redirects', rdlimit: 'max' });
  const rds = new Set((j.query?.pages?.[0]?.redirects ?? []).map((r) => r.title.toLowerCase()));
  redirCache.set(key, rds);
  return rds;
}

// Does page A link (directly or via a redirect) to page B?
async function edgeExists(a, b) {
  const links = await outgoingLinks(a);
  if (links.has(b.toLowerCase())) return true;
  const rds = await redirectsTo(b);
  for (const rd of rds) if (links.has(rd)) return true;
  return false;
}

async function verifyChain(start, chain, target) {
  const path = [start, ...chain, target];
  // Resolve all to canonical titles first
  const canon = [];
  for (const t of path) {
    const c = await canonical(t);
    if (!c) return { ok: false, reason: `missing page: ${t}` };
    canon.push(c);
  }
  for (let i = 0; i < canon.length - 1; i++) {
    try {
      const ok = await edgeExists(canon[i], canon[i + 1]);
      if (!ok) return { ok: false, reason: `no edge: ${canon[i]} -> ${canon[i + 1]}` };
    } catch (e) {
      return { ok: false, reason: `error on ${canon[i]} -> ${canon[i + 1]}: ${e.message}` };
    }
  }
  return { ok: true, path: canon };
}

// ---- disk cache (survives reruns; keeps us polite to the API) ----
if (existsSync(CACHE_FILE)) {
  const c = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
  for (const [k, v] of Object.entries(c.canon ?? {})) canonCache.set(k, v);
  for (const [k, v] of Object.entries(c.links ?? {})) linksCache.set(k, new Set(v));
  for (const [k, v] of Object.entries(c.redirs ?? {})) redirCache.set(k, new Set(v));
  console.log(`(cache: ${linksCache.size} link sets, ${canonCache.size} canonicals)`);
}
function saveCache() {
  writeFileSync(CACHE_FILE, JSON.stringify({
    canon: Object.fromEntries(canonCache),
    links: Object.fromEntries([...linksCache].map(([k, v]) => [k, [...v]])),
    redirs: Object.fromEntries([...redirCache].map(([k, v]) => [k, [...v]])),
  }));
}
process.on('exit', saveCache);

const puzzles = [];
const report = [];
for (const c of CANDIDATES) {
  let chosen = null;
  const fails = [];
  for (const chain of c.chains) {
    const v = await verifyChain(c.start, chain, c.target);
    if (v.ok) { chosen = v.path; break; }
    fails.push(v.reason);
  }
  if (!chosen) {
    report.push(`✗ DROP  ${c.start} -> ${c.target}   [${fails.join(' | ')}]`);
    continue;
  }
  const directLink = await edgeExists(chosen[0], chosen[chosen.length - 1]);
  const par = chosen.length - 1;
  report.push(`✓ PAR ${par}  ${chosen.join(' → ')}${directLink ? '   (⚠ hole-in-one possible)' : ''}`);
  puzzles.push({
    start: chosen[0],
    target: chosen[chosen.length - 1],
    startEmoji: c.startEmoji,
    targetEmoji: c.targetEmoji,
    tagline: c.tagline,
    par,
    path: chosen,
    holeInOnePossible: directLink,
  });
}

// Order: lead with the punchiest reasonable pars (3s first, then 2s, then 4+)
puzzles.sort((a, b) => {
  const rank = (p) => (p.par === 3 ? 0 : p.par === 2 ? 1 : 2);
  return rank(a) - rank(b);
});
const dated = puzzles.map((p, i) => {
  const d = new Date(`${START_DATE}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + i);
  return { num: i + 1, date: d.toISOString().slice(0, 10), ...p };
});

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/puzzles.json', JSON.stringify(dated, null, 2));
console.log(report.join('\n'));
console.log(`\n${puzzles.length}/${CANDIDATES.length} puzzles verified · ${apiCalls} API calls`);
