import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePublication from '../screens/publications/createPublication';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserMainScreen from '../screens/mainscreen';
import PublicationsScreen from '../screens/publications/Publications';
import CreateReview from '../screens/review/createReview';
import CommentScreen from '../screens/publications/commentscreen';
import LoginScreen from '../screens/loginscreen';
import Profile from '../screens/profile/profile'
import ReviewScreen from '../screens/review/ReviewScreen';

const Login_Stack = createNativeStackNavigator()
const Publication_Stack = createNativeStackNavigator()
const MainScreen_Stack = createNativeStackNavigator()
const Review_Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()




function Bottom_stacknavigator(){
return(
  <Tab.Navigator>
    <Tab.Screen name = "Карта" options={{headerShown: false}} component={MainScreen_StackNavigator}/>
    <Tab.Screen name = "Публикации" options={{headerShown: false}} component={Publication_stacknavigator}/>
    <Tab.Screen name = "Профиль" options={{headerShown: false}} component={Profile}/>
  </Tab.Navigator>
)
  
}

function Publication_stacknavigator(){
  return(
    <Publication_Stack.Navigator>
      <Publication_Stack.Screen name = "ee" options={{headerShown: false}} component={PublicationsScreen}/>
      <Publication_Stack.Screen name = "Комментарии"  component={CommentScreen}/>
    </Publication_Stack.Navigator>
  )  
}

function Review_StackNavigator(){
  return(
    <Review_Stack.Navigator>
      <Review_Stack.Screen name = "dd" options={{headerShown: false}} component={ReviewScreen}/>
      <Review_Stack.Screen name = "Написать отзыв" options={{headerShown: false}} component={CreateReview}/>
    </Review_Stack.Navigator>
  )
}



function MainScreen_StackNavigator(){

  return(
    <MainScreen_Stack.Navigator>
      <MainScreen_Stack.Screen name = "dd" options={{headerShown: false}} component={UserMainScreen}/>
      <MainScreen_Stack.Screen name = "Создать публикацию" options={{headerShown: false}} component={CreatePublication}/>
      <MainScreen_Stack.Screen name = "Все отзывы" component={Review_StackNavigator}/>

    </MainScreen_Stack.Navigator>
  )
}



function Login_StackNavigator(){

  
    return(
    <Login_Stack.Navigator>
      
      <Login_Stack.Screen name="Авторизация" options={{headerShown: false}} component={LoginScreen}/>
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