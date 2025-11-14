"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "../components/ui";
import { ReactQueryProvider } from "./ReactQueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}
