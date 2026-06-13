import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { THEMES, THEME_STORAGE_KEY } from "@/shared/theme/themes";

const ThemeContext = createContext(null);

function applyTheme(themeKey) {
  const theme = THEMES[themeKey] || THEMES.default;
  Object.entries(theme.colors).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(THEME_STORAGE_KEY) || "default"
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      themes: Object.entries(THEMES).map(([key, config]) => ({
        key,
        name: config.name,
      })),
      setTheme: (nextTheme) => {
        setThemeState(THEMES[nextTheme] ? nextTheme : "default");
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
