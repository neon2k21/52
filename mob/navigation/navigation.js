import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginscreen';
import MapMainScreen from '../screens/mainscreen';

const Login_Stack = createNativeStackNavigator()
const MainScreen_Stack = createNativeStackNavigator()


function Login_StackNavigator(){

  
    return(
    <Login_Stack.Navigator>
      
      <Login_Stack.Screen name = "Главный экран" options={{headerShown: false}} component={MapMainScreen}/>
    
    </Login_Stack.Navigator>
  )
  
  
}

//<Login_Stack.Screen name = "Авторизация" options={{headerShown: false}} component={LoginScreen}/>

export default function AppNavigation(){
    return(
       
        <NavigationContainer>
           <Login_StackNavigator/>
        </NavigationContainer>
       
    )
}