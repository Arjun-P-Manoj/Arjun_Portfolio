"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
