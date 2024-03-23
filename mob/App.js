
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

global.userNickName = ''
global.markers_data = []
global.route_type='WALKING'
global.tag_1 = 0
global.tag_2 = 0
global.tag_3 = 0
global.tag_4 = 0
global.tag_5 = 0
global.tag_6 = 0
global.tag_7 = 0

export default function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const [fontsLoaded, fontError] = useFonts({
    'Black': require('./assets/font/Black.ttf'),
    'Bold': require('./assets/font/Bold.ttf'),
     'Medium': require('./assets/font/Medium.ttf'),
     'SemiBold': require('./assets/font/Bold.ttf'),
     'ExtraBold': require('./assets/font/ExtraBold.ttf')
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

