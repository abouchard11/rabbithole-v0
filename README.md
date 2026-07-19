# Rabbithole

A daily Wikipedia-navigation puzzle — "wiki golf." Get from a **start** article to a
**target** article using only the real links *inside* live Wikipedia pages. Every link you
click is a stroke; you're scored against a par set by a pre-verified shortest path.

> **Status: v0, parked (2026-07-15).** Playable and deployed, but exploration is on hold.
> The niche turned out crowded; the genuinely valuable asset here is the corpus of
> fact-checked connection chains, not the wikirace mechanic itself.

## How it plays

- Each puzzle is a start → target pair (e.g. **Bluetooth → Vikings**, **Banana → Isaac Newton**).
- You navigate by clicking real in-article Wikipedia links, rendered from live article HTML.
- Golf scoring: par is the length of a verified editorial path; results are named
  hole-in-one / birdie / par / bogey, etc. Hints reveal the next waypoint for +1 stroke.
- On finishing you get a snarky "roast" line and a Wordle-style shareable result. Streaks
  are tracked client-side (no accounts, no backend).

## Architecture

| Path | Role |
|------|------|
| `src/app/api/wiki/route.ts` | Server proxy: fetches + edge-caches Wikipedia Parsoid HTML |
| `src/lib/wiki.ts` | Client-side fetch + HTML sanitization before render |
| `src/components/ArticleView.tsx` | Renders sanitized article, intercepts link clicks |
| `src/lib/puzzles.ts` · `src/data/puzzles.json` | 118 puzzles; **every edge verified against the live Wikipedia link graph** |
| `src/lib/roast.ts` · `src/lib/storage.ts` | Roast/share-card generator + localStorage streaks |
| `scripts/candidates.mjs` | Hand-authored candidate chains (start, target, tagline, hops) |
| `scripts/verify-puzzles.mjs` | Verifies every chain edge against the live MediaWiki API, emits `puzzles.json` |

The puzzle pipeline is the point: candidates are proposed in `candidates.mjs`, then
`verify-puzzles.mjs` checks that each consecutive hop is a *real, currently-existing*
Wikipedia link (resolving redirects) and keeps only chains that fully verify. Nothing
ships on a claimed-but-unverified connection.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

Regenerate / re-verify the puzzle set against live Wikipedia (rate-limited, slow):

```bash
node scripts/verify-puzzles.mjs
```

Practice any hole by number via `?hole=N` (bypasses the daily gate).

## Notes

- Content is from Wikipedia under CC BY-SA 4.0; this project is not affiliated with the
  Wikimedia Foundation.
- Built with Next.js (App Router) + React + Tailwind, deployed on Vercel.
