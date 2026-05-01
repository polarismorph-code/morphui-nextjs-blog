"use client";

import { useState } from "react";
import { MorphLoader } from "@morphuiapp/morphui";

/**
 * Demo for MorphLoader. Triggers a fake async load with three
 * different durations to surface each of the loader's four stages:
 *
 *   100ms → none   (no spinner flash, instant content)
 *   1.5s  → light + active (light skeleton ramps to active w/ progress bar)
 *   5s    → escalates to slow ("taking longer than usual" + cancel)
 *
 * `loading` is controlled per-trigger; `onCancel` is wired so the
 * slow-stage cancel button actually aborts.
 */
export function MorphLoaderDemo() {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [content, setContent] = useState<string>("Click a button below.");
  const cancelRef = useState<{ cancelled: boolean } | null>(null);

  const trigger = async (ms: number, label: string) => {
    setLoading(true);
    setDuration(ms);
    const session = { cancelled: false };
    cancelRef[1](session);
    await new Promise((r) => setTimeout(r, ms));
    if (session.cancelled) {
      setContent(`Cancelled (${label}).`);
    } else {
      setContent(`Loaded ${label} content at ${new Date().toLocaleTimeString()}.`);
    }
    setLoading(false);
  };

  const cancel = () => {
    if (cancelRef[0]) cancelRef[0].cancelled = true;
    setLoading(false);
    setContent("Cancelled by user.");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => trigger(100, "fast")}
          className="btn-ghost h-9 px-3.5 rounded-lg text-sm font-medium"
        >
          Fast (100ms)
        </button>
        <button
          type="button"
          onClick={() => trigger(1500, "medium")}
          className="btn-ghost h-9 px-3.5 rounded-lg text-sm font-medium"
        >
          Medium (1.5s)
        </button>
        <button
          type="button"
          onClick={() => trigger(5000, "slow")}
          className="btn-ghost h-9 px-3.5 rounded-lg text-sm font-medium"
        >
          Slow (5s)
        </button>
      </div>

      <div className="card p-6 min-h-[160px]">
        <MorphLoader
          loading={loading}
          onCancel={cancel}
          progressEstimate={duration}
        >
          <p className="text-sm text-foreground">{content}</p>
        </MorphLoader>
      </div>
    </div>
  );
}
