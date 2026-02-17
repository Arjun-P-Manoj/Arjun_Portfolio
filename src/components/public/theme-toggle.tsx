"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      aria-label="Toggle Theme"
      className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {!mounted ? <Moon className="h-4 w-4" /> : theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
