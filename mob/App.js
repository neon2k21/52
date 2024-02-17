import { SafeAreaView, StatusBar, View } from "react-native";
import AppNavigation from "./navigation/navigation";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {useFonts} from 'expo-font';
import { useCallback } from "react";



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
    <View className="w-full h-full" >
      
          <AppNavigation/>
      </View>
  );
}

