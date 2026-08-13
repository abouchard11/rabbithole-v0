"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArticleView from "@/components/ArticleView";
import LinkBoard from "@/components/LinkBoard";
import { getPuzzle, msUntilNextUTCMidnight, todayUTC } from "@/lib/puzzles";
import { fetchArticle, sameTitle, wikipediaUrl, type WikiPage } from "@/lib/wiki";
import { roast, scoreName, shareText } from "@/lib/roast";
import { loadStats, recordResult, todayResult } from "@/lib/storage";
import type { DayResult, Stats } from "@/lib/types";

type Phase = "intro" | "playing" | "won";

function fmtCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  return `${h}:${m}:${String(s % 60).padStart(2, "0")}`;
}

export default function Home() {
  const [practiceHole, setPracticeHole] = useState<number | undefined>(undefined);
  const puzzle = useMemo(() => getPuzzle(todayUTC(), practiceHole), [practiceHole]);
  const intermediates = puzzle.path.slice(1, -1);

  const [phase, setPhase] = useState<Phase>("intro");
  const [view, setView] = useState<"board" | "article">("board");
  const [html, setHtml] = useState("");
  const [current, setCurrent] = useState(puzzle.start);
  const [trail, setTrail] = useState<string[]>([]);
  const [strokes, setStrokes] = useState(0);
  const [hints, setHints] = useState(0);
  const [loadingTitle, setLoadingTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [result, setResult] = useState<DayResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(msUntilNextUTCMidnight());
  const startedAt = useRef(0);
  const cache = useRef(new Map<string, WikiPage>());

  // Mount: practice override + returning-player check
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const hole = Number(p.get("hole")) || undefined;
    if (hole) setPracticeHole(hole);
    setStats(loadStats());
    if (!hole) {
      const prior = todayResult(todayUTC());
      if (prior) {
        setResult(prior);
        setStrokes(prior.strokes);
        setHints(prior.hints);
        setTrail(prior.visited);
        setPhase("won");
      }
    }
  }, []);

  useEffect(() => {
    if (phase !== "won") return;
    const t = setInterval(() => setCountdown(msUntilNextUTCMidnight()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const load = useCallback(async (title: string): Promise<WikiPage | null> => {
    const key = title.toLowerCase();
    const hit = cache.current.get(key);
    if (hit) return hit;
    setLoadingTitle(title);
    setError(null);
    try {
      const page = await fetchArticle(title);
      cache.current.set(key, page);
      cache.current.set(page.canonical.toLowerCase(), page);
      return page;
    } catch {
      setError(`Couldn't load "${title}". Wikipedia hiccuped — try again.`);
      return null;
    } finally {
      setLoadingTitle(null);
    }
  }, []);

  async function dropIn() {
    const page = await load(puzzle.start);
    if (!page) return;
    startedAt.current = Date.now();
    setHtml(page.html);
    setCurrent(page.canonical);
    setTrail([page.canonical]);
    setStrokes(0);
    setHints(0);
    setPhase("playing");
  }

  async function onNavigate(title: string) {
    if (sameTitle(title, current)) return;
    const page = await load(title);
    if (!page) return;
    if (sameTitle(page.canonical, current)) return; // redirect back to same page
    const nextStrokes = strokes + 1;
    const nextTrail = [...trail, page.canonical];
    setStrokes(nextStrokes);
    setTrail(nextTrail);
    setCurrent(page.canonical);
    setHtml(page.html);

    if (sameTitle(page.canonical, puzzle.target)) {
      const r: DayResult = {
        won: true,
        strokes: nextStrokes + hints, // hints are stroke penalties
        par: puzzle.par,
        hints,
        ms: Date.now() - startedAt.current,
        visited: nextTrail,
      };
      setResult(r);
      if (!practiceHole) setStats(recordResult(puzzle.date, r));
      setPhase("won");
    }
  }

  async function backtrack(idx: number) {
    if (idx >= trail.length - 1) return;
    const title = trail[idx];
    const page = await load(title);
    if (!page) return;
    setTrail(trail.slice(0, idx + 1));
    setCurrent(page.canonical);
    setHtml(page.html);
  }

  function takeHint() {
    if (hints >= intermediates.length) return;
    setHints(hints + 1);
  }

  const roastLine = useMemo(() => {
    if (!result) return null;
    return roast({
      puzzleNum: puzzle.num,
      strokes: result.strokes,
      par: result.par,
      hints: result.hints,
      ms: result.ms,
      visited: result.visited.slice(1),
    });
  }, [result, puzzle]);

  async function share() {
    if (!result || !roastLine) return;
    const text = shareText({
      puzzleNum: puzzle.num,
      startEmoji: puzzle.startEmoji,
      targetEmoji: puzzle.targetEmoji,
      start: puzzle.start,
      target: puzzle.target,
      strokes: result.strokes,
      par: result.par,
      hints: result.hints,
      roastLine,
      url: window.location.origin,
    });
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      throw new Error("no navigator.share");
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* both failed — ignore */
      }
    }
  }

  const effectiveStrokes = strokes + hints;

  // ---------- INTRO ----------
  if (phase === "intro") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-burrow px-6 py-10 text-center">
        <div>
          <div className="text-6xl">🐇🕳️</div>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Rabbithole</h1>
          <p className="mt-1 text-sm text-violet-300">Wikipedia is the game board.</p>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-violet-800/60 bg-violet-950/60 p-5 text-left shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            {practiceHole ? `Practice · Hole #${puzzle.num}` : `Hole #${puzzle.num} · ${puzzle.date}`}
          </p>
          <p className="mt-3 text-2xl font-bold text-white">
            {puzzle.startEmoji} {puzzle.start}
            <span className="mx-2 text-violet-400">→</span>
            {puzzle.targetEmoji} {puzzle.target}
          </p>
          <p className="mt-2 text-sm italic text-violet-300">“{puzzle.tagline}”</p>
          <p className="mt-3 text-sm font-semibold text-amber-300">⛳ Par {puzzle.par}</p>
        </div>

        <div className="max-w-sm text-sm leading-relaxed text-violet-300">
          Get from A to B using only the links <em>inside</em> the articles. Every link you tap is a
          stroke. Hints cost +1. Beat par, get bragging rights. Miss it, get roasted.
        </div>

        <button
          onClick={dropIn}
          disabled={loadingTitle !== null}
          className="rounded-full bg-violet-500 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-violet-900/50 transition active:scale-95 disabled:opacity-60"
        >
          {loadingTitle ? "opening the burrow…" : "Drop in 🕳️"}
        </button>

        {stats && stats.streak > 0 && (
          <p className="text-sm text-violet-400">🔥 {stats.streak}-day streak</p>
        )}
        {error && <p className="max-w-sm text-sm text-red-400">{error}</p>}
        <p className="px-8 text-[11px] leading-relaxed text-violet-600">
          Content from Wikipedia · CC BY-SA 4.0 · Not affiliated with the Wikimedia Foundation
        </p>
      </main>
    );
  }

  // ---------- WON ----------
  if (phase === "won" && result) {
    const s = scoreName(result.strokes, result.par);
    return (
      <main className="flex min-h-dvh flex-col items-center gap-5 overflow-y-auto bg-burrow px-6 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
          Hole #{puzzle.num} complete
        </p>
        <div>
          <div className="text-6xl">{s.emoji}</div>
          <h1 className="mt-2 text-4xl font-black text-white">{s.name}</h1>
          <p className="mt-1 text-violet-300">
            {result.strokes} strokes · par {result.par}
            {result.hints > 0 && ` · ${result.hints} hint${result.hints > 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-violet-800/60 bg-violet-950/60 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">The roast</p>
          <p className="mt-2 text-sm leading-relaxed text-violet-100">“{roastLine}”</p>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-violet-800/60 bg-violet-950/40 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Your descent</p>
          <p className="mt-2 text-sm leading-relaxed text-violet-200">
            {result.visited.map((t, i) => (
              <span key={`${t}-${i}`}>
                {i > 0 && <span className="text-violet-500"> → </span>}
                <span className={i === result.visited.length - 1 ? "font-bold text-amber-300" : ""}>
                  {t}
                </span>
              </span>
            ))}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
            The rabbit&apos;s route (par {puzzle.par})
          </p>
          <p className="mt-1 text-sm text-violet-300">{puzzle.path.join(" → ")}</p>
        </div>

        <button
          onClick={share}
          className="rounded-full bg-violet-500 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-violet-900/50 transition active:scale-95"
        >
          {copied ? "Copied! 📋" : "Share the damage 📤"}
        </button>

        {stats && (
          <div className="flex gap-6 text-sm text-violet-300">
            <span>🔥 streak {stats.streak}</span>
            <span>🏆 best {stats.bestStreak}</span>
            <span>🎮 played {Object.keys(stats.plays).length}</span>
          </div>
        )}

        <p className="text-sm text-violet-400">
          Next hole in{" "}
          <span className="font-mono font-bold text-white">{fmtCountdown(countdown)}</span>
        </p>
        <p className="px-8 text-[11px] leading-relaxed text-violet-600">
          Content from Wikipedia · CC BY-SA 4.0 · Not affiliated with the Wikimedia Foundation
        </p>
      </main>
    );
  }

  // ---------- PLAYING ----------
  return (
    <main className="flex h-dvh flex-col bg-burrow">
      <header className="z-30 border-b border-violet-900/60 bg-[#140b2e] px-3 pb-2 pt-3 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2">
          <span className="shrink-0 text-sm font-black">🐇 #{puzzle.num}</span>
          <span className="min-w-0 truncate rounded-full bg-violet-900/70 px-3 py-1 text-sm font-semibold">
            🎯 {puzzle.targetEmoji} {puzzle.target}
          </span>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${
              effectiveStrokes <= puzzle.par ? "bg-emerald-600/80" : "bg-rose-600/80"
            }`}
          >
            ⛳ {effectiveStrokes}/{puzzle.par}
          </span>
          <button
            onClick={() => setView(view === "board" ? "article" : "board")}
            className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-sm transition active:scale-95"
            aria-label={view === "board" ? "Read the full article" : "Back to the link board"}
          >
            {view === "board" ? "📖" : "🕳️"}
          </button>
        </div>
        <div className="mx-auto mt-2 flex max-w-3xl items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {trail.map((t, i) => (
            <button
              key={`${t}-${i}`}
              onClick={() => backtrack(i)}
              className={`shrink-0 rounded-full px-2.5 py-1 ${
                i === trail.length - 1
                  ? "bg-violet-500 font-semibold text-white"
                  : "bg-violet-950 text-violet-300 active:bg-violet-800"
              }`}
            >
              {t}
            </button>
          ))}
          {hints > 0 && (
            <span className="shrink-0 rounded-full border border-amber-500/50 bg-amber-950/50 px-2.5 py-1 text-amber-300">
              💡 via {intermediates.slice(0, hints).join(" → ")}
            </span>
          )}
          {trail.length > 1 && puzzle.path.some((p) => sameTitle(p, current)) && (
            <span className="shrink-0 rounded-full border border-emerald-500/60 bg-emerald-950/60 px-2.5 py-1 text-emerald-300">
              🐾 rabbit tracks
            </span>
          )}
        </div>
      </header>

      {error && (
        <div className="bg-rose-950 px-4 py-2 text-center text-sm text-rose-200">{error}</div>
      )}

      {view === "board" ? (
        <LinkBoard
          html={html}
          current={current}
          target={puzzle.target}
          loading={loadingTitle !== null}
          loadingTitle={loadingTitle}
          onNavigate={onNavigate}
        />
      ) : (
        <ArticleView
          html={html}
          loading={loadingTitle !== null}
          loadingTitle={loadingTitle}
          onNavigate={onNavigate}
        />
      )}

      {hints < intermediates.length && (
        <button
          onClick={takeHint}
          className="fixed bottom-5 right-4 z-40 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-amber-950 shadow-lg shadow-black/40 transition active:scale-95"
        >
          💡 Hint (+1 stroke)
        </button>
      )}
      <a
        href={wikipediaUrl(current)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-4 z-40 rounded-full bg-white/10 px-3 py-2 text-[10px] text-violet-300"
      >
        CC BY-SA ↗
      </a>
    </main>
  );
}
