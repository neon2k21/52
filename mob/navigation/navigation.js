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
import { COLORS } from '../color';
import { useState } from 'react';
import{Image, Icon} from 'react-native'
import { widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Login_Stack = createNativeStackNavigator()
const Publication_Stack = createNativeStackNavigator()
const MainScreen_Stack = createNativeStackNavigator()
const Review_Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()




function Bottom_stacknavigator(){
  const [Home, steHome] = useState({
    tabBarLabel: '',
            tabBarIcon:({})=>(
              <TouchableOpacity>
             <Image style={{position:'absolute', width:heightPercentageToDP(5.7), height:heightPercentageToDP(4), top:heightPercentageToDP(-2)}}source={require('../assets/images/mapActive.png')} />
             </TouchableOpacity>
            ),
  })
return(
  <Tab.Navigator
  screenOptions={{
    tabBarStyle:{height:heightPercentageToDP(5), backgroundColor:COLORS.black, borderTopEndRadius:heightPercentageToDP(5)},
    tabBarBackground: () => (
      <Image source={require('../assets/images/navigationBar.png')} style={{height:heightPercentageToDP(14), width:heightPercentageToDP(54), position:'absolute', top:heightPercentageToDP(-4.5), left:widthPercentageToDP(-5.5)}}/>
    ),
  }}
  >
    <Tab.Screen name = "Карта" options={{
      headerShown: false,
      tabBarLabel:Home.tabBarLabel,
      tabBarIcon:Home.tabBarIcon
      }} 
      component={MainScreen_StackNavigator}/>
    <Tab.Screen name = "Публикации" options={{headerShown: false, statusBarColor:COLORS.white}} component={Publication_stacknavigator}/>
    <Tab.Screen name = "Профиль" options={{headerShown: false, statusBarColor:COLORS.white}} component={Profile}/>
  </Tab.Navigator>
)
  
}

function Publication_stacknavigator(){
  return(
    <Publication_Stack.Navigator>
      <Publication_Stack.Screen name = "ee" options={{headerShown: false, statusBarColor:COLORS.white}} component={PublicationsScreen}/>
      <Publication_Stack.Screen name = "Комментарии"  component={CommentScreen}/>
    </Publication_Stack.Navigator>
  )  
}

function Review_StackNavigator(){
  return(
    <Review_Stack.Navigator>
      <Review_Stack.Screen name = "dd" options={{headerShown: false, statusBarColor:COLORS.white}} component={ReviewScreen}/>
      <Review_Stack.Screen name = "Написать отзыв" options={{headerShown: false, statusBarColor:COLORS.white}} component={CreateReview}/>
    </Review_Stack.Navigator>
  )
}



function MainScreen_StackNavigator(){

  return(
    <MainScreen_Stack.Navigator>
      <MainScreen_Stack.Screen name = "dd" options={{headerShown: false, statusBarColor:COLORS.white}} component={UserMainScreen}/>
      <MainScreen_Stack.Screen name = "Создать публикацию" options={{headerShown: false, statusBarColor:COLORS.blue}} component={CreatePublication}/>
      <MainScreen_Stack.Screen name = "Все отзывы" component={Review_StackNavigator}/>

    </MainScreen_Stack.Navigator>
  )
}



function Login_StackNavigator(){

  
    return(
    <Login_Stack.Navigator>
      
      <Login_Stack.Screen name="Авторизация" options={{headerShown: false, statusBarColor:COLORS.white}} component={LoginScreen} />
      <Login_Stack.Screen name="Главный экран" options={{headerShown: false, statusBarColor:COLORS.white}} component={Bottom_stacknavigator}/>
    
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