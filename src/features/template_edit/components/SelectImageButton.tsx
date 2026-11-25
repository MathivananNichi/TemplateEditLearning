import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import theme from "../../../theme";
import { ReactNode } from "react";

export interface SelectImageButtonProps {
  title?: string;
  prefix?: ReactNode;
  child?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function SelectImageButton({
  title = "Select Image",
  prefix,
  child,
  containerStyle,
  onPress,
}: SelectImageButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      {prefix ? prefix : null}
      {child ?? <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.button,
  },
  text: {
    color: theme.colors.textOnPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
});

