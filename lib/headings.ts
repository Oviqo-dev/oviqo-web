export type Heading = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

type Block = {
  _key: string;
  _type: string;
  style?: string;
  children?: { text?: string }[];
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractHeadings(body: unknown): {
  headings: Heading[];
  idByKey: Record<string, string>;
} {
  const headings: Heading[] = [];
  const idByKey: Record<string, string> = {};
  const used = new Map<string, number>();

  if (!Array.isArray(body)) return { headings, idByKey };

  for (const block of body as Block[]) {
    if (block._type !== "block") continue;
    if (!block.style || !["h1", "h2", "h3"].includes(block.style)) continue;

    const text = (block.children ?? []).map((c) => c.text ?? "").join("").trim();
    if (!text) continue;

    // De-duplicate repeated heading text: "intro", "intro-2", ...
    const base = slugify(text) || "section";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    idByKey[block._key] = id;
    headings.push({
      id,
      text,
      level: Number(block.style.replace("h", "")) as 1 | 2 | 3,
    });
  }

  return { headings, idByKey };
}