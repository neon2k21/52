
import {useFonts} from 'expo-font';
import { useCallback, useEffect } from "react";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {enableLatestRenderer} from 'react-native-maps';
import AppNavigation from "./navigation/navigation";
import {PermissionsAndroid} from 'react-native';
import { firebaseConfig } from "./firebase_config";
import { firebase } from "@react-native-firebase/messaging";
import { NotificationListener, requestUserPermission } from "./notification_helper";

enableLatestRenderer();
firebase.initializeApp(firebaseConfig)


global.markers_data = []
global.route_type='WALKING'


export default function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const [fontsLoaded, fontError] = useFonts({
    'Black': require('./assets/font/Inter-Black.ttf'),
    'Bold': require('./assets/font/Inter-Bold.ttf'),
     'Medium': require('./assets/font/Inter-Medium.ttf'),
     'SemiBold': require('./assets/font/Inter-SemiBold.ttf')
  });

 useEffect(()=>{
      requestUserPermission()
      NotificationListener()
 },[])

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

