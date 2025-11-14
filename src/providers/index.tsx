"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "../components/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}
