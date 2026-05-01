"use client";

import { useState } from "react";
import { MorphPhoneInput } from "@morphuiapp/morphui";

/**
 * Demo for MorphPhoneInput. Tests the smart-paste / smart-type
 * behaviour of the input across a few common countries:
 *   • Type or paste with spaces / dashes / parens / dots
 *   • Paste an international form ("+33 6 12 34 56 78") — country
 *     auto-detected
 *   • Paste a national form — falls back to defaultCountry
 *   • E.164 + valid flag exposed live below the input
 */
export function MorphPhoneDemo() {
  const [country, setCountry] = useState<"US" | "FR" | "GB" | "CM">("FR");
  const [phone, setPhone] = useState<{ e164: string; valid: boolean }>({
    e164: "",
    valid: false,
  });

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Default country
        </span>
        {(["US", "FR", "GB", "CM"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCountry(c)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              country === c
                ? "bg-primary text-primary-foreground border-transparent"
                : "btn-ghost"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <MorphPhoneInput
        defaultCountry={country}
        value={phone.e164}
        onChange={(e164, valid) => setPhone({ e164, valid })}
        placeholder="Type or paste a phone number"
        className="w-full px-3 py-2 rounded-md bg-elevated border border-border text-sm focus:outline-none focus:border-primary"
      />

      <div className="text-xs font-mono text-muted-foreground border-t border-border pt-3 space-y-1">
        <div>
          <span className="text-tertiary-foreground">E.164:</span>{" "}
          <span className="text-foreground">
            {phone.e164 || (
              <em className="text-tertiary-foreground">(empty)</em>
            )}
          </span>
        </div>
        <div>
          <span className="text-tertiary-foreground">valid:</span>{" "}
          <span className={phone.valid ? "text-emerald-500" : "text-red-500"}>
            {String(phone.valid)}
          </span>
        </div>
      </div>

      <div className="text-xs text-tertiary-foreground space-y-1">
        <p className="font-semibold uppercase tracking-wider mb-1.5">
          Try pasting:
        </p>
        <code className="block">+33 6 12 34 56 78</code>
        <code className="block">(415) 555-0143</code>
        <code className="block">06.12.34.56.78</code>
        <code className="block">00 44 20 7946 0958</code>
      </div>
    </div>
  );
}
