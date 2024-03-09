import { FlatList, TextInput, Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import {  widthPercentageToDP } from 'react-native-responsive-screen';
import { useEffect, useMemo, useRef, useState, createRef, useCallback } from 'react';
import { MagnifyingGlassCircleIcon } from 'react-native-heroicons/solid'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ip_address } from '../config';
import * as Location from 'expo-location';
import SelectedMarker from '../components/map/selectedMarker';
import { useNavigation } from '@react-navigation/core';
import MapView, {Marker,Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import filter from "lodash/filter"


const initialRegion={
  latitude: 53.407163, 
  longitude: 58.980291,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}


const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"




export default function UserMainScreen() {


  const [distance, setDistance] = useState("")
  const [time, setTime]= useState("")


  const [onRoute, setOnRoute] = useState(false)

  const {navigate} = useNavigation()

  
 const [routing, setRouting] = useState([])
  const [names, SetNames] = useState([])
  const [startPoint,setStartPoint] = useState()
  const [endPoind, setEndPoint] = useState()
  const [wayPoints,setWaypoints] = useState([])


  const [markers_data, setmarkers_data] = useState([])
  const [user_location, set_user_location] = useState([])
  const [location, setLocation] = useState({ "coords": { "accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 53.4186, "longitude": 59.0472, "speed": 0 }, "mocked": false, "timestamp": 1708581410459 });

  const [selectedMarkerData, setSelectedMarkerData] = useState({});
  const [search, setSearch] = useState();

  const [fullData, setFullData] = useState([])
  const [data, setData] = useState([])

  const [searchQuery, setSearchQuery] = useState('');

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['20%', '50%', '100%'], []);

  global.route_type='WALKING' 


  const handleSearch = (query) =>{
    setSearchQuery(query)
    const formattedQuary = query;
    const filteredData = filter(fullData, (group) => {
      console.log(group)
      return contains(group, formattedQuary)
    })
    setData(filteredData)
  }

  const contains = (name, query) =>{
    console.log('name', name.name)
    console.log('query', query)
      if (name.name.includes(query)){
         return true;
      }
     
    else{
      return false;
    } 
  }




  

  useEffect(() => {

    
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      set_user_location({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude})
    };

    const watch = async() => {
       let subs = await Location.watchPositionAsync(
      {accuracy: Location.Accuracy.Highest,
      distanceInterval:1,
      },
      (location)=>{
      const {coords} = location;
      const {latitude,longitude } = coords
      set_user_location({latitude,longitude})
      global.user_location = {latitude,longitude}
      //console.log({latitude,longitude })
      if(onRoute && time > 5 || 0) startRouting( global.user_location)
      else setOnRoute(false)
    }
       )
    }
    getPermissions();
    getAllObjects()
    watch()

  }, []);



  const startRouting = (user_location) =>{
    
    let new_arr = [{"point":user_location}, ...markers_data]
    drawRoute(new_arr)
    setOnRoute(true)
    // else setOnRoute(false)
  }



  const getAllObjects = () => {
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

    fetch(ip_address + '/getallobjects', requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.warn(result[0])
        setData(result)
        setFullData(result)

      })
      .catch(error => console.log('error', error));

  }
  



  const removeItem = (id) => {
    const filteredData = markers_data.filter((item) => item.id !== id);
    console.log(filteredData)
    setmarkers_data(filteredData);
    drawRoute(filteredData)
  };


  const setDataToBottomSheet = (id, altitude, longitute, name, address, working_time, image, website, phone) => {
    console.log(id, altitude, longitute, name, address, working_time, image, website, phone)
    setSelectedMarkerData(
      {
        "id": id,
        "altitude": altitude,
        "longitute": longitute,
        "name": name,
        "address": address,
        "image": image,
        "website": website,
        "phone": phone

      }
    )

  }

  


    const handleSheetChanges = useCallback(index =>{
      bottomSheetRef.current?.present()
      console.log(index)
    })



  function addToFlatlist(id, altitude, longitute, name) {
    
    var arr1 = [...markers_data, { "id": id, "point": { longitude: parseFloat(altitude), latitude: parseFloat(longitute) }, "name": name }]
    setmarkers_data(arr1)
    console.log(markers_data.length)
    drawRoute(arr1)
  }


  function clearRoute(){
    let arr =[]
    setRouting(arr)
    drawRoute(arr)
  }

  

  function drawRoute(points){
    let only_points = []
    for(let i=0; i<points.length;i++){
      only_points.push(points[i].point)
    }
    if (only_points.length > 1) {  
      if(only_points.length < 3) {

        setRouting(only_points)
        setWaypoints([])
        setStartPoint(only_points[0])
        setEndPoint(only_points[1])
      }
      else {
        setRouting(points)
          const waypoitns = []
          for(let i=1; i<only_points.length-1;i++){
            waypoitns.push(only_points[i])
          }
          setStartPoint(only_points[0])
          setWaypoints(waypoitns)
          setEndPoint(only_points[only_points.length-1])
       
      }
     }
    else  {
      setRouting([]);
      setStartPoint()
      setWaypoints([])
      setEndPoint()
    }
  }



  if(!onRoute && markers_data.length == 0){
    return (
      <BottomSheetModalProvider style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>
       
        
         <MapView
          showsPointsOfInterest={false}
          showsIndoors={false}
          toolbarEnabled={false}
          showsUserLocation
          mapType='terrain'         
          initialRegion={initialRegion}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >
           
          {
            data.map((val, index) => {

              return (

                <Marker
                  key={val.id}
                  onPress={() => {
                    setDataToBottomSheet(val.id, val.altitude, val.longitute, val.name, val.address, val.working_time, val.image, val.website, val.phone);
                    handleSheetChanges()
                  }
                  }
                  coordinate={{ latitude: parseFloat(val.longitute), longitude: parseFloat(val.altitude) }}

                />
              )
            })
          }
         <MapViewDirections
                mode={global.route_type}
                origin={startPoint}
                waypoints={wayPoints}
                destination={endPoind}
                apikey={GOOGLE_MAPS_APIKEY}
               
              />
        </MapView>      
      

        <View style={{
          backgroundColor: 'white', top: 40, height: widthPercentageToDP(10),
          width: widthPercentageToDP(80), alignSelf: 'center', position: 'absolute'
        }} className="rounded-full">

          <View style={{
            top: 5, left: 10, height: widthPercentageToDP(8),
            width: widthPercentageToDP(60), position: 'absolute'
          }} className="rounded-full">

        <TextInput
            placeholder="Поиск"
            placeholderTextColor={'white'}
            selectionColor={'white'}
            clearButtonMode="always"
          
            autoCorrect={false}
            onChangeText={(query) => handleSearch(query)}
            value= {searchQuery}
            className= "w-full text-2xl border-solid rounded-b-2xl "
          />

      

          </View>

          <MagnifyingGlassCircleIcon color={'black'} size={widthPercentageToDP(12)} style={{ top: -4, right: -275 }} />

        </View>
          

        <FlatList
          data={markers_data}
          extraData={markers_data}
          vertical={true}
          numColumns={2}
          contentContainerStyle={{ alignSelf: 'flex-start' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ position: 'absolute', width: '100%', height: 120, top: 90 }}
          renderItem={({ item, index }) => (

            <TouchableOpacity onPress={() => removeItem(item.id)}>

              <SelectedMarker id={index + 1} altitude={item.altitude} longitute={item.longitute} name={item.name} />

            </TouchableOpacity>
          )}

        />


        <BottomSheetModal
          ref={bottomSheetRef}
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
            {/* [point={lon:location.coords.latitude, lat:location.coords.longitude}] */}

            <TouchableOpacity onPress={() => { addToFlatlist(selectedMarkerData.id, parseFloat(selectedMarkerData.altitude), parseFloat(selectedMarkerData.longitute), selectedMarkerData.name) }}>
              <Text>
                добавить
              </Text>
            </TouchableOpacity>
            <SelectedMarker />

          </View>
        </BottomSheetModal>

      </BottomSheetModalProvider>

    )
  }
  if(!onRoute && markers_data.length > 0){
    return (
      <BottomSheetModalProvider style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>
          
        
         <MapView
          showsPointsOfInterest={false}
          showsIndoors={false}
          toolbarEnabled={false}
          showsUserLocation
          mapType='terrain'         
          initialRegion={initialRegion}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >
           
          {
            data.map((val, index) => {

              return (

                <Marker
                  key={val.id}
                  onPress={() => {
                    setDataToBottomSheet(val.id, val.altitude, val.longitute, val.name, val.address, val.working_time, val.image, val.website, val.phone);
                    handleSheetChanges()
                  }
                  }
                  coordinate={{ latitude: parseFloat(val.longitute), longitude: parseFloat(val.altitude) }}

                />
              )
            })
          }
         <MapViewDirections
                mode={global.route_type}
                origin={startPoint}
                waypoints={wayPoints}
                destination={endPoind}
                apikey={GOOGLE_MAPS_APIKEY}
               
              />
        </MapView>
           <TouchableOpacity style={{ position:'absolute' ,top: 250,backgroundColor:'green',right:120}} onPress={()=>{setmarkers_data([])}}>
            <Text>
              ОЧИСТИТЬ
            </Text>
          </TouchableOpacity>

        <View style={{ position: 'absolute',bottom:30}} className="flex-row ">

       

        <TouchableOpacity 
        onPress={()=>{
          global.route_to_publicate = routing
          global.waypointNames = markers_data
          navigate('Создать публикацию')
        }}
        className="rounded-lg" style={{ width: 120, height: 50, backgroundColor: 'red'}}>
          <Text>
            Создать публикацию
          </Text>
        </TouchableOpacity>

        
        <TouchableOpacity
        onPress={()=>{startRouting(global.user_location); global.route_type='DRIVING' 
        }}
        className="rounded-lg" style={{ width: 120, height: 50, backgroundColor: 'red', right:-150}}> 
          <Text>
            В путь машина
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{startRouting(global.user_location);global.route_type='WALKING' 
        }}
        className="rounded-lg" style={{ width: 120, height: 50, backgroundColor: 'red', right:90}}> 
          <Text>
            В путь на ногах
          </Text>
        </TouchableOpacity>
        </View>
       


        <View style={{
          backgroundColor: 'white', top: 40, height: widthPercentageToDP(10),
          width: widthPercentageToDP(80), alignSelf: 'center', position: 'absolute'
        }} className="rounded-full">

          <View style={{
            top: 5, left: 10, height: widthPercentageToDP(8),
            width: widthPercentageToDP(60), position: 'absolute'
          }} className="rounded-full">

        <TextInput
            placeholder="Поиск"
            placeholderTextColor={'white'}
            selectionColor={'white'}
            clearButtonMode="always"
          
            autoCorrect={false}
            onChangeText={(query) => handleSearch(query)}
            value= {searchQuery}
            className= "w-full text-2xl border-solid rounded-b-2xl "
          />

      

          </View>

          <MagnifyingGlassCircleIcon color={'black'} size={widthPercentageToDP(12)} style={{ top: -4, right: -275 }} />

        </View>

        <FlatList
          data={markers_data}
          extraData={markers_data}
          vertical={true}
          numColumns={2}
          contentContainerStyle={{ alignSelf: 'flex-start' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ position: 'absolute', width: '100%', height: 120, top: 90 }}
          renderItem={({ item, index }) => (

            <TouchableOpacity onPress={() => removeItem(item.id)}>

              <SelectedMarker id={index + 1} altitude={item.altitude} longitute={item.longitute} name={item.name} />

            </TouchableOpacity>
          )}

        />


        <BottomSheetModal
          ref={bottomSheetRef}
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
            {/* [point={lon:location.coords.latitude, lat:location.coords.longitude}] */}

            <TouchableOpacity onPress={() => { addToFlatlist(selectedMarkerData.id, parseFloat(selectedMarkerData.altitude), parseFloat(selectedMarkerData.longitute), selectedMarkerData.name) }}>
              <Text>
                добавить
              </Text>
            </TouchableOpacity>
            <SelectedMarker />

          </View>
        </BottomSheetModal>

      </BottomSheetModalProvider>

    )
  }
  if(onRoute){
    return (
      <BottomSheetModalProvider style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>

        
         <MapView
          mapType='terrain'
          initialRegion={initialRegion}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >
           
          {
            data.map((val, index) => {

              return (

                <Marker
                  key={val.id}
                  onPress={() => {
                    setDataToBottomSheet(val.id, val.altitude, val.longitute, val.name, val.address, val.working_time, val.image, val.website, val.phone);
                    handleSheetChanges()
                  }
                  }
                  coordinate={{ latitude: parseFloat(val.longitute), longitude: parseFloat(val.altitude) }}

                />
              )
            })
          }
         <MapViewDirections
               mode={global.route_type}
                origin={startPoint}
                waypoints={wayPoints}
                destination={endPoind}
                apikey={GOOGLE_MAPS_APIKEY}
                onReady={result=>{
                  setDistance(result.distance)
                  setTime(result.duration)
                  if(result.distance == "") setOnRoute(false)
                  console.log('distanse',distance,"time",time)}}
              />
        </MapView>
        <TouchableOpacity style={{ position:'absolute' ,top: 250,backgroundColor:'green',right:120}} onPress={()=>{setmarkers_data([])}}>
            <Text>
              ОЧИСТИТЬ
            </Text>
          </TouchableOpacity>
       


        <View style={{
          backgroundColor: 'white', top: 40, height: widthPercentageToDP(10),
          width: widthPercentageToDP(80), alignSelf: 'center', position: 'absolute'
        }} className="rounded-full">

          <View style={{
            top: 5, left: 10, height: widthPercentageToDP(8),
            width: widthPercentageToDP(60), position: 'absolute'
          }} className="rounded-full">

        <Text>
          Время: {time}
        </Text>

        <Text>
        Дистанция: {distance}
          </Text>

          </View>
          
        </View>

        <FlatList
          data={markers_data}
          extraData={markers_data}
          vertical={true}
          numColumns={2}
          contentContainerStyle={{ alignSelf: 'flex-start' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ position: 'absolute', width: '100%', height: 120, top: 90 }}
          renderItem={({ item, index }) => (

            <TouchableOpacity onPress={() => removeItem(item.id)}>

              <SelectedMarker id={index + 1} altitude={item.altitude} longitute={item.longitute} name={item.name} />

            </TouchableOpacity>
          )}

        />


        <BottomSheetModal
          ref={bottomSheetRef}
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
            {/* [point={lon:location.coords.latitude, lat:location.coords.longitude}] */}

            <TouchableOpacity onPress={() => { addToFlatlist(selectedMarkerData.id, parseFloat(selectedMarkerData.altitude), parseFloat(selectedMarkerData.longitute), selectedMarkerData.name) }}>
              <Text>
                добавить
              </Text>
            </TouchableOpacity>
            <SelectedMarker />

          </View>
        </BottomSheetModal>

      </BottomSheetModalProvider>

    )
  }
   

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
  externalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(249, 241, 229)'
  },
  prodileView: {
    position: 'absolute'
  },
  profileText: {
    width: 200,
    marginTop: 55,
    marginStart: 60,
    fontSize: 15,
    fontFamily: 'Bold',
    position: 'absolute',
    color: 'rgb(4,4,4)',

  },
  flalistView: {

  },
  myobjecttext: {
    position: 'absolute',
    fontFamily: 'Black',
    fontSize: 15,
    textTransform: 'lowercase',
    marginStart: 15,
    marginTop: 129,
    color: 'rgb(4,4,4)'
  },
  flatlist: {
    width: widthPercentageToDP(100),
    position: 'absolute',
    marginTop: 162,
    height: 171
  },

  itemseparator: {
    height: "10%",
    width: 10
  },
  aboutcompany: {
    position: 'absolute',
    fontFamily: 'Black',
    fontSize: 15,
    textTransform: 'lowercase',
    marginStart: 15,
    marginTop: 368
    ,
    color: 'rgb(4,4,4)'
  },
  viewforlogo: {
    position: 'absolute',
    height: 66,
    marginTop: 401,
    marginStart: 15,
    width: widthPercentageToDP(27),
  },
  ovalFIO: {
    width: 35,
    height: 35,
    position: 'absolute',
    marginTop: 55,
    marginStart: 15,

  },
  emojiUser: {
    width: 25,
    height: 25,
    position: 'absolute',
    marginTop: 61,
    marginStart: 20
  },
  header: {
    position: 'absolute',
    width: widthPercentageToDP(100)
  },
  bigtext: {
    position: 'absolute',
    width: 360,
    marginStart: 15,
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 491

  },
  timeText: {
    position: 'absolute',
    width: 360,
    marginStart: 46,
    fontFamily: 'Bold',
    fontSize: 14,
    marginTop: 647
  },
  workText: {
    position: 'absolute',
    width: 360,
    marginStart: 46,
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 684
  },
  placeText: {
    position: 'absolute',
    width: 360,
    marginStart: 46,
    fontFamily: 'Bold',
    fontSize: 14,
    marginTop: 721
  },
  textList1: {
    position: 'absolute',
    width: 339,
    marginStart: 36,
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 559
  },
  textList2: {
    position: 'absolute',
    width: 339,
    marginStart: 36,
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 593
  },
  textList3: {
    position: 'absolute',
    width: 339,
    marginStart: 36,
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 610
  },
  daught1: { position: 'absolute', marginLeft: 23, marginTop: 568, width: 5, height: 5 },
  daught2: { position: 'absolute', marginLeft: 23, marginTop: 602, width: 5, height: 5 },
  daught3: { position: 'absolute', marginLeft: 23, marginTop: 619, width: 5, height: 5 },
  nextTextBig: {
    position: 'absolute',
    width: 150,
    marginStart: 134,
    fontFamily: 'Bold',
    fontSize: 14,
    marginTop: 508
  },
  nextTextWork: {
    position: 'absolute',
    width: 150,
    marginStart: 133,
    fontFamily: 'Bold',
    fontSize: 14,
    marginTop: 683
  },
  emojiCool: {
    position: 'absolute',
    width: 28,
    height: 28,
    marginTop: 477,
    marginStart: 15
  },
  emojiStrong: {
    position: 'absolute',
    width: 28,
    height: 28,
    marginTop: 675,
    marginStart: 15
  },
  emojiClock: {
    position: 'absolute',
    width: 28,
    height: 28,
    marginTop: 638,
    marginStart: 15
  },
  emojiPlace: {
    position: 'absolute',
    width: 28,
    height: 28,
    marginTop: 712,
    marginStart: 15
  },
  textCall: {
    position: 'absolute',
    fontFamily: 'Black',
    fontSize: 15,
    textTransform: 'uppercase',
    color: 'rgb(255,255,255)',


  },
  imageCall: {
    width: '45%',
    height: 35,
    marginTop: 768,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: widthPercentageToDP(50)
  },

})