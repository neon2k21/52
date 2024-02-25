import { FlatList, Button, TextInput, Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import {  useEffect, useCallback, useMemo, useRef, useState, createRef } from 'react';
import {MagnifyingGlassCircleIcon} from 'react-native-heroicons/solid'
import YaMap, {Marker,RoutesFoundEvent} from 'react-native-yamap';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ip_address } from '../config';
import * as Location from 'expo-location';



YaMap.init('4dcbaad2-be4e-4626-9b1a-a7c4b15ca00b')
YaMap.setLocale('ru_Ru')



export default function UserMainScreen() {

  let markers_data = []
  const [location, setLocation] = useState({"coords": {"accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 53.4186, "longitude": 59.0472, "speed": 0}, "mocked": false, "timestamp": 1708581410459});
 
  const [ selectedMarkerData, setSelectedMarkerData] = useState({});
  const [ search, setSearch] = useState();
  const [ data, setData] = useState([])

  map = createRef(YaMap);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['20%', '50%','100%'], []);


  // Geolocation.watchPosition(
  //   success: (
  //     position: {
  //       coords: {
  //         latitude: number;
  //         longitude: number;
  //         altitude: number | null;
  //         accuracy: number;
  //         altitudeAccuracy: number | null;
  //         heading: number | null;
  //         speed: number | null;
  //       };
  //       timestamp: number;
  //     }
  //   ) => void,
  //   error?: (
  //     error: {
  //       code: number;
  //       message: string;
  //       PERMISSION_DENIED: number;
  //       POSITION_UNAVAILABLE: number;
  //       TIMEOUT: number;
  //     }
  //   ) => void,
  //   options?: {
  //     interval?: number;
  //     fastestInterval?: number;
  //     timeout?: number;
  //     maximumAge?: number;
  //     enableHighAccuracy?: boolean;
  //     distanceFilter?: number;
  //     useSignificantChanges?: boolean;
  //   }
  // ) => number



  useEffect(() => {
   

   const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    console.log("Location:");
    console.log(currentLocation);
  };
  getPermissions();
  getAllObjects()

  },[]);

  const getAllObjects = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "contact": Number(global.id)
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(ip_address+'/getallobjects', requestOptions)
      .then( response => response.json())
      .then( result => {
       console.log('res',result)
        setData(result)

    })
      .catch(error => console.log('error', error));

}
  
  const setDataToBottomSheet = (id,altitude,longitute,name,address, working_time, image, website, phone) => {
      console.log(id,altitude,longitute,name,address, working_time, image, website, phone)
       setSelectedMarkerData(
      {
        "id": id,
        "altitude": altitude,
        "longitute":longitute,
        "name":name,
        "address":address, 
        "working_time":working_time, 
        "image":image, 
        "website":website,
         "phone":phone
        
      }
    )

  }

  const onChangeText = async (text) => {
    setSearch(text)
    console.log('get data: ', search)
    if (text.length === 0) return setData([]);
    if(text.length > 2) {

    }
  }
  
  function handleSheetChanges()  {
    bottomSheetRef.current?.present()
  }

 
  function createRoute(point1,point2,type){
    // const [point1,point2,type] = props
     let points=[point1[0],point2[0]]
    //  this.map.current.findRoutes(points, [], ()=>{
    //   const arr = [];
    //   evt.routes[0].sections.forEach(section =>
    //     section.points.forEach(point => arr.push(point)),
    //   );
    //   setPoints(arr);
    // },);
    // return(
    //   <Polyline points={pointsssss} strokeColor={'red'} strokeWidth={4} />
    // )
    console.error(points)

    this.map.current.findDrivingRoutes([point1[0],point2[0]], (RoutesFoundEvent) => alert(RoutesFoundEvent.nativeEvent))
    console.error(this.map.current.findRoutes(points, ['car'], () => null))
    
  }




  return (
    <BottomSheetModalProvider>
        <View  className="w-full h-full bg-red-500">

          <View style={{backgroundColor:'white',top: 40, height:widthPercentageToDP(10),
            width:widthPercentageToDP(80), alignSelf:'center'}} className="rounded-full">

            <View style={{top: 5, left:10, height:widthPercentageToDP(8),
            width:widthPercentageToDP(60), position:'absolute'}} className="rounded-full">
              <TextInput style={{left:10,width:widthPercentageToDP(50),top:1 }} placeholder='Поиск...' value={search} onChangeText={onChangeText}/>
            </View>

            <MagnifyingGlassCircleIcon color={'black'} size={widthPercentageToDP(12)} style={{top: -4, right:-275}}/>

          </View>



      
              <TouchableOpacity onPress={handleSheetChanges}>
               
                  <Text>
                    presemnt
                  </Text>

              </TouchableOpacity>
          

<BottomSheetModal
    ref = {bottomSheetRef}
    index={0}
    snapPoints={snapPoints}
  >
    
   
    <View style={styles.contentContainer}>
      <Text> {selectedMarkerData.id} </Text>
      <Text> {selectedMarkerData.altitude} </Text>
      <Text> {selectedMarkerData.longitute} </Text>
      <Text> {selectedMarkerData.name} </Text>
      <Text> {selectedMarkerData.address} </Text>
      <Text> {selectedMarkerData.working_time} </Text>
      <Text> {selectedMarkerData.image} </Text>
      <Text> {selectedMarkerData.phone} </Text>


      <View>
            <Text>
              Отзывы
            </Text>
            <Text>
              Маршруты
            </Text>
      </View>

      <TouchableOpacity onPress={()=>{createRoute([point={lon:location.coords.latitude, lat:location.coords.longitude}],[point={lon:parseFloat(selectedMarkerData.altitude), lat:parseFloat(selectedMarkerData.longitute)}],'')}}>
        <Text>
          Маршрут 
        </Text>
      </TouchableOpacity>

    </View>
  </BottomSheetModal>


<YaMap
  ref={this.map}
  showUserPosition
  followUser
  initialRegion={{
    lat: location.coords.latitude,
    lon: location.coords.longitude,
    zoom: 17,
    azimuth: 80,
    tilt: 100
  }}
 
  style={{ flex: 1 }}
>
  {data.map((val, index) => {
   
  return (
  <Marker  point={{ lat: parseFloat(val.longitute), lon: parseFloat(val.altitude)}} key={index} onPress={()=>{console.log(val.address); setDataToBottomSheet(val.id,val.altitude,val.longitute,val.name,val.address, val.working_time, val.image, val.website, val.phone); handleSheetChanges()}}/>
          )
     })}
</YaMap>


    

    
</View>
    </BottomSheetModalProvider>
  
  ) 
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
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