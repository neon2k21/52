import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CreatePublication from '../screens/createPublication';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserMainScreen from '../screens/mainscreen';
import PublicationsScreen from '../screens/Publications';


const Login_Stack = createNativeStackNavigator()
const MainScreen_Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function Bottom_stacknavigator(){
return(
  <Tab.Navigator>
    <Tab.Screen name = "Карта" options={{headerShown: false}} component={MainScreen_StackNavigator}/>
    <Tab.Screen name = "Публикации" options={{headerShown: false}} component={PublicationsScreen}/>
  </Tab.Navigator>
)
  
}



function MainScreen_StackNavigator(){

  return(
    <MainScreen_Stack.Navigator>
      <MainScreen_Stack.Screen name = "dd" options={{headerShown: false}} component={UserMainScreen}/>
      <MainScreen_Stack.Screen name = "Создать публикацию" options={{headerShown: false}} component={CreatePublication}/>
    </MainScreen_Stack.Navigator>
  )
}



function Login_StackNavigator(){

  
    return(
    <Login_Stack.Navigator>
      
      <Login_Stack.Screen name="Главный экран" options={{headerShown: false}} component={Bottom_stacknavigator}/>
    
    </Login_Stack.Navigator>
  )
  
  
}


export default function AppNavigation(){
    return(
       
        <NavigationContainer>
           <Login_StackNavigator/>
        </NavigationContainer>
       
    )
}