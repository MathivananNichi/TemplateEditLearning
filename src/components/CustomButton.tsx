import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import theme from "../theme";
import AppText from "./AppText";

export interface CustomButtonProps {
  onPress: () => void;
  title: string;
}
export default function CustomButton({ onPress, title }: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.pill,
        minHeight: 52,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...theme.shadows.button,
      }}
    >
      <AppText
        style={{
          color: theme.colors.textOnPrimary,
          fontSize: theme.typography.fontSizes.base,
          fontWeight: theme.typography.fontWeights.semiBold,
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}
