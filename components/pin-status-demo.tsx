"use client";

import { useEffect, useState } from "react";
import { useMorph } from "@morphuiapp/morphui";

interface ZoneRow {
  id: string;
  tag: string;
  pinned: boolean;
  reason: string;
}

/**
 * Lists every V2-tracked zone with its pinned state and the reason
 * Morph decided to pin it (semantic landmark / data-morph-pin / class
 * pattern / nothing).
 *
 * Reads from `useMorph()._v2Refs.domTree` — internal but stable for
 * dev tooling. Refreshes every 1s so adding/removing data-morph-pin
 * dynamically is reflected.
 */
export function PinStatusDemo() {
  const morph = useMorph() as { _v2Refs?: { domTree?: Record<string, { id: string; el: HTMLElement; fixed?: boolean }> } } | null;
  const [rows, setRows] = useState<ZoneRow[]>([]);

  useEffect(() => {
    const tick = () => {
      const tree = morph?._v2Refs?.domTree;
      if (!tree) return setRows([]);
      const next: ZoneRow[] = Object.values(tree).map((node) => {
        const el = node.el;
        const tag = el?.tagName?.toLowerCase() ?? "?";
        const pinned = !!node.fixed;
        return {
          id: node.id,
          tag,
          pinned,
          reason: pinned ? whyPinned(el) : "—",
        };
      });
      // Stable sort: pinned first, then alphabetical id.
      next.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.id.localeCompare(b.id);
      });
      setRows(next);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [morph]);

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <p className="text-xs text-tertiary-foreground mb-4">
          Live view of V2-tracked zones in this page. Pinned zones are
          excluded from reorder / collapse / fade. Add{" "}
          <code className="px-1 rounded bg-elevated">data-morph-pin</code>{" "}
          to the demo button below — it should flip to PINNED within a
          second.
        </p>

        <PinPlaygroundButton />

        {rows.length === 0 ? (
          <p className="text-xs text-tertiary-foreground italic mt-4">
            V2 not initialized yet…
          </p>
        ) : (
          <div className="mt-4 max-h-[420px] overflow-auto text-xs font-mono">
            <table className="w-full">
              <thead className="sticky top-0 bg-surface">
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold text-tertiary-foreground uppercase tracking-wider">
                    State
                  </th>
                  <th className="py-2 pr-4 font-semibold text-tertiary-foreground uppercase tracking-wider">
                    Tag
                  </th>
                  <th className="py-2 pr-4 font-semibold text-tertiary-foreground uppercase tracking-wider">
                    Zone id
                  </th>
                  <th className="py-2 font-semibold text-tertiary-foreground uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/40">
                    <td className="py-1.5 pr-4">
                      {r.pinned ? (
                        <span className="text-amber-500">📌 PINNED</span>
                      ) : (
                        <span className="text-emerald-500">tracked</span>
                      )}
                    </td>
                    <td className="py-1.5 pr-4 text-foreground">
                      &lt;{r.tag}&gt;
                    </td>
                    <td className="py-1.5 pr-4 text-muted-foreground truncate max-w-[180px]">
                      {r.id}
                    </td>
                    <td className="py-1.5 text-muted-foreground">{r.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function whyPinned(el: HTMLElement): string {
  if (!el) return "?";
  const tag = el.tagName.toLowerCase();
  if (el.dataset.morphPin !== undefined) return "data-morph-pin attribute";
  if (el.closest("[data-morph-pin]")) return "ancestor has data-morph-pin";
  if (["nav", "header", "footer", "aside"].includes(tag)) return `<${tag}> tag`;
  const role = el.getAttribute("role");
  if (["banner", "navigation", "contentinfo", "complementary"].includes(role || "")) {
    return `role="${role}"`;
  }
  const idCls = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`.toLowerCase();
  if (/(^|[\s-])(hero|sticky|pinned)([\s-]|$)/.test(idCls)) {
    return "class/id contains hero|sticky|pinned";
  }
  return "MorphZone fixed prop";
}

function PinPlaygroundButton() {
  const [pinned, setPinned] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setPinned((p) => !p)}
        className="btn-primary inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-semibold"
      >
        Toggle pin on demo section
      </button>
      <section
        data-morph-pin={pinned ? "" : undefined}
        className="card px-3 py-2 text-xs"
        style={{ minWidth: 120 }}
      >
        Demo section{" "}
        {pinned ? (
          <span className="text-amber-500 font-mono">[pinned]</span>
        ) : (
          <span className="text-tertiary-foreground font-mono">[tracked]</span>
        )}
      </section>
    </div>
  );
}
