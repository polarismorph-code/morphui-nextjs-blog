"use client";

import { useState } from "react";
import { MorphForm } from "@morphuiapp/morphui";

/**
 * Demo for MorphForm — a regular contact form whose fields are
 * snapshotted to IndexedDB on every blur and restored when the user
 * comes back to the page (refresh, back-button, full reload, etc.).
 *
 * Test flow:
 *   1. Type something in each field, blur out (Tab or click away)
 *   2. Navigate to an article and back, OR refresh the page
 *   3. The fields are restored to what you typed
 *   4. Submit — snapshot is wiped automatically
 */
export function MorphFormDemo() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );

  return (
    <div className="card p-6 space-y-4">
      <MorphForm
        id="contact-demo"
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          const values: Record<string, string> = {};
          fd.forEach((v, k) => (values[k] = String(v)));
          setSubmitted(values);
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
              Name
            </span>
            <input
              name="name"
              type="text"
              placeholder="Jane Doe"
              className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
              Email
            </span>
            <input
              name="email"
              type="email"
              placeholder="jane@example.com"
              className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
            Message
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="Type a long message — then go to an article and come back. It's still here."
            className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary resize-y"
          />
        </label>
        <div className="flex items-center justify-end gap-2">
          <button
            type="reset"
            className="btn-ghost h-9 px-3.5 rounded-lg text-sm font-medium"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary h-9 px-4 rounded-lg text-sm font-semibold"
          >
            Submit
          </button>
        </div>
      </MorphForm>

      {submitted && (
        <div className="text-xs font-mono text-muted-foreground border-t border-border pt-3">
          <p className="text-tertiary-foreground mb-2 uppercase tracking-wider">
            Last submission (snapshot wiped)
          </p>
          {Object.entries(submitted).map(([k, v]) => (
            <div key={k}>
              <span className="text-tertiary-foreground">{k}:</span>{" "}
              {v || <em className="text-tertiary-foreground">(empty)</em>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
