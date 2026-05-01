"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Demo card for LostTapDetector. The flow that triggers a lost-tap
 * warning:
 *   1. User taps the button — pointerdown fires on it, LostTap marks
 *      it as "waiting for click within 300ms"
 *   2. We deliberately mount a transparent overlay 50ms later, on top
 *      of the button (z-index 10)
 *   3. User releases their finger — pointerup + click land on the
 *      overlay, NOT the button
 *   4. 300ms after the original pointerdown, LostTap notices that
 *      no click ever fired on the button → console.warn
 *
 * Open the DevTools Console to see the warning. The log below also
 * shows what happened on each tap so you can compare a "real" click
 * to a "lost" one.
 */
export function LostTapDemo() {
  const [log, setLog] = useState<string[]>([]);
  const [blocking, setBlocking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const push = (msg: string) =>
    setLog((l) =>
      [`${new Date().toLocaleTimeString()} — ${msg}`, ...l].slice(0, 5),
    );

  // Re-arm the blocker after each tap so the user can repeat.
  useEffect(() => {
    if (!blocking) return;
    const t = setTimeout(() => setBlocking(false), 1500);
    return () => clearTimeout(t);
  }, [blocking]);

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="card p-6 flex items-center justify-center gap-4">
        {/* Normal button — control case. Click always fires. */}
        <button
          type="button"
          onClick={() => push("✅ Normal click fired")}
          className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold"
        >
          Normal button
        </button>

        {/* Trap button — schedules an overlay 50ms after pointerdown
            so the click lands on the overlay instead of here. */}
        <div className="relative inline-block">
          <button
            type="button"
            onPointerDown={() => {
              setTimeout(() => setBlocking(true), 50);
            }}
            onClick={() => push("⚠️ Trap click fired (shouldn't happen)")}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-semibold"
          >
            Trapped button
          </button>
          {blocking && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                push("🚧 Click swallowed by overlay");
              }}
            />
          )}
        </div>
      </div>

      <p className="text-xs text-tertiary-foreground text-center">
        Open DevTools Console. Tap the red <strong>Trapped button</strong>{" "}
        — Morph will <code className="px-1 rounded bg-elevated">console.warn</code>{" "}
        a lost-tap message ~300ms after the tap. The green button is a
        control: tapping it fires normally.
      </p>

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
