import { lightColors, darkColors, ThemeColors } from "./colors";
import {
  spacing,
  rounded,
  borderRadius,
} from "./spacing";
import { shadows, darkShadows } from "./shadows";
import { typography } from "./typography";

export const lightTheme = {
  isDark: false,
  colors: lightColors,
  spacing,
  rounded,
  borderRadius,
  shadows,
  typography,
};

export const darkTheme = {
  isDark: true,
  colors: darkColors,
  spacing,
  rounded,
  borderRadius,
  shadows: darkShadows,
  typography,
};

// Default static theme (Obsidian Violet Light)
export const theme = lightTheme;

export type Theme = typeof lightTheme;

export default theme;
