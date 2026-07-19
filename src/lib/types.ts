export interface Puzzle {
  num: number;
  date: string; // YYYY-MM-DD (UTC)
  start: string;
  target: string;
  startEmoji: string;
  targetEmoji: string;
  tagline: string;
  par: number;
  path: string[]; // editorial path incl. start & target — powers hints
  holeInOnePossible?: boolean;
}

export interface DayResult {
  won: boolean;
  strokes: number;
  par: number;
  hints: number;
  ms: number;
  visited: string[];
}

export interface Stats {
  streak: number;
  bestStreak: number;
  lastWinDate: string | null;
  plays: Record<string, DayResult>;
}
