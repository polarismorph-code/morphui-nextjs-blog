"use client";

import {
  useStorage,
  useTabSync,
  useAutoFillGuard,
  useMorph,
} from "@morphuiapp/morphui";

/**
 * Combined demo for the three V2 utility hooks.
 *
 *   • useStorage(key, default)         → [value, setValue]
 *   • useTabSync(key, initial)         → [value, setValue]
 *   • useAutoFillGuard()               → { ref, isAutofilled, dismiss }
 *
 * useAutoFillGuard exposes a boolean flag that flips to true the moment
 * the browser silently autofills the input (Chrome's password manager
 * doesn't dispatch a real `change` event — the hook listens to the
 * `:-webkit-autofill` animation trick to detect it).
 */
export function UtilityHooksDemo() {
  const [draft, setDraft] = useStorage("morph-demo-draft", "");
  const [counter, setCounter] = useTabSync("morph-demo-counter", 0);
  const autofill = useAutoFillGuard();
  // Storage layer is decided once at MorphProvider boot and exposed
  // here for visibility — useStorage / useTabSync both ride on this.
  // Values: 'indexeddb' | 'localstorage' | 'memory'.
  const morph = useMorph();
  const storageType = (morph as { storageType?: string } | null)?.storageType ?? "…";

  return (
    <div className="space-y-6">
      {/* useStorage */}
      <div className="card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-tight">useStorage</h3>
          <span className="text-[11px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full border border-border text-tertiary-foreground">
            layer: {storageType}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Type something, then refresh — your text is still here.
          Persisted to IndexedDB on every keystroke (with localStorage
          and memory fallbacks).
        </p>
        <textarea
          value={draft as string}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Type and refresh — Morph keeps your draft."
          className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary resize-y"
        />
        <button
          type="button"
          onClick={() => setDraft("")}
          className="btn-ghost h-8 px-3 rounded-md text-xs font-medium"
        >
          Clear
        </button>
      </div>

      {/* useTabSync */}
      <div className="card p-6 space-y-3">
        <h3 className="text-sm font-bold tracking-tight">useTabSync</h3>
        <p className="text-xs text-muted-foreground">
          Open this page in a second tab. Click <strong>+1</strong> in
          either tab — the count updates everywhere within ~50ms via
          BroadcastChannel.
        </p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl font-bold tabular-nums">
            {counter as number}
          </span>
          <button
            type="button"
            onClick={() => setCounter((counter as number) + 1)}
            className="btn-primary h-9 px-4 rounded-lg text-sm font-semibold"
          >
            +1
          </button>
          <button
            type="button"
            onClick={() => setCounter(0)}
            className="btn-ghost h-9 px-3 rounded-md text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* useAutoFillGuard */}
      <div className="card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-tight">
            useAutoFillGuard
          </h3>
          <span
            className={`text-[11px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full border ${
              autofill.isAutofilled
                ? "border-amber-500/40 text-amber-500 bg-amber-500/10"
                : "border-border text-tertiary-foreground"
            }`}
          >
            isAutofilled: {String(autofill.isAutofilled)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Save a credential for this site in Chrome (Settings → Autofill
          → Passwords), reload, and let it autofill the email below. The
          flag flips to <code className="px-1 rounded bg-elevated">true</code>{" "}
          immediately — no fake change event needed.
        </p>
        <input
          ref={autofill.ref as React.Ref<HTMLInputElement>}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="email — let your browser autofill this"
          className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary"
        />
        {autofill.isAutofilled && (
          <button
            type="button"
            onClick={autofill.dismiss}
            className="btn-ghost h-8 px-3 rounded-md text-xs font-medium"
          >
            Dismiss flag
          </button>
        )}
      </div>
    </div>
  );
}
