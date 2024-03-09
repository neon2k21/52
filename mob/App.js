import { SafeAreaView, StatusBar, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {useFonts} from 'expo-font';
import { useCallback } from "react";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {enableLatestRenderer} from 'react-native-maps';
import AppNavigation from "./navigation/navigation";

enableLatestRenderer();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Black': require('./assets/font/Inter-Black.ttf'),
   'Bold': require('./assets/font/Inter-Bold.ttf'),
     'Medium': require('./assets/font/Inter-Medium.ttf'),
     'SemiBold': require('./assets/font/Inter-SemiBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="w-full h-full">
       <AppNavigation/>
    </GestureHandlerRootView>
   
  );
}

