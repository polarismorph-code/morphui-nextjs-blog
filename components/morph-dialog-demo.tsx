"use client";

import { useState } from "react";
import { MorphDialog } from "@morphuiapp/morphui";

/**
 * Demo for MorphDialog. Tests:
 *   • Open via "Open" — first input gets autofocus
 *   • Tab cycles only inside the dialog (focus trap)
 *   • Escape, backdrop click, or Cancel button → onClose
 *   • Background page is inert (try clicking the article cards
 *     above — nothing happens until you close the dialog)
 *   • Focus returns to the "Open" button after close
 */
export function MorphDialogDemo() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <div className="card p-6 space-y-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-primary inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold"
      >
        Open dialog
      </button>

      {submitted && (
        <p className="text-xs font-mono text-muted-foreground">
          Submitted: <span className="text-foreground">{submitted}</span>
        </p>
      )}

      <MorphDialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="demo-dialog-title"
        describedBy="demo-dialog-desc"
        className="card p-6 max-w-md w-[calc(100vw-32px)] mx-auto my-[10vh]"
        backdropStyle={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          position: "fixed",
          inset: 0,
          display: "grid",
          placeItems: "start center",
          zIndex: 9999,
        }}
      >
        <h2
          id="demo-dialog-title"
          className="text-xl font-bold tracking-tight mb-2"
        >
          Quick reply
        </h2>
        <p
          id="demo-dialog-desc"
          className="text-sm text-muted-foreground mb-5"
        >
          ESC to close, backdrop click to close, Tab cycles inside.
          Background is inert — try clicking outside.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget as HTMLFormElement);
            setSubmitted(String(fd.get("text") || ""));
            setOpen(false);
          }}
          className="space-y-4"
        >
          <input
            name="text"
            type="text"
            placeholder="Type and press Enter…"
            className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-ghost h-9 px-3.5 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary h-9 px-4 rounded-lg text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </MorphDialog>
    </div>
  );
}
