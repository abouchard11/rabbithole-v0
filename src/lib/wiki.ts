

export interface WikiPage {
  canonical: string;
  html: string;
}

const BLOCKED_NS =
  /^(file|image|category|help|portal|special|wikipedia|template|talk|user|draft|module|timedtext|book|mediawiki|wikt|w|s|q|commons)( talk)?:/i;

export function titleFromHref(href: string): string | null {
  if (!href.startsWith("./")) return null;
  const raw = href.slice(2).split("#")[0];
  if (!raw) return null;
  let title: string;
  try {
    title = decodeURIComponent(raw).replace(/_/g, " ").trim();
  } catch {
    return null;
  }
  if (!title || BLOCKED_NS.test(title)) return null;
  return title;
}

export function sameTitle(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export async function fetchArticle(title: string): Promise<WikiPage> {
  const url = `/api/wiki?title=${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { Accept: "text/html" } });
  if (!res.ok) throw new Error(`Wikipedia returned ${res.status} for "${title}"`);
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "text/html");

  // Canonical title (redirects resolved) via Parsoid metadata
  let canonical = title;
  const isVersionOf = doc.querySelector('link[rel="dc:isVersionOf"]')?.getAttribute("href");
  if (isVersionOf) {
    const seg = isVersionOf.split("/wiki/")[1];
    if (seg) {
      try {
        canonical = decodeURIComponent(seg).replace(/_/g, " ");
      } catch {
        /* keep requested title */
      }
    }
  } else if (doc.title) {
    canonical = doc.title;
  }

  const body = doc.body;
  // Strip anything executable or document-level
  body.querySelectorAll("script, link, meta, base, iframe, object, embed").forEach((el) => el.remove());
  // Kill inline handlers, belt & suspenders
  body.querySelectorAll("*").forEach((el) => {
    for (const attr of [...el.attributes]) {
      if (attr.name.startsWith("on")) el.removeAttribute(attr.name);
    }
  });
  // Neutralize media autoplay
  body.querySelectorAll("video, audio").forEach((el) => {
    el.removeAttribute("autoplay");
    el.setAttribute("controls", "");
  });

  return { canonical, html: body.innerHTML };
}

export function wikipediaUrl(title: string): string {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
}
