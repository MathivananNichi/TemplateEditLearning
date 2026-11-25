import { useColorScheme } from "react-native";
import { create } from "zustand";
import { lightTheme, darkTheme, Theme } from "./index";

export type ThemeMode = "system" | "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "system",
  setMode: (mode) => set({ mode }),
  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === "dark" ? "light" : "dark",
    })),
}));

export interface UseThemeReturn extends Theme {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

/**
 * Access the active theme and react to system theme changes dynamically.
 *
 * If mode is 'system' (default), it immediately updates whenever the user
 * toggles device dark/light mode in OS settings.
 *
 * Usage:
 * ```tsx
 * const { colors, isDark, toggleTheme } = useTheme();
 * ```
 */
export function useTheme(): UseThemeReturn {
  const systemColorScheme = useColorScheme();
  const { mode, setMode, toggleTheme } = useThemeStore();

  const isDark =
    mode === "dark" || (mode === "system" && systemColorScheme === "dark");

  const activeTheme = isDark ? darkTheme : lightTheme;

  return {
    ...activeTheme,
    isDark,
    mode,
    setMode,
    toggleTheme,
  };
}
