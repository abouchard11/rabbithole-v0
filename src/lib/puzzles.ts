import raw from "@/data/puzzles.json";
import type { Puzzle } from "./types";

const PUZZLES = raw as Puzzle[];

export function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Today's puzzle; cycles through the pool after the dated run ends. */
export function getPuzzle(dateStr: string = todayUTC(), holeOverride?: number): Puzzle {
  if (holeOverride && holeOverride >= 1 && holeOverride <= PUZZLES.length) {
    return PUZZLES[holeOverride - 1];
  }
  const exact = PUZZLES.find((p) => p.date === dateStr);
  if (exact) return exact;
  const first = new Date(`${PUZZLES[0].date}T00:00:00Z`).getTime();
  const now = new Date(`${dateStr}T00:00:00Z`).getTime();
  const dayIndex = Math.floor((now - first) / 86_400_000);
  const idx = ((dayIndex % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  return { ...PUZZLES[idx], num: dayIndex + 1, date: dateStr };
}

export function msUntilNextUTCMidnight(): number {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return next.getTime() - now.getTime();
}
