"use client";

import { useEffect, useState } from "react";
import { MorphProvider } from "@morphuiapp/morphui";

type ColorBlindMode = "deuteranopia" | "protanopia" | "tritanopia" | undefined;

function readColorBlindFromUrl(): ColorBlindMode {
  if (typeof window === "undefined") return undefined;
  const v = new URLSearchParams(window.location.search).get("cb");
  if (v === "deuteranopia" || v === "protanopia" || v === "tritanopia") {
    return v;
  }
  return undefined;
}

export function Providers({ children }: { children: React.ReactNode }) {
  // ?cb=deuteranopia | protanopia | tritanopia → forwarded to MorphProvider
  // so we can dev-test color-blind palettes without code changes.
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>(undefined);
  useEffect(() => {
    setColorBlindMode(readColorBlindFromUrl());
  }, []);

  return (
    <MorphProvider
      licenseKey={process.env.NEXT_PUBLIC_MORPH_KEY ?? "cha-free-demo"}
      colorBlindMode={colorBlindMode}
      collapse
    >
      {children}
    </MorphProvider>
  );
}
