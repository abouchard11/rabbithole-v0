// The roast engine. Deterministic per (puzzle, result) so shared cards match replays.
// Tone: sharp, playful, never actually mean. The roast IS the share card.

export interface RoastInput {
  puzzleNum: number;
  strokes: number;
  par: number;
  hints: number;
  ms: number;
  visited: string[]; // canonical titles the player traversed (excl. start)
}

const MEGA_HUBS = new Set(
  [
    "united states", "france", "japan", "china", "india", "italy", "germany",
    "united kingdom", "england", "russia", "world war ii", "world war i",
    "earth", "human", "english language", "europe", "new york city", "london",
  ],
);

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

export function scoreName(strokes: number, par: number): { name: string; emoji: string } {
  if (strokes === 1) return { name: "Hole-in-one", emoji: "🎯" };
  const d = strokes - par;
  if (d <= -3) return { name: "Albatross", emoji: "🦢" };
  if (d === -2) return { name: "Eagle", emoji: "🦅" };
  if (d === -1) return { name: "Birdie", emoji: "🐦" };
  if (d === 0) return { name: "Par", emoji: "⛳" };
  if (d === 1) return { name: "Bogey", emoji: "😬" };
  if (d === 2) return { name: "Double bogey", emoji: "😅" };
  if (d === 3) return { name: "Triple bogey", emoji: "🫠" };
  return { name: `+${d}`, emoji: "🕳️" };
}

export function roast(r: RoastInput): string {
  const seed = r.puzzleNum * 31 + r.strokes * 7 + r.hints * 3 + (r.visited.length % 5);
  const d = r.strokes - r.par;
  const mins = Math.round(r.ms / 60000);

  const openers: string[] = (() => {
    if (r.strokes === 1)
      return [
        "A hole-in-one. Frame this. It will never happen again.",
        "One click. Either genius or you have read alarmingly deep into Wikipedia. Both are concerning.",
      ];
    if (d <= -2)
      return [
        "The rabbit is taking notes from YOU now.",
        "That was surgical. Wikipedia felt that.",
      ];
    if (d === -1)
      return [
        "Under par. Quietly excellent. Loudly shareable.",
        "A birdie. The links feared you today.",
      ];
    if (d === 0)
      return [
        "Par. Textbook. Almost suspiciously textbook.",
        "Exactly par — the wormhole equivalent of arriving precisely on time and telling everyone about it.",
      ];
    if (d <= 2)
      return [
        "Over par, but you got there. The scenic route builds character.",
        "A bogey. Somewhere, a Wikipedia editor is shaking their head fondly.",
      ];
    return [
      "That wasn't a rabbit hole, that was a full spelunking expedition.",
      "You saw pages today that no one was meant to see in one sitting.",
    ];
  })();

  const jabs: string[] = [];
  const hubs = r.visited.filter((v) => MEGA_HUBS.has(v.toLowerCase()));
  if (hubs.length > 0)
    jabs.push(
      `Routing through ${hubs[0]} is the wormhole equivalent of asking your mom for directions. Effective. Not cool.`,
      `Ah yes, ${hubs[0]} — the beige minivan of Wikipedia navigation.`,
    );
  const lists = r.visited.filter((v) => v.toLowerCase().startsWith("list of"));
  if (lists.length > 0)
    jabs.push(`You clicked into "${lists[0]}". Desperate times, huh.`);
  if (r.hints >= 3)
    jabs.push(
      "All three hints. That's not a rabbit hole, that's a guided museum tour with the little headphones.",
    );
  else if (r.hints === 2) jabs.push("Two hints. The rabbit carried you and it wants that on record.");
  else if (r.hints === 1) jabs.push("One hint. We'll allow it. The rabbit saw nothing.");
  if (r.hints === 0 && d <= 0) jabs.push("Zero hints, too. Insufferable. Keep it up.");
  if (r.ms < 45_000 && r.strokes <= r.par) jabs.push("Under a minute, too. The rabbit is impressed and a little frightened.");
  if (mins >= 5) jabs.push(`${mins} minutes down there. You didn't visit the rabbit hole — you moved in and hung curtains.`);
  if (r.strokes >= r.par * 2 && r.strokes > 3)
    jabs.push(`${r.strokes} clicks on a par ${r.par}. Your path looked like a toddler with an etch-a-sketch.`);

  const opener = pick(openers, seed);
  const jab = jabs.length ? pick(jabs, seed >> 2) : "";
  return jab ? `${opener} ${jab}` : opener;
}

export function shareText(opts: {
  puzzleNum: number;
  startEmoji: string;
  targetEmoji: string;
  start: string;
  target: string;
  strokes: number;
  par: number;
  hints: number;
  roastLine: string;
  url: string;
}): string {
  const s = scoreName(opts.strokes, opts.par);
  const arrows = "→".repeat(Math.max(1, Math.min(opts.strokes, 12)));
  const hintTag = opts.hints > 0 ? ` · ${opts.hints}💡` : "";
  return [
    `🐇 Rabbithole #${opts.puzzleNum}`,
    `${opts.startEmoji} ${opts.start} ${arrows} ${opts.targetEmoji} ${opts.target}`,
    `${s.emoji} ${s.name} — ${opts.strokes} strokes, par ${opts.par}${hintTag}`,
    `“${opts.roastLine}”`,
    opts.url,
  ].join("\n");
}
