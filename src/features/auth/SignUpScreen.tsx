import { View } from "react-native";
import AppText from "../../components/AppText";
import { localization } from "../../localization";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontWeight } from "@shopify/react-native-skia";
import { CustomTextInput } from "../../components/CustomTextInput";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "../../theme/useTheme";
import DropdownComponent from "../../components/DroDownComponent";
import CustomButton from "../../components/CustomButton";

const LoginSchema = z.object({
  name: z.string().min(2, "Minmum 3 is required"),
  mobile: z.string().length(10, "10 digit number is required"),
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

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { control, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const theme = useTheme();
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        paddingHorizontal: 12,

        backgroundColor: theme.colors.background,
        paddingBottom: insets.bottom,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <AppText style={{ fontWeight: FontWeight.SemiBold, fontSize: 18 }}>
        {localization.create_account_title}
      </AppText>
      <AppText style={{ textAlign: "center" }}>
        {localization.create_account_subtitle}
      </AppText>

      <View style={{ gap: 12, width: "100%", paddingTop: 40 }}>
        <CustomTextInput
          title={localization.full_name_label}
          control={control}
          placeholder={localization.full_name_placeholder}
          name="name"
          keyboardType="default"
          autoCorrect={false}
        />

        <CustomTextInput
          title={localization.email_or_phone_label}
          control={control}
          placeholder={"fsdfsdf"}
          name="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <CustomTextInput
          title={localization.mobile_number_label}
          control={control}
          placeholder={localization.mobile_number_placeholder}
          name="mobile"
          leftIcon={<DropdownComponent />}
          keyboardType="number-pad"
          autoCorrect={false}
        />
        <CustomTextInput
          title={localization.password_label}
          control={control}
          placeholder={localization.password_placeholder}
          name="password"
          isPassword={true}
          keyboardType="number-pad"
          autoCorrect={false}
        />
      </View>
      <CustomButton
        title={localization.create_account_button}
        onPress={() => {}}
      />
    </View>
  );
}
