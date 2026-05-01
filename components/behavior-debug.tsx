"use client";

import { useEffect, useState } from "react";
import { useMorph } from "@morphuiapp/morphui";

interface ZoneScore {
  id: string;
  score: number;
  clicks: number;
  visits: number;
  fixed: boolean;
}

/**
 * Live behavioral debug panel. Reads from `useMorph()._v2Refs` (same
 * internal handle PinStatusDemo uses) and the V2 storage adapter to
 * surface:
 *   • total interactions captured this session
 *   • per-zone score breakdown sorted descending
 *   • whether the 20+ threshold has been reached
 *
 * Refresh the page after enough clicks to see the analyzer's
 * verdict applied (reorder/collapse) — this panel only reports the
 * inputs, not the output.
 */
export function BehaviorDebug() {
  const morph = useMorph() as {
    _v2Refs?: {
      db?: {
        getAllZoneStats?: () => Promise<
          Map<string, { totalClicks: number; visitCount: number }>
        >;
      };
      domTree?: Record<string, { id: string; fixed?: boolean }>;
    };
  } | null;

  const [scores, setScores] = useState<ZoneScore[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const refs = morph?._v2Refs;
      const db = refs?.db;
      const tree = refs?.domTree;
      if (!db?.getAllZoneStats || !tree) return;
      try {
        const stats = await db.getAllZoneStats();
        if (cancelled) return;
        let total = 0;
        const rows: ZoneScore[] = [];
        const treeRecord = tree as Record<string, { id: string; fixed?: boolean }>;
        stats.forEach((s, id) => {
          if (id.includes("__")) return; // device-suffixed entry
          total += s.totalClicks;
          const node = treeRecord[id];
          rows.push({
            id,
            score: s.totalClicks,
            clicks: s.totalClicks,
            visits: s.visitCount,
            fixed: !!node?.fixed,
          });
        });
        rows.sort((a, b) => b.clicks - a.clicks || a.id.localeCompare(b.id));
        setScores(rows);
        setTotalClicks(total);
      } catch {
        /* silent */
      }
    };
    tick();
    const id = setInterval(tick, 1500);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [morph]);

  const reachedThreshold = totalClicks >= 20;

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-bold tracking-tight">Behavior debug</h3>
        <span
          className={`text-[11px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full border ${
            reachedThreshold
              ? "border-emerald-500/40 text-emerald-500 bg-emerald-500/10"
              : "border-border text-tertiary-foreground"
          }`}
        >
          {totalClicks} / 20 clicks
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        ScorerEngine runs once at mount and only acts when total clicks
        ≥ 20. Click around (article cards, demo buttons, dialog opens),
        then refresh to see the reorder/collapse decision applied.
      </p>

      {scores.length === 0 ? (
        <p className="text-xs italic text-tertiary-foreground">
          No stats yet — click on a few interactive elements to start
          the count.
        </p>
      ) : (
        <div className="text-xs font-mono max-h-[280px] overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-border text-left">
                <th className="py-1.5 pr-3 text-tertiary-foreground uppercase tracking-wider">
                  Pin
                </th>
                <th className="py-1.5 pr-3 text-tertiary-foreground uppercase tracking-wider">
                  Zone
                </th>
                <th className="py-1.5 pr-3 text-tertiary-foreground uppercase tracking-wider tabular-nums">
                  Clicks
                </th>
                <th className="py-1.5 text-tertiary-foreground uppercase tracking-wider tabular-nums">
                  Visits
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.slice(0, 30).map((row) => (
                <tr key={row.id} className="border-b border-border/40">
                  <td className="py-1 pr-3">
                    {row.fixed ? "📌" : "—"}
                  </td>
                  <td className="py-1 pr-3 text-muted-foreground truncate max-w-[260px]">
                    {row.id}
                  </td>
                  <td className="py-1 pr-3 text-foreground tabular-nums">
                    {row.clicks}
                  </td>
                  <td className="py-1 text-muted-foreground tabular-nums">
                    {row.visits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
