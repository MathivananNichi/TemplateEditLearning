import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from "react-native";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import theme from "../theme";
import AppText from "./AppText";
import { EyeIcons } from "./svg/EyeIcon";
import { typography } from "../theme/typography";

export interface CustomTextInputProps<
  T extends FieldValues,
> extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  control: Control<T>;
  name: Path<T>;
  title: string;
}

export function CustomTextInput<T extends FieldValues>({
  style,
  containerStyle,
  leftIcon,
  rightIcon,
  isPassword,
  placeholderTextColor = theme.colors.inputPlaceholder,
  secureTextEntry,
  name,
  control,
  title,
  ...restProps
}: CustomTextInputProps<T>) {
  const [hidePassword, setHidePassword] = useState(
    isPassword ? true : (secureTextEntry ?? false),
  );

  return (
    <View style={{ gap: 6 }}>
      <AppText style={{}}>{title}</AppText>

      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={{ paddingBottom: 10 }}>
            <View style={[textInputStyle.container, containerStyle]}>
              {leftIcon ? (
                <View style={textInputStyle.leftIconWrapper}>{leftIcon}</View>
              ) : null}

              <TextInput
                {...restProps}
                style={[textInputStyle.input, style]}
                // placeholderTextColor={placeholderTextColor}
                secureTextEntry={isPassword ? hidePassword : secureTextEntry}
                value={value == null ? "" : String(value)}
                onChangeText={onChange}
                onBlur={onBlur}
              />

              {isPassword ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setHidePassword((prev) => !prev)}
                  style={textInputStyle.rightIconWrapper}
                  hitSlop={{
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                  }}
                >
                  {rightIcon ??
                    (hidePassword ? (
                      <EyeIcons color={theme.colors.inputPlaceholder} />
                    ) : (
                      <EyeIcons color={theme.colors.inputPlaceholder} />
                    ))}
                </TouchableOpacity>
              ) : rightIcon ? (
                <View style={textInputStyle.rightIconWrapper}>{rightIcon}</View>
              ) : null}
            </View>

            {error && (
              <AppText style={textInputStyle.errorText}>
                {error.message}
              </AppText>
            )}
          </View>
        )}
      />
    </View>
  );
}

// Password hidden icon
export function EyeOffIcon({
  color = "#767E8C",
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size * 0.7,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: size * 0.9,
          height: size * 0.54,
          borderWidth: 1.6,
          borderColor: color,
          borderRadius: size * 0.35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: size * 0.24,
            height: size * 0.24,
            borderRadius: (size * 0.24) / 2,
            backgroundColor: color,
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          width: size * 1.05,
          height: 1.6,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: "-40deg" }],
        }}
      />
    </View>
  );
}

const textInputStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.pill,
    paddingHorizontal: theme.spacing.lg + 2,
    ...theme.shadows.soft,
  },

  input: {
    flex: 1,
    fontFamily: typography.fonts.regular,
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textPrimary,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },

  leftIconWrapper: {
    marginRight: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  rightIconWrapper: {
    marginLeft: 8,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  // errorContainer: {
  //   borderWidth: 1,
  //   borderColor: "red",
  // },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
