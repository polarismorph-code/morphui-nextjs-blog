"use client";

import { useMorph } from "@morphuiapp/morphui";
import { Moon, Sun, Eye, Zap, Languages } from "lucide-react";

export function ThemeIndicator({ className }: { className?: string }) {
  const morph = useMorph();
  if (!morph) return null;

  const Icon = morph.theme === "dark" ? Moon : Sun;

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-2 ${className ?? ""}`}
    >
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-muted-foreground">
        <Icon className="w-3 h-3 text-primary" strokeWidth={2.5} />
        Morph: {morph.theme}
      </span>
      {morph.adaptation !== "none" && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-muted-foreground">
          <Eye className="w-3 h-3 text-primary" strokeWidth={2.5} />
          {morph.adaptation}
        </span>
      )}
      {morph.wcag && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-muted-foreground">
          <Zap className="w-3 h-3 text-primary" strokeWidth={2.5} />
          WCAG {morph.wcag.level}
          {morph.wcag.violations?.length > 0 && (
            <span className="text-amber-500">
              · {morph.wcag.violations.length} fixed
            </span>
          )}
          {morph.wcag.passing && morph.wcag.violations?.length === 0 && (
            <span className="text-emerald-500">✓</span>
          )}
        </span>
      )}
      {morph.language && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-muted-foreground">
          <Languages className="w-3 h-3 text-primary" strokeWidth={2.5} />
          {morph.language}
        </span>
      )}
    </div>
  );
}
