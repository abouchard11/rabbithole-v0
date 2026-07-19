"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { titleFromHref } from "@/lib/wiki";

interface Props {
  html: string;
  loading: boolean;
  loadingTitle: string | null;
  onNavigate: (title: string) => void;
}

export default function ArticleView({ html, loading, loadingTitle, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [html]);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    e.preventDefault();
    if (loading) return;
    const href = a.getAttribute("href") ?? "";
    // same-page anchors: just scroll
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (a.classList.contains("new")) return; // red link — page doesn't exist
    const title = titleFromHref(href);
    if (title) onNavigate(title);
  }

  return (
    <div ref={ref} className="relative flex-1 overflow-y-auto bg-white">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-white/95">
          <div className="animate-bounce text-4xl">🐇</div>
          <p className="text-sm text-neutral-500">
            tunneling to <span className="font-semibold text-neutral-800">{loadingTitle}</span>…
          </p>
        </div>
      )}
      <div
        className="wiki-content mx-auto max-w-3xl px-4 pb-24 pt-3"
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p className="mx-auto max-w-3xl px-4 pb-28 text-xs text-neutral-400">
        Article content from Wikipedia, licensed CC BY-SA 4.0. Rabbithole is not affiliated with the
        Wikimedia Foundation.
      </p>
    </div>
  );
}
