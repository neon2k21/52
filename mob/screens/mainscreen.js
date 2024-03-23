import { FlatList, TextInput, Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert, Platform, Pressable, Modal, Dimensions } from 'react-native';
import {  heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useEffect, useMemo, useRef, useState, createRef, useCallback } from 'react';
import { MagnifyingGlassCircleIcon } from 'react-native-heroicons/solid'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList,BottomSheetView } from '@gorhom/bottom-sheet';
import { ip_address } from '../config';
import * as Location from 'expo-location';
import SelectedMarker from '../components/map/selectedMarker';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/core';
import MapView, {Marker,Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import filter from "lodash/filter"
import Review from '../components/Review/reviewCard';
import { RatingBar } from "@aashu-dubey/react-native-rating-bar";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotificationListener, requestUserPermission } from '../notification_helper';
import { COLORS } from '../color';
import { ScrollView } from 'react-native-gesture-handler';


const initialRegion={
  latitude: 53.407163, 
  longitude: 58.980291,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}


const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"




const { width, height } = Dimensions.get("window");

export default function UserMainScreen() {

  const [categories, setCategories] = useState([])
  const [clickedCat, setClickedCat] = useState(false)

  const [review_data, setReview_data] = useState([])
  const [distance, setDistance] = useState("")
  const [time, setTime]= useState("")
  const [onRoute, setOnRoute] = useState(false)
  const {navigate} = useNavigation()
  const {isFocused} = useIsFocused();
  const [routing, setRouting] = useState([])
  const [names, SetNames] = useState([])
  const [startPoint,setStartPoint] = useState()
  const [endPoind, setEndPoint] = useState()
  const [wayPoints,setWaypoints] = useState([])
  const [markers_data, setmarkers_data] = useState([])
  const [user_location, set_user_location] = useState([])
  const [location, setLocation] = useState({ "coords": { "accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 53.4186, "longitude": 59.0472, "speed": 0 }, "mocked": false, "timestamp": 1708581410459 });
  const [selectedMarkerData, setSelectedMarkerData] = useState({});
  const [fullData, setFullData] = useState([])
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');


  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['40%'], []);

  const addToFavor = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "object": global.object_id,
      "user": global.user_id
      
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/addtofavor', requestOptions)
      .then(response => response.json())
      .then(result => {     
      })
      .catch(error => console.log('error', error));
  }

  const getAllCategories=()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(ip_address + '/getallcategories', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setCategories(result)
      })
      .catch(error => console.log('error', error));
  }
  const [modalVisible, setModalVisible] = useState(false);
  const handleSearch = (query) =>{
    setSearchQuery(query)
    const formattedQuary = query;
    const filteredData = filter(fullData, (group) => {
      return contains(group, formattedQuary)
    })
    setData(filteredData)
  }

  const contains = (name, query) =>{
      if (name.name.includes(query)){
         return true;
      }
     
    else{
      return false;
    } 
  }

 

  const getReviews=(id)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/getcurrentreview', requestOptions)
      .then(response => response.json())
      .then(result => {
        setReview_data(result[0])
      })
      .catch(error => console.log('error', error));
  }

  useFocusEffect(
    useCallback(()=>{
      requestUserPermission()
      NotificationListener()
      if(global.markers_data.length > 0){       
        setmarkers_data(global.markers_data)
        drawRoute(global.markers_data)
      }
      
      
    
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
        if(onRoute && time > 5 || 0) startRouting( global.user_location)
        else setOnRoute(false)
      }
         )
      }
      getPermissions();
      getAllObjects()
      watch()
      getAllCategories()


    },[])
  )

  

  const startRouting = (user_location) =>{
    let new_arr = [{"point":user_location}, ...markers_data]
    drawRoute(new_arr)
    setOnRoute(true)
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
        setData(result)
        setFullData(result)

      })
      .catch(error => console.log('error', error));

  }
  
  const removeItem = (id) => {
    const filteredData = markers_data.filter((item) => item.id !== id);
    setmarkers_data(filteredData);
    drawRoute(filteredData)
  };

    const handleSheetChanges = useCallback(index =>{
      bottomSheetRef.current?.present()
    })

  function addToFlatlist(id, altitude, longitute, name) {
    
    var arr1 = [...markers_data, { "id": id, "point": { longitude: parseFloat(altitude), latitude: parseFloat(longitute) }, "name": name }]
    global.markers_data = arr1
    setmarkers_data(arr1)
    drawRoute(arr1)
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

  const getObjectsByCategory=(category_id)=>{
    if(!clickedCat){
      console.log('click')
      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "category": category_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/getallobjectsbycategory', requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(result)
        setFullData(result)
      })
      .catch(error => console.log('error', error));
      setClickedCat(true)
    }
    else {
      setClickedCat(false)
      getAllObjects()
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
                   
                      global.object_id = val.id, 
                      global.object_altitude = val.altitude, 
                      global.object_longitute = val.longitute, 
                      global.object_name = val.name, 
                      global.object_address = val.address, 
                      global.object_working_time = val.working_time, 
                      global.object_image = val.image, 
                      global.object_website = val.website, 
                      global.object_phone = val.phone, 
                      global.object_monday = val.monday, 
                      global.object_tuesday = val.tuesday, 
                      global.object_wednesday = val.wednesday, 
                      global.object_thursday = val.thursday, 
                      global.object_friday = val.friday, 
                      global.object_saturday = val.saturday, 
                      global.object_sunday = val.sunday, 
                      global.object_rating = val.rating
                      getReviews(global.object_id)
                      handleSheetChanges()
                  }
                  }
                  coordinate={{ latitude: parseFloat(val.longitute), longitude: parseFloat(val.altitude) }}
                  
                >
                  <View style={{width:70,height:70,  alignItems:'center'}}>
                  <Image source={require('../assets/images/markerBack.png')} style={styles.markerBack}/>
                  <Image source={{uri: val.image}}style={styles.markerImage}></Image>
                  </View>
                </Marker>

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
      

        <View style={styles.searchContainer}>

         <Image source={require('../assets/images/searchBack.png')} style={[styles.searchContainer, styles.searchBack]}/>
         <Pressable
        
        onPress={() => setModalVisible(true)}>
        <Image style={styles.openModal}source={require('../assets/images/filter.png')}/>
      </Pressable>

        <TextInput
            placeholder="Поиск"
            style={styles.searchInput}
            placeholderTextColor={COLORS.black}
            selectionColor={COLORS.black}
            clearButtonMode="always"
            autoCorrect={false}
            onChangeText={(query) => handleSearch(query)}
            value= {searchQuery}
            className= "w-full text-2xl border-solid rounded-b-2xl "
          >
            
          </TextInput>

      

         

        

        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={{top:90, left:widthPercentageToDP(2)}}>
          <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image source={require('../assets/images/cross.png')} style={styles.cross}/>
            </Pressable>
          <FlatList
          data={categories}
          vertical={false}
          numColumns={3}
          contentContainerStyle={{ alignSelf: 'flex-start',zIndex:-1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ }}
          renderItem={({ item }) => (

            <TouchableOpacity style={{height:30}} className="rounded-2xl" onPress={()=>{getObjectsByCategory(item.id)}}>
            <View style={{backgroundColor:COLORS.white, height:30, marginEnd:5, marginBottom:5, borderRadius:heightPercentageToDP(1.5), borderWidth:1}}>
                
                <Text style={{margin:2, marginHorizontal:10, color:COLORS.black, fontFamily:'SemiBold', fontSize:heightPercentageToDP(1.5)}}>
                    {item.name}
                </Text>
                <View>
    
                </View>
            </View>
        </TouchableOpacity>
          )}

        />
           
          </View>
        </View>
      </Modal>
     
        

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
          style={{backgroundColor:COLORS.white}}
          >

           
          <View style={{}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.objectName}> {global.object_name} </Text>
          <TouchableOpacity style={{position:'absolute',
    marginLeft:widthPercentageToDP(90), marginTop:heightPercentageToDP(1)}}onPress={() => { addToFavor()}}>
              <Image source={require('../assets/images/like.png')} style={styles.like}/>
            </TouchableOpacity>
            </View>
         
                      
            
          
            <View style={{flexDirection:'row', marginLeft:widthPercentageToDP(3), marginTop:heightPercentageToDP(1)}}>
            <Image source={require('../assets/images/mapIcon.png')} style={styles.mapIcon}/>
            <Text style={styles.addres}> { global.object_address} </Text>
            </View>
            <Image source={{uri: global.object_image}} style={{width:140,height:120, borderRadius:heightPercentageToDP(1.5), marginTop:heightPercentageToDP(1), marginLeft:widthPercentageToDP(2)}}/>
            <RatingBar
          initialRating={global.object_rating}
          direction="horizontal"
          allowHalfRating
          itemCount={5}
          itemPadding={4}
          ignoreGestures={true}
          style={{marginTop:heightPercentageToDP(4), marginLeft:widthPercentageToDP(2)}}
          ratingElement={{
            full: <Icon name="star-rate" color="#54D3C2" size={40} />,
            half: <Icon name="star-half" color="#54D3C2" size={40} />,
            empty: <Icon name="star-border" color="#54D3C2" size={40} />,
          }}
        />
            
            
            
          <ScrollView
          horizontal={true}
          style={{marginTop:heightPercentageToDP(2)}}

          >
            <TouchableOpacity onPress={() => { navigate('Все отзывы');}}>
              <Image source={require('../assets/images/allComments.png')} style={styles.comment}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { addToFlatlist(global.object_id, global.object_altitude, global.object_longitute, global.object_name) }}>
            <Image source={require('../assets/images/select.png')} style={styles.addPlace}/>

            </TouchableOpacity>

            <TouchableOpacity onPress={{}}>
            <Image source={require('../assets/images/phone.png')} style={styles.phone}/>

            </TouchableOpacity>
            <TouchableOpacity onPress={{}}>
            <Image source={require('../assets/images/site.png')} style={styles.site}/>

            </TouchableOpacity>
            {/* <Text> {  global.object_phone} </Text>
            <Text> { global.object_website} </Text> */}
</ScrollView>
           

            <FlatList
            
          data={review_data}
          horizontal={true}
          contentContainerStyle={{ width:'100%',height:150 }}
       
          renderItem={({ item, index }) => (

            <Review 
              user={item.user}
              object={item.object}
              comment={item.comment}
              mark={item.mark}
              image1={item.image1}
              image2={item.image2}
              image3={item.image3}
              data={item.data} 
              />
          )}

        />
            


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
                   
                      global.object_id = val.id, 
                      global.object_altitude = val.altitude, 
                      global.object_longitute = val.longitute, 
                      global.object_name = val.name, 
                      global.object_address = val.address, 
                      global.object_working_time = val.working_time, 
                      global.object_image = val.image, 
                      global.object_website = val.website, 
                      global.object_phone = val.phone, 
                      global.object_monday = val.monday, 
                      global.object_tuesday = val.tuesday, 
                      global.object_wednesday = val.wednesday, 
                      global.object_thursday = val.thursday, 
                      global.object_friday = val.friday, 
                      global.object_saturday = val.saturday, 
                      global.object_sunday = val.sunday, 
                      global.object_rating = val.rating
                      getReviews(global.object_id)
                      handleSheetChanges()
                  }
                  }
                  coordinate={{ latitude: parseFloat(val.longitute), longitude: parseFloat(val.altitude) }}
                  
                >
                  <View style={{width:70,height:70,  alignItems:'center'}}>
                  <Image source={require('../assets/images/markerBack.png')} style={styles.markerBack}/>
                  <Image source={{uri: val.image}}style={styles.markerImage}></Image>
                  </View>
                </Marker>

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
           <TouchableOpacity style={{ position:'absolute' ,top: 90,backgroundColor:COLORS.black,right:10, padding:10,borderRadius:heightPercentageToDP(1.5)}} onPress={()=>{setmarkers_data([]); drawRoute([]);global.markers_data=[]}}>
            <Text style={{color:COLORS.white}}>
              очистить
            </Text>
          </TouchableOpacity>

        <View style={{ position: 'absolute',bottom:30}} className="flex-row ">

       

        

        <TouchableOpacity
        onPress={()=>{startRouting(global.user_location);global.route_type='WALKING' 
        }}
        className="rounded-lg" style={{marginLeft:widthPercentageToDP(2)}}> 
                    <Image source={require('../assets/images/goLeg.png')}/>

        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{startRouting(global.user_location); global.route_type='DRIVING' 
        }}
        className="rounded-lg" style={{marginLeft:widthPercentageToDP(1)}}> 
                    <Image source={require('../assets/images/goCar.png')}/>

        </TouchableOpacity>
<TouchableOpacity 
        onPress={()=>{
          global.route_to_publicate = routing
          global.waypointNames = markers_data
          navigate('Создать публикацию')
        }}
        className="rounded-lg" style={{ marginLeft:widthPercentageToDP(1)}}>
          <Image source={require('../assets/images/add.png')}/>
        </TouchableOpacity>
        
        </View>
       


        <View style={styles.searchContainer}>

         <Image source={require('../assets/images/searchBack.png')} style={[styles.searchContainer, styles.searchBack]}/>
         <Pressable
        
        onPress={() => setModalVisible(true)}>
        <Image style={styles.openModal}source={require('../assets/images/filter.png')}/>
      </Pressable>

        <TextInput
            placeholder="Поиск"
            style={styles.searchInput}
            placeholderTextColor={COLORS.black}
            selectionColor={COLORS.black}
            clearButtonMode="always"
            autoCorrect={false}
            onChangeText={(query) => handleSearch(query)}
            value= {searchQuery}
            className= "w-full text-2xl border-solid rounded-b-2xl "
          >
            
          </TextInput>

      

         

        

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
 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={{top:90, left:widthPercentageToDP(2)}}>
          <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image source={require('../assets/images/cross.png')} style={styles.cross}/>
            </Pressable>
          <FlatList
          data={categories}
          vertical={false}
          numColumns={3}
          contentContainerStyle={{ alignSelf: 'flex-start',zIndex:-1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ }}
          renderItem={({ item }) => (

            <TouchableOpacity style={{height:30}} className="rounded-2xl" onPress={()=>{getObjectsByCategory(item.id)}}>
            <View style={{backgroundColor:COLORS.white, height:30, marginEnd:5, marginBottom:5, borderRadius:heightPercentageToDP(1.5), borderWidth:1}}>
                
                <Text style={{margin:2, marginHorizontal:10, color:COLORS.black, fontFamily:'SemiBold', fontSize:heightPercentageToDP(1.5)}}>
                    {item.name}
                </Text>
                <View>
    
                </View>
            </View>
        </TouchableOpacity>
          )}

        />
           
          </View>
        </View>
      </Modal>

      <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          style={{backgroundColor:COLORS.white}}
          >

           
          <View style={{}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.objectName}> {global.object_name} </Text>
          <TouchableOpacity style={{position:'absolute',
    marginLeft:widthPercentageToDP(90), marginTop:heightPercentageToDP(1)}}onPress={() => { addToFavor()}}>
              <Image source={require('../assets/images/like.png')} style={styles.like}/>
            </TouchableOpacity>
            </View>
         
                      
            
          
            <View style={{flexDirection:'row', marginLeft:widthPercentageToDP(3), marginTop:heightPercentageToDP(1)}}>
            <Image source={require('../assets/images/mapIcon.png')} style={styles.mapIcon}/>
            <Text style={styles.addres}> { global.object_address} </Text>
            </View>
            <Image source={{uri: global.object_image}} style={{width:140,height:120, borderRadius:heightPercentageToDP(1.5), marginTop:heightPercentageToDP(1), marginLeft:widthPercentageToDP(2)}}/>
            <RatingBar
          initialRating={global.object_rating}
          direction="horizontal"
          allowHalfRating
          itemCount={5}
          itemPadding={4}
          ignoreGestures={true}
          style={{marginTop:heightPercentageToDP(4), marginLeft:widthPercentageToDP(2)}}
          ratingElement={{
            full: <Icon name="star-rate" color="#54D3C2" size={40} />,
            half: <Icon name="star-half" color="#54D3C2" size={40} />,
            empty: <Icon name="star-border" color="#54D3C2" size={40} />,
          }}
        />
            
            
            
          <ScrollView
          horizontal={true}
          style={{marginTop:heightPercentageToDP(2)}}

          >
            <TouchableOpacity onPress={() => { navigate('Все отзывы');}}>
              <Image source={require('../assets/images/allComments.png')} style={styles.comment}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { addToFlatlist(global.object_id, global.object_altitude, global.object_longitute, global.object_name) }}>
            <Image source={require('../assets/images/select.png')} style={styles.addPlace}/>

            </TouchableOpacity>

            <TouchableOpacity onPress={{}}>
            <Image source={require('../assets/images/phone.png')} style={styles.phone}/>

            </TouchableOpacity>
            <TouchableOpacity onPress={{}}>
            <Image source={require('../assets/images/site.png')} style={styles.site}/>

            </TouchableOpacity>
            {/* <Text> {  global.object_phone} </Text>
            <Text> { global.object_website} </Text> */}
</ScrollView>
           

            <FlatList
            
          data={review_data}
          horizontal={true}
          contentContainerStyle={{ width:'100%',height:150 }}
       
          renderItem={({ item, index }) => (

            <Review 
              user={item.user}
              object={item.object}
              comment={item.comment}
              mark={item.mark}
              image1={item.image1}
              image2={item.image2}
              image3={item.image3}
              data={item.data} 
              />
          )}

        />
            


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
            markers_data.map((val, index) => {

              return (

                <Marker
                key={val.id}
                coordinate={{ latitude: val.point.latitude, longitude: val.point.longitude }}

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
                 }}
              />
        </MapView>
        <TouchableOpacity style={{ position:'absolute' ,top: 250,backgroundColor:'green',right:120}} onPress={()=>{setmarkers_data([]); global.markers_data=[]; setOnRoute(false); drawRoute([])}}>
            <Text>
             Отмена
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

            <TouchableOpacity>

              <SelectedMarker id={index + 1} altitude={item.altitude} longitute={item.longitute} name={item.name} />

            </TouchableOpacity>
          )}

        />

      </BottomSheetModalProvider>

    )
  }
   

}



const styles = StyleSheet.create({

  marker:{
    backgroundColor:COLORS.black
  },
  markerImage:{
    width:35,
    height:35,
    borderRadius:35,
    top:1
  },
  markerBack:{
    width:70,
    height:70,
    position:'absolute',
   
  },
  searchContainer:{
    position:'absolute',
    width:widthPercentageToDP(96),
    height:heightPercentageToDP(6.6),
        left:widthPercentageToDP(2),
    top:heightPercentageToDP(0.7)
  },
  searchBack:{
    left:0
  },
  openModal:{
    left:widthPercentageToDP(84),
    top:heightPercentageToDP(1.7),
    width:heightPercentageToDP(4.5),
    height:heightPercentageToDP(4.5)
  },
  searchInput:{
    fontFamily:'SemiBold',
    fontSize:heightPercentageToDP(1.8),
    left:widthPercentageToDP(6),
    textAlignVertical:'center',
    top:heightPercentageToDP(-2),
    width:widthPercentageToDP(71),
    height:heightPercentageToDP(3)
  },
  cross:{
    width:24,
    height:24,
    marginLeft:widthPercentageToDP(70)
  },
  objectName:{
    fontFamily:'ExtraBold',
    fontSize:heightPercentageToDP(3),
    marginLeft:widthPercentageToDP(2)
  },
  like:{
    width:23,
    height:20,
    
  },
  addres:{
    fontFamily:'SemiBold',
    fontSize:heightPercentageToDP(1.4),
    width:widthPercentageToDP(90),
    marginLeft:5
  },
  mapIcon:{
    width:20,
    height:23
  }, 
  comment:{
    marginLeft:widthPercentageToDP(2),
    width:172,
    height:35
  },
  addPlace:{
    marginLeft:widthPercentageToDP(1),
    width:135,
    height:35
  },
  phone:{
    marginLeft:widthPercentageToDP(1),
    width:35,
    height:35
  },
  site:{
    marginLeft:widthPercentageToDP(1),
    width:35,
    height:35
  }

})