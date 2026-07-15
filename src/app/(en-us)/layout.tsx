import type { Metadata } from "next";

import { ROOT_METADATA } from "@/lib/root-metadata";

import "../globals.css";

export const metadata: Metadata = ROOT_METADATA;

export default function UnitedStatesEnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
