import { sameTitle, titleFromHref } from "./wiki";

export interface BoardLink {
  title: string;
  text: string;
}

export interface BoardSection {
  heading: string;
  links: BoardLink[];
}

export interface Board {
  lead: string;
  sections: BoardSection[];
  total: number;
}

const SKIP_SECTIONS =
  /^(references|notes|citations|bibliography|sources|further reading|external links|footnotes|works cited|explanatory notes)$/i;

/** Parse sanitized Parsoid article HTML into a playable link board. */
export function buildBoard(html: string, current: string): Board {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const seen = new Set<string>();
  const sections: BoardSection[] = [];
  let total = 0;

  // Lead: first substantial paragraph, for context without the wall of text
  let lead = "";
  for (const p of Array.from(doc.querySelectorAll("p"))) {
    const t = (p.textContent ?? "").replace(/\s+/g, " ").trim();
    if (t.length > 80) {
      lead = t;
      break;
    }
  }

  const collect = (root: Element, heading: string) => {
    const links: BoardLink[] = [];
    for (const a of Array.from(root.querySelectorAll("a[href]"))) {
      if (a.classList.contains("new")) continue; // red link — page doesn't exist
      if (a.querySelector("img")) continue; // figure/image wrappers
      const title = titleFromHref(a.getAttribute("href") ?? "");
      if (!title) continue;
      if (sameTitle(title, current)) continue; // self-links
      const key = title.toLowerCase();
      if (seen.has(key)) continue;
      const text = (a.textContent ?? "").replace(/\s+/g, " ").trim() || title;
      if (/^\[?\d*\]?$/.test(text)) continue; // bare cite numbers
      seen.add(key);
      links.push({ title, text });
    }
    if (links.length > 0) {
      sections.push({ heading, links });
      total += links.length;
    }
  };

  // Parsoid wraps each article section in <section data-mw-section-id>
  const tops = Array.from(doc.body.children).filter((el) => el.tagName === "SECTION");
  if (tops.length === 0) {
    collect(doc.body, "Exits");
  } else {
    for (const sec of tops) {
      const h = sec.querySelector("h1, h2, h3, h4");
      const heading = (h?.textContent ?? "").trim() || "Intro";
      if (SKIP_SECTIONS.test(heading)) continue;
      collect(sec, heading);
    }
  }

  return { lead, sections, total };
}
