"use client";
import { useThemeContext } from "@/app/components/ThemeContext";
import { Button } from "./button";
import { Sun, Moon } from "lucide-react";
import React from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : null}
    </Button>
  );
}
