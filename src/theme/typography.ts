import { TextStyle } from "react-native";

/**
 * Obsidian Violet Typography Tokens (Inter)
 */

export const typography = {
  // Font Family definitions (Inter)
  fonts: {
    light: "ShantellSans-Light",
    regular: "ShantellSans-Regular",
    medium: "ShantellSans-Medium",
    semiBold: "ShantellSans-SemiBold",
    bold: "ShantellSans-Bold",
    extraBold: "ShantellSans-ExtraBold",
  },

  // Font weights mapped by variant
  fontWeights: {
    light: "300" as const,
    regular: "400" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
    extraBold: "800" as const,
  },

  // Font sizes scale
  fontSizes: {
    // Inter M3 Scale
    labelSm: 10,
    bodySm: 11,
    labelMd: 12,
    bodyMd: 13,
    titleSm: 14,
    labelLg: 14,
    bodyLg: 15,
    titleMd: 16,
    headlineSm: 18,
    headlineMd: 20,
    headlineLg: 26,
    displayLg: 34,

    // Backward Compatibility
    xs: 11,
    sm: 13,
    md: 15,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    h2: 26,
    h1: 34,
  },

  // Line heights
  lineHeights: {
    labelSm: 14,
    labelMd: 16,
    bodySm: 16,
    bodyMd: 18,
    titleSm: 20,
    labelLg: 20,
    titleMd: 22,
    bodyLg: 22,
    headlineSm: 24,
    headlineMd: 26,
    headlineLg: 32,
    displayLg: 42,

    // Relative line heights for AppText
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Complete TextStyle presets for Obsidian Violet
  styles: {
    displayLg: {
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "700",
      lineHeight: 42,
      letterSpacing: -0.68, // -0.02em
    } as TextStyle,
    headlineLg: {
      fontFamily: "Inter",
      fontSize: 26,
      fontWeight: "700",
      lineHeight: 32,
      letterSpacing: -0.39, // -0.015em
    } as TextStyle,
    headlineMd: {
      fontFamily: "Inter",
      fontSize: 20,
      fontWeight: "700",
      lineHeight: 26,
      letterSpacing: -0.2, // -0.01em
    } as TextStyle,
    headlineSm: {
      fontFamily: "Inter",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 24,
      letterSpacing: -0.09, // -0.005em
    } as TextStyle,
    titleMd: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 22,
    } as TextStyle,
    titleSm: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
    } as TextStyle,
    bodyLg: {
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: "400",
      lineHeight: 22,
    } as TextStyle,
    bodyMd: {
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "400",
      lineHeight: 18,
    } as TextStyle,
    bodySm: {
      fontFamily: "Inter",
      fontSize: 11,
      fontWeight: "400",
      lineHeight: 16,
    } as TextStyle,
    labelLg: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
      letterSpacing: 0.14, // 0.01em
    } as TextStyle,
    labelMd: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 16,
    } as TextStyle,
    labelSm: {
      fontFamily: "Inter",
      fontSize: 10,
      fontWeight: "600",
      lineHeight: 14,
      letterSpacing: 0.2, // 0.02em
    } as TextStyle,
  },
};

export type Typography = typeof typography;
export type TypographyStyles = typeof typography.styles;
