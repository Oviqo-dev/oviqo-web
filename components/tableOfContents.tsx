"use client";

import { useEffect, useState } from "react";
import type { Heading } from "../lib/headings";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // Triggers when a heading is near the top of the viewport
      { rootMargin: "-100px 0px -65% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg w-full bg-[#F7F7FF] p-8"
    >
      <h2 className="font-semibold text-black mb-4">Table of contents</h2>
      <ul className="flex flex-col gap-1 border-l border-gray-300">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={[
                  "block -ml-px border-l-2 py-1 text-sm transition-colors",
                  heading.level === 3 ? "pl-8" : "pl-4",
                  isActive
                    ? "border-black font-semibold text-black"
                    : "border-transparent text-gray-600 hover:text-black",
                ].join(" ")}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}