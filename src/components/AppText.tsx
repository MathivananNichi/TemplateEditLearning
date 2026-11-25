import React from "react";
import {
  StyleSheet,
  Text as RNText,
  TextProps,
  TextInputProps,
} from "react-native";
import { theme } from "../theme";
import { typography } from "../theme/typography";
import { FontWeight } from "@shopify/react-native-skia";

export interface AppTextProps extends TextProps {
  variant?: keyof typeof typography.fonts;
  fontWeight?: FontWeight.Medium;
  size?: keyof typeof theme.typography.fontSizes;
  color?: string;
}

/**
 * Common AppText component that automatically applies
 * your theme's font family, default text color, and typography scale.
 */
export function AppText({
  style,
  variant = "regular",
  size = "base",
  color = theme.colors.textPrimary,
  children,
  fontWeight,
  ...restProps
}: AppTextProps) {
  return (
    <RNText
      style={[
        styles.base,
        {
          fontFamily: theme.typography.fonts[variant],
          fontWeight: fontWeight,
          fontSize: theme.typography.fontSizes[size],
          color,
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default AppText;
