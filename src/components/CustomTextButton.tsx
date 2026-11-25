import React, { useState } from "react";
import {
    Pressable,
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

export interface CustomTextButtonProps {
  onPress: () => void;
  title: string;
}
export default function CustomTextButton({
  onPress,
  title,
}: CustomTextButtonProps) {
  return (
    <Pressable onPress={onPress} >
      <AppText
        style={{
          color: theme.colors.primary,
          fontSize: theme.typography.fontSizes.md,
          fontWeight: theme.typography.fontWeights.semiBold,
        }}
      >
        {title}
      </AppText>
    </Pressable>
  );
}
