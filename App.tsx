import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/core/router/AppNavigtor";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./src/localization/i18n";
import { ActivityIndicator } from "react-native";
export default function App() {
  const [fontsLoaded] = useFonts({
    "ShantellSans-Light": require("./assets/fonts/ShantellSans-Light.ttf"),
    "ShantellSans-Regular": require("./assets/fonts/ShantellSans-Regular.ttf"),
    "ShantellSans-Medium": require("./assets/fonts/ShantellSans-Medium.ttf"),
    "ShantellSans-SemiBold": require("./assets/fonts/ShantellSans-SemiBold.ttf"),
    "ShantellSans-Bold": require("./assets/fonts/ShantellSans-Bold.ttf"),
    "ShantellSans-ExtraBold": require("./assets/fonts/ShantellSans-ExtraBold.ttf"),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
