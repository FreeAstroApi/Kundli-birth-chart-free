import type { Metadata } from "next";

import { ROOT_METADATA } from "@/lib/root-metadata";

import "../globals.css";

export const metadata: Metadata = ROOT_METADATA;

export default function IndiaEnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
