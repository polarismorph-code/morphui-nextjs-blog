import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Smart Blog — Built with Morph SDK",
    template: "%s | Morph Blog",
  },
  description:
    "An intelligent blog that adapts to every reader. Built with " +
    "Next.js 16 + Morph SDK to demonstrate AI TL;DR, reading mode " +
    "adaptation, and behavioral intelligence on long-form content.",
  metadataBase: new URL("https://blog.morphui.dev"),
  openGraph: {
    title: "Smart Blog — Built with Morph SDK",
    description: "Production-grade Next.js blog example",
    url: "https://blog.morphui.dev",
    siteName: "Morph Blog",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@cabraule",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2,300,301,400,401,500,501,700,701,900,901&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
