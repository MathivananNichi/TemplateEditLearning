import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const RootParamList = {
  Login: "Login",
  SignUpScreen: "SignUpScreen",
  TemplateEditScreen: "TemplateEditScreen",
  TemplateEditTest: "TemplateEditTest",
};
export type RootStackParamList = {
  [RootParamList.Login]: undefined;
  [RootParamList.TemplateEditTest]: undefined;
  [RootParamList.TemplateEditScreen]: undefined;
  [RootParamList.SignUpScreen]: undefined;
};

export type SignUpNavProps = NativeStackScreenProps<
  RootStackParamList,
  typeof RootParamList.SignUpScreen
>;
