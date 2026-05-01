"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function ArticleTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "article h2, article h3",
    );
    const items: Heading[] = Array.from(elements)
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent?.replace(/#$/, "").trim() ?? "",
        level: parseInt(el.tagName[1] ?? "2"),
      }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm">
      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-tertiary-foreground mb-4">
        On this page
      </p>
      <ul className="border-l border-border space-y-0.5">
        {headings.map((heading) => {
          const active = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                style={{ paddingLeft: `${(heading.level - 2) * 12 + 14}px` }}
                className={`block py-1.5 pr-2 -ml-px border-l border-transparent transition-all ${
                  active
                    ? "text-foreground border-l-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
