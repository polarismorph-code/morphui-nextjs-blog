"use client";

import { useState } from "react";

/**
 * Demo card for ImproperTapDetector. Two buttons placed close
 * together, the right one marked `data-morph-critical`.
 *
 * IMPORTANT FOR TESTING: the SDK fires the banner when the user taps
 * on Save's RIGHT EDGE (the side closest to Delete) — interpreted as
 * "user was sliding their thumb toward Delete but missed". Tapping
 * Delete directly is treated as intentional and skips the banner.
 *
 * Last action is shown live below so it's clear what fired even
 * when the alert is dismissed quickly.
 */
export function ImproperTapDemo() {
  const [log, setLog] = useState<string[]>([]);
  const push = (msg: string) =>
    setLog((l) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...l].slice(0, 5));

  return (
    <div className="space-y-4">
      <div className="card p-6">
        {/* Big, distinct buttons stuck together so the edge zones
            overlap meaningfully under a thumb. */}
        <div className="flex items-center justify-center gap-0">
          <button
            type="button"
            onClick={() => push("✅ Save fired")}
            className="px-8 py-4 rounded-l-md bg-emerald-500 text-white text-base font-semibold border-r border-emerald-700/30"
          >
            Save
          </button>
          <button
            type="button"
            data-morph-critical
            onClick={() => push("🔥 Delete fired")}
            className="px-8 py-4 rounded-r-md bg-red-500 text-white text-base font-semibold"
          >
            Delete
          </button>
        </div>
        <p className="mt-4 text-xs text-tertiary-foreground text-center max-w-md mx-auto">
          To trigger the near-miss banner: enable mobile emulation
          (⌘⇧M) and tap on <strong>Save</strong>&apos;s{" "}
          <strong>right edge</strong> (the side touching Delete).
          Tapping Delete directly fires it normally.
        </p>
      </div>

      {log.length > 0 && (
        <div className="card p-4 text-xs font-mono">
          <p className="text-tertiary-foreground mb-2 uppercase tracking-wider">
            Tap log
          </p>
          {log.map((line, i) => (
            <div key={i} className="text-foreground">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
