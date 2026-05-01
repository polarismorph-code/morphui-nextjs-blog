import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ImproperTapDemo } from "@/components/improper-tap-demo";
import { LostTapDemo } from "@/components/lost-tap-demo";
import { MorphFormDemo } from "@/components/morph-form-demo";
import { MorphLoaderDemo } from "@/components/morph-loader-demo";
import { MorphDialogDemo } from "@/components/morph-dialog-demo";
import { MorphPhoneDemo } from "@/components/morph-phone-demo";
import { PinStatusDemo } from "@/components/pin-status-demo";
import { UtilityHooksDemo } from "@/components/utility-hooks-demo";
import { BehaviorDebug } from "@/components/behavior-debug";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Live test surface for Morph SDK features — adaptive loaders, " +
    "near-miss tap recovery, lost-tap detection, behavioral pin status, " +
    "and storage hooks. Useful for SDK debugging and hands-on exploration.",
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return (
    <div className="container max-w-5xl mx-auto px-6 pt-16 pb-24 flex flex-col">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
        Back to blog
      </Link>

      <header data-morph-pin className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05] mb-4">
          Playground
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Live test surface for the Morph SDK. Each section below isolates one
          feature so you can poke at it. Most demos require either DevTools open
          or mobile-emulation mode — the instructions are inline.
        </p>
      </header>

      <section data-morph-collapsable className="mt-4">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          ImproperTap (mobile near-miss recovery)
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Mobile-only feature. Chrome DevTools → ⌘⇧M (Toggle device toolbar).
          Try to tap near the red <strong>Delete</strong> button without hitting
          it — Morph asks if you meant Delete and, on Yes, fires the Delete
          action you intended.
        </p>
        <ImproperTapDemo />
      </section>

      <section data-morph-collapsable className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          LostTap detection
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Open DevTools Console. The red button is intentionally covered by an
          invisible overlay 50ms after you press it, so your click lands on the
          overlay and the button never fires. Morph detects the lost tap and
          logs a warning.
        </p>
        <LostTapDemo />
      </section>

      <section data-morph-pin className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">MorphForm</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Fill these fields, then navigate to an article and click back (or
          refresh the page). Your values are still there. Hit Submit — Morph
          wipes the snapshot.
        </p>
        <MorphFormDemo />
      </section>

      <section data-morph-collapsable className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">MorphLoader</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Adaptive loader. Below 200ms it shows nothing (no spinner flash). At
          200ms it fades in a light skeleton. At 1s it shows a progress bar. At
          3s it escalates to &quot;taking longer&quot; with a Cancel button.
        </p>
        <MorphLoaderDemo />
      </section>

      <section data-morph-collapsable className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">MorphDialog</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Accessible modal — auto-focus on open, focus trap on Tab, ESC and
          backdrop click both close, focus returns to the trigger button on
          close, and the background is inert.
        </p>
        <MorphDialogDemo />
      </section>

      <section data-morph-pin className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          MorphPhoneInput
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Smart phone field that accepts whatever format the user pastes
          (international, national, with spaces / dashes / parens / dots) and
          outputs canonical E.164.
        </p>
        <MorphPhoneDemo />
      </section>

      <section data-morph-collapsable className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Pin status (V2 behavioral exclusions)
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Live view of every V2-tracked zone with its pinned state.
          Header/footer/nav should be auto-pinned. Toggle the button to
          dynamically pin a section via{" "}
          <code className="px-1 rounded bg-elevated">data-morph-pin</code>.
        </p>
        <PinStatusDemo />
      </section>

      <section data-morph-collapsable className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Behavior debug (ScorerEngine inputs)
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Live ScorerEngine inputs. Click around the demos above to accumulate
          interactions, then refresh — Morph applies the reorder/collapse
          decisions at the next mount.
        </p>
        <BehaviorDebug />
      </section>

      <section data-morph-pin className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          WhiteIsland fix (iframe + white-bg logo)
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Toggle macOS Settings → Appearance to dark. The YouTube iframe and
          the white-bg logo below should both dim automatically — no flashbang
          on either side.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-3 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube test embed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full aspect-video rounded-md border-0"
            />
          </div>
          <div className="card p-6 flex items-center justify-center">
            <svg
              viewBox="0 0 320 120"
              width="320"
              height="120"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Demo logo on white background"
            >
              <rect width="320" height="120" fill="#ffffff" />
              <circle cx="60" cy="60" r="28" fill="#4285F4" />
              <text
                x="110"
                y="74"
                fontFamily="Satoshi, system-ui, sans-serif"
                fontSize="44"
                fontWeight="700"
                fill="#0a0a0a"
              >
                DEMO
              </text>
            </svg>
          </div>
        </div>
      </section>

      <section data-morph-pin className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Utility hooks (storage / tab-sync / autofill)
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Three V2 hooks:{" "}
          <code className="px-1 rounded bg-elevated">useStorage</code>{" "}
          (persistent local state),{" "}
          <code className="px-1 rounded bg-elevated">useTabSync</code>{" "}
          (cross-tab state via BroadcastChannel), and{" "}
          <code className="px-1 rounded bg-elevated">useAutoFillGuard</code>{" "}
          (browser autofill detection).
        </p>
        <UtilityHooksDemo />
      </section>
    </div>
  );
}
