import type { DayResult, Stats } from "./types";

const KEY = "rabbithole-stats-v1";

const EMPTY: Stats = { streak: 0, bestStreak: 0, lastWinDate: null, plays: {} };

export function loadStats(): Stats {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Stats) };
  } catch {
    return EMPTY;
  }
}

function yesterdayOf(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function recordResult(dateStr: string, result: DayResult): Stats {
  const stats = loadStats();
  if (stats.plays[dateStr]) return stats; // one result per day — first one sticks
  stats.plays[dateStr] = result;
  if (result.won) {
    stats.streak = stats.lastWinDate === yesterdayOf(dateStr) ? stats.streak + 1 : 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
    stats.lastWinDate = dateStr;
  }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    /* storage full/blocked — play on */
  }
  return stats;
}

export function todayResult(dateStr: string): DayResult | null {
  return loadStats().plays[dateStr] ?? null;
}
