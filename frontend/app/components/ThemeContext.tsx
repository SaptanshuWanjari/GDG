"use client";
import * as React from "react";
import { useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark" | string;

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // use next-themes internally and provide a stable context value
  const { theme, setTheme } = useNextTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value: ThemeContextValue = React.useMemo(
    () => ({ theme: theme ?? "light", setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return ctx;
}
