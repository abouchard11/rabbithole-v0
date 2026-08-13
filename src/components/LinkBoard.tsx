"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildBoard } from "@/lib/board";
import { sameTitle } from "@/lib/wiki";

interface Props {
  html: string;
  current: string;
  target: string;
  loading: boolean;
  loadingTitle: string | null;
  onNavigate: (title: string) => void;
}

export default function LinkBoard({ html, current, target, loading, loadingTitle, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const board = useMemo(() => buildBoard(html, current), [html, current]);
  const [q, setQ] = useState("");
  const [leadOpen, setLeadOpen] = useState(false);

  // New page: clear filter, collapse lead, scroll to top
  useEffect(() => {
    setQ("");
    setLeadOpen(false);
    ref.current?.scrollTo({ top: 0 });
  }, [html]);

  const query = q.trim().toLowerCase();
  const sections = useMemo(() => {
    if (!query) return board.sections;
    return board.sections
      .map((s) => ({
        ...s,
        links: s.links.filter(
          (l) => l.text.toLowerCase().includes(query) || l.title.toLowerCase().includes(query)
        ),
      }))
      .filter((s) => s.links.length > 0);
  }, [board, query]);

  const shown = sections.reduce((n, s) => n + s.links.length, 0);

  return (
    <div ref={ref} className="relative flex-1 overflow-y-auto">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#140b2e]/95">
          <div className="animate-bounce text-4xl">🐇</div>
          <p className="text-sm text-violet-300">
            tunneling to <span className="font-semibold text-white">{loadingTitle}</span>…
          </p>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 pb-28 pt-3">
        {board.lead && (
          <button
            onClick={() => setLeadOpen(!leadOpen)}
            className="w-full rounded-xl border border-violet-800/50 bg-violet-950/50 p-3 text-left text-sm leading-relaxed text-violet-200"
          >
            <span className={leadOpen ? "" : "line-clamp-3"}>{board.lead}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-widest text-violet-500">
              {leadOpen ? "collapse ▲" : "read more ▼"}
            </span>
          </button>
        )}

        <div className="sticky top-0 z-10 -mx-4 mt-3 bg-gradient-to-b from-[#140b2e] via-[#140b2e]/95 to-transparent px-4 pb-2 pt-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Filter ${board.total} exits…`}
            className="w-full rounded-xl border border-violet-800/60 bg-violet-950/70 px-3 py-2.5 text-sm text-white placeholder-violet-500 outline-none focus:border-violet-500"
          />
        </div>

        {sections.map((s) => (
          <div key={s.heading} className="mt-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">
              {s.heading}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {s.links.map((l) => {
                const isTarget = sameTitle(l.title, target);
                return (
                  <button
                    key={l.title}
                    onClick={() => !loading && onNavigate(l.title)}
                    className={
                      isTarget
                        ? "animate-pulse rounded-full bg-amber-400 px-3 py-1.5 text-sm font-bold text-amber-950 shadow-lg shadow-amber-900/50 transition active:scale-95"
                        : "rounded-full border border-violet-800/60 bg-violet-900/40 px-3 py-1.5 text-sm text-violet-100 transition hover:bg-violet-700/50 active:scale-95"
                    }
                  >
                    {isTarget ? `⛳ ${l.text}` : l.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {shown === 0 && (
          <p className="mt-8 text-center text-sm text-violet-400">
            No exits match &ldquo;{q}&rdquo;. The rabbit shrugs.
          </p>
        )}

        <p className="mt-8 text-xs text-violet-600">
          Link data from Wikipedia, CC BY-SA 4.0. Not affiliated with the Wikimedia Foundation.
        </p>
      </div>
    </div>
  );
}
