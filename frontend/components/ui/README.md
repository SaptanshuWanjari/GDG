Theme utilities (ThemeContext + ThemeToggle)

This folder contains a small theme utility to make it easy to read and toggle theme anywhere in the app.

Files:

- `theme-toggle.tsx` — a shadcn-style button that toggles the theme using `useThemeContext`.

How it works

1. The top-level `ThemeProvider` (in `app/components/ThemeProvider.tsx`) wraps the app with `next-themes`.
2. `ThemeContextProvider` (in `app/components/ThemeContext.tsx`) builds a small wrapper on top of `next-themes` and exposes a stable `useThemeContext` hook.

Usage

Import and use the hook in any client component:

```tsx
import { useThemeContext } from "@/app/components/ThemeContext";

function Example() {
  const { theme, setTheme, toggleTheme } = useThemeContext();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

Notes

- The provider uses `attribute="class"` so themes are applied using CSS classes (Tailwind `dark:` utilities).
- Prefer `text-foreground`, `bg-background`, and `text-muted-foreground` in components to get theme-aware styling.
