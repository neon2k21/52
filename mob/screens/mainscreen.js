import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps';

import GetLocation from 'react-native-get-location'




export default function UserMainScreen() {

  
      
 

  useEffect(()=>{
    
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(location => {
      console.log(location);
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
   
  },[])

  
  return (
  <View  className="w-full h-full ">
    <MapView
    showsUserLocation={true}
    showsMyLocationButton={true}
    followsUserLocation={true}
    showsCompass={true}
    className="w-full h-full "
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
  </View>
  );
}



const styles = StyleSheet.create({


    externalView:{
      width:'100%',
      height:'100%',
      backgroundColor:'rgb(249, 241, 229)'
    },
    prodileView: {
      position:'absolute'
    },
    profileText:{
      width:200,
      marginTop:55,
      marginStart:60,
      fontSize:15,
      fontFamily:'Bold',
      position:'absolute',
      color:'rgb(4,4,4)',

    },
    flalistView:{
      
    },
    myobjecttext:{
      position:'absolute',
      fontFamily:'Black',
      fontSize:15,
      textTransform:'lowercase',
      marginStart:15,
      marginTop:129,
      color:'rgb(4,4,4)'
    },
    flatlist:{
      width:widthPercentageToDP(100),
      position:'absolute',
      marginTop:162,
      height:171
    },

    itemseparator:{
      height: "10%",
      width: 10
    },
    aboutcompany:{
      position:'absolute',
      fontFamily:'Black',
      fontSize:15,
      textTransform:'lowercase',
      marginStart:15,
      marginTop:368
      ,
      color:'rgb(4,4,4)'
    },
    viewforlogo:{
      position:'absolute',
      height:66,
      marginTop:401,
      marginStart:15,
      width:widthPercentageToDP(27),
    },
    ovalFIO:{
      width:35,
      height:35,
      position:'absolute',
      marginTop:55,
      marginStart:15,

    },
    emojiUser:{
      width:25,
      height:25,
      position:'absolute',
      marginTop:61,
      marginStart:20
    },
    header:{
      position:'absolute',
width:widthPercentageToDP(100)
    },
    bigtext:{
      position:'absolute',
      width:360,
marginStart:15,
fontFamily:'Medium',
fontSize:14,
marginTop:491

    },
    timeText:{
      position:'absolute',
      width:360,
marginStart:46,
fontFamily:'Bold',
fontSize:14,
marginTop:647
    },
    workText:{
      position:'absolute',
      width:360,
marginStart:46,
fontFamily:'Medium',
fontSize:14,
marginTop:684
    },
    placeText:{
      position:'absolute',
      width:360,
marginStart:46,
fontFamily:'Bold',
fontSize:14,
marginTop:721
    },
    textList1:{
      position:'absolute',
      width:339,
marginStart:36,
fontFamily:'Medium',
fontSize:14,
marginTop:559
    },
    textList2:{
      position:'absolute',
      width:339,
marginStart:36,
fontFamily:'Medium',
fontSize:14,
marginTop:593
    },
    textList3:{
      position:'absolute',
      width:339,
marginStart:36,
fontFamily:'Medium',
fontSize:14,
marginTop:610
    },
    daught1:{position:'absolute',marginLeft:23,marginTop:568, width:5, height:5},
    daught2:{position:'absolute',marginLeft:23,marginTop:602, width:5, height:5},
    daught3:{position:'absolute',marginLeft:23,marginTop:619, width:5, height:5},
    nextTextBig:{
      position:'absolute',
      width:150,
marginStart:134,
fontFamily:'Bold',
fontSize:14,
marginTop:508
    },
    nextTextWork:{
      position:'absolute',
      width:150,
marginStart:133,
fontFamily:'Bold',
fontSize:14,
marginTop:683
    },
    emojiCool:{
      position:'absolute',
      width:28,
      height:28,
      marginTop:477,
      marginStart:15
    },
    emojiStrong:{
      position:'absolute',
      width:28,
      height:28,
      marginTop:675,
      marginStart:15
    },
    emojiClock:{
      position:'absolute',
      width:28,
      height:28,
      marginTop:638,
      marginStart:15
    },
    emojiPlace:{
      position:'absolute',
      width:28,
      height:28,
      marginTop:712,
      marginStart:15
    },
    textCall:{
      position:'absolute',
      fontFamily:'Black',
      fontSize:15,
      textTransform:'uppercase',
      color:'rgb(255,255,255)',


    },
    imageCall:{
      width:'45%',
      height:35,
      marginTop:768,
      justifyContent:'center',
      alignItems:'center',
      marginStart:widthPercentageToDP(50)
    },
    
})