import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootParamList, RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { TemplateEditScreenTest } from "../../features/template_edit/template_edit_screen_test";
import LoginScreen from "../../features/auth/LoginScreen";
import TemplateEditScreen from "../../features/template_edit/TemplateEditScreen";
import SignUpScreen from "../../features/auth/SignUpScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RootParamList.Login}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={RootParamList.Login} component={LoginScreen} />
        <Stack.Screen
          name={RootParamList.SignUpScreen}
          component={SignUpScreen}
        />
        <Stack.Screen
          name={RootParamList.TemplateEditTest}
          component={TemplateEditScreenTest}
        />
        <Stack.Screen
          name={RootParamList.TemplateEditScreen}
          component={TemplateEditScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
