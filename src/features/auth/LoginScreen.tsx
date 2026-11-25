import { localization } from "../../localization/localization";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import z from "zod";
import { Controller, FieldError, useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomTextInput } from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import AppText from "../../components/AppText";
import { FontWeight } from "@shopify/react-native-skia";
import CustomTextButton from "../../components/CustomTextButton";
import CheckBox from "../../components/CheckBox";
import { RootParamList, SignUpNavProps } from "../../core/router/types";
import { useTheme } from "../../theme/useTheme";

const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email should not be empty")
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .nonempty("Password should not be empty")
    .min(4, "Min 4 is required")
    .max(10, "10 is the max character"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginScreen({ navigation }: SignUpNavProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { control, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    // Call login API
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 36,
        paddingHorizontal: 24,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Title & Subtitle */}
      <View style={{ marginBottom: 32, alignItems: "center" }}>
        <AppText
          style={{
            fontSize: theme.typography.fontSizes.h2,
            fontWeight: FontWeight.Black,
            color: theme.colors.textPrimary,
            marginBottom: 8,
          }}
        >
          Log in
        </AppText>
        <AppText
          style={{
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.textSecondary,
            textAlign: "center",
            lineHeight: 20,
            paddingHorizontal: 16,
          }}
        >
          {localization.sign_in_subtitle}
        </AppText>
      </View>

      {/* Input Fields */}
      <View style={{ gap: 12 }}>
        <CustomTextInput
          title={localization.email_or_phone_label}
          control={control}
          placeholder={localization.email_placeholder}
          name="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              title={localization.password_label}
              placeholder={localization.password_label}
              name="password"
              value={value}
              control={control}
              onChangeText={onChange}
              isPassword
            />
          )}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <CheckBox
            onChange={(val) => {
              console.log("dddddddd", val);
            }}
          />
          <AppText>{localization.remember_me}</AppText>
        </View>
        <CustomTextButton
          title={localization.forgot_password}
          onPress={() => {}}
        />
      </View>
      {/* Primary Light Blue Action Button */}
      <CustomButton
        title={localization.sign_in_button}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 20,
          gap: 8,
        }}
      >
        <AppText>{localization.no_account_prompt}</AppText>
        <CustomTextButton
          title={localization.sign_up}
          onPress={() => {
            navigation.navigate(RootParamList.SignUpScreen);
          }}
        />
      </View>
    </View>
  );
}
