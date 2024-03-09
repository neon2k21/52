import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


// import { registerRootComponent } from 'expo';
// import { Navigation } from "react-native-navigation";
// import messaging from '@react-native-firebase/messaging'


// import App from './App';
// //registerRootComponent(App);

// Navigation.registerComponent('com.company.vuzappcursovaya', () => App);

// Navigation.events().registerAppLaunchedListener(() => {
//    Navigation.setRoot({
//      root: {
//        stack: {
//          children: [
//            {
//              component: {
//                name: 'com.company.vuzappcursovaya'
//              }
//            }
//          ]
//        }
//      }
//   });
// });