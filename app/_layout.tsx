import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import LandingScreen from "./landing";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="oauthsignup" options={{ headerShown: false }} />
        <Stack.Screen
          name="termsandservices"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen
          name="hostlistingdetails/[id]"
          options={{ headerShown: false }}
        />

        <Stack.Screen name="create-profile" options={{ headerShown: false }} />
        <Stack.Screen
          name="spot-details/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="checkout/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="host" options={{ headerShown: false }} />

        <Stack.Screen name="hostlistings" options={{ headerShown: false }} />
        <Stack.Screen name="host-terms" options={{ headerShown: false }} />
        <Stack.Screen name="cars" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
