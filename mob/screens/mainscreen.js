import { FlatList, Button, TextInput, Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useEffect, useCallback, useMemo, useRef, useState, createRef } from 'react';
import { MagnifyingGlassCircleIcon } from 'react-native-heroicons/solid'
import YaMap, { Marker, Polyline, RoutesFoundEvent } from 'react-native-yamap';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ip_address } from '../config';
import * as Location from 'expo-location';
import SelectedMarker from '../components/map/selectedMarker';




YaMap.init('4dcbaad2-be4e-4626-9b1a-a7c4b15ca00b')
YaMap.setLocale('ru_Ru')



export default function UserMainScreen() {


  const [routing, setRouting] = useState([])


  const [markers_data, setmarkers_data] = useState([])
  const [user_location, set_user_location] = useState([])
  const [location, setLocation] = useState({ "coords": { "accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 53.4186, "longitude": 59.0472, "speed": 0 }, "mocked": false, "timestamp": 1708581410459 });

  const [selectedMarkerData, setSelectedMarkerData] = useState({});
  const [search, setSearch] = useState();
  const [data, setData] = useState([])

  map = createRef(YaMap);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['20%', '50%', '100%'], []);


  Location.watchPositionAsync()

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

    const watch = async() => {
       let subs = await Location.watchPositionAsync(
      {accuracy: Location.Accuracy.Highest,
      distanceInterval:1,
      },
      (location)=>{
      const {coords} = location;
      const {latitude,longitude} = coords
      }
       )
    }

   
    
    getPermissions();
    getAllObjects()
    watch()

  }, []);

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

      })
      .catch(error => console.log('error', error));

  }


  const removeItem = (id) => {

    const filteredData = markers_data.filter((item) => item.id !== id);
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

  const onChangeText = async (text) => {
    setSearch(text)
    console.log('get data: ', search)
    if (text.length === 0) return setData([]);
    if (text.length > 2) {

    }
  }

  function handleSheetChanges() {
    bottomSheetRef.current?.present()
  }

  function addToFlatlist(id, altitude, longitute, name) {
    var arr1 = [...markers_data, { "id": id, "point": { lon: parseFloat(altitude), lat: parseFloat(longitute) }, "name": name }]
    setmarkers_data(arr1)
    drawRoute(arr1)
  }

  function drawRoute(points) {
    if (points.length > 1) {
      let route_points = []
      points.map((val, index) => { route_points.push(val.point) })
      this.map.current.findRoutes(route_points, ['car'], function (a) {
        const arr = [];
        a.routes[0].sections.forEach(section =>
          section.points.forEach(point => arr.push(point)),
        );
        setRouting(arr);
        console.error(arr)
      })
    }

  }



  if (markers_data.length == 0) {
    return (
      <BottomSheetModalProvider style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>


        <YaMap
          ref={this.map}
          showUserPosition
          followUser
          initialRegion={{
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            zoom: 1,
            azimuth: 80,
            tilt: 100
          }}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >
          <Polyline points={routing} strokeColor={'red'} strokeWidth={4} />

          {
            data.map((val, index) => {

              return (

                <Marker
                  onPress={() => {
                    console.log(val.address);
                    setDataToBottomSheet(val.id, val.altitude, val.longitute, val.name, val.address, val.working_time, val.image, val.website, val.phone);
                    handleSheetChanges()
                  }
                  }
                  point={{ lat: parseFloat(val.longitute), lon: parseFloat(val.altitude) }}

                />




              )
            })
          }



        </YaMap>

        <View style={{
          backgroundColor: 'white', top: 40, height: widthPercentageToDP(10),
          width: widthPercentageToDP(80), alignSelf: 'center', position: 'absolute'
        }} className="rounded-full">

          <View style={{
            top: 5, left: 10, height: widthPercentageToDP(8),
            width: widthPercentageToDP(60), position: 'absolute'
          }} className="rounded-full">
            <TextInput style={{ left: 10, width: widthPercentageToDP(50), top: 1 }} placeholder='Поиск...' value={search} onChangeText={onChangeText} />
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
  else {
    return (
      <BottomSheetModalProvider style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>


        <YaMap
          ref={this.map}
          showUserPosition
          followUser
          initialRegion={{
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            zoom: 1,
            azimuth: 80,
            tilt: 100
          }}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >

          <Polyline points={routing} strokeColor={'red'} strokeWidth={4} />

          {
            data.map((val, index) => {

              return (

                <Marker
                  onPress={() => {
                    console.log(val.address);
                    setDataToBottomSheet(val.id, val.altitude, val.longitute, val.name, val.address, val.working_time, val.image, val.website, val.phone);
                    handleSheetChanges()
                  }
                  }
                  point={{ lat: parseFloat(val.longitute), lon: parseFloat(val.altitude) }}

                />


              )
            })
          }

        </YaMap>

        <TouchableOpacity className="rounded-lg" style={{ width: 120, height: 50, backgroundColor: 'red', position: 'absolute', top: 320 }}>
          <Text>
            Создать публикацию
          </Text>
        </TouchableOpacity>


        <TouchableOpacity className="rounded-lg" style={{ width: 120, height: 50, backgroundColor: 'red', position: 'absolute' }}>
          <Text>
            В путь
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
            <TextInput style={{ left: 10, width: widthPercentageToDP(50), top: 1 }} placeholder='Поиск...' value={search} onChangeText={onChangeText} />
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