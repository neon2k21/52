import { useCallback, useEffect,useState } from "react"
import { FlatList, Text, TouchableOpacity, View,Image } from "react-native"
import MapView from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { ip_address } from "../../config"
import { useFocusEffect, useNavigation } from "@react-navigation/core"
import { HeartIcon,ChatBubbleBottomCenterIcon } from "react-native-heroicons/outline"

const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"


export default function PublicationCard(props){

  const {

    id, 
    useradd, 
    name, 
    points_names,
    review, 
    likes_count, 
    comments_count,
    checked, 
    image1, 
    image2, 
    image3,
    startpoint,
    endpoint,
    waypoint1,
    waypoint2,
    waypoint3,
    waypoint4,
    waypoint5,
    waypoint6,
    waypoint7,
    waypoint8,
    object_id_startPoint,
    object_id_EndPoint,
    object_id_waypoint1,
    object_id_waypoint2,
    object_id_waypoint3,
    object_id_waypoint4,
    object_id_waypoint5,
    object_id_waypoint6,
    object_id_waypoint7,
    object_id_waypoint8,
    tag_1,
    tag_2,
    tag_3,
    tag_4,
    tag_5,
    tag_6,
    tag_7

    } = props
    
    const {navigate} = useNavigation()
    const [images, setImages] = useState([{uri: `data:image/jpeg;base64,`},{uri: `data:image/jpeg;base64,`},{uri: `data:image/jpeg;base64,`}])
    const [distance, setDistance] = useState("")
    const [time, setTime]= useState("")
    const [likes,setLikes] = useState(likes_count)
    
    const [Filters, setFilters] = useState([])
    const [allFilters, setAllFilters] = useState([])

    const setPubFilters=()=>{
      let pt = []
      if(global.allFilters[0].id==tag_1) pt.push(global.allFilters[0].name)
      if(global.allFilters[1].id==tag_2) pt.push(global.allFilters[1].name)
      if(global.allFilters[2].id==tag_3) pt.push(global.allFilters[2].name)
      if(global.allFilters[3].id==tag_4) pt.push(global.allFilters[3].name)
      if(global.allFilters[4].id==tag_5) pt.push(global.allFilters[4].name)
      if(global.allFilters[5].id==tag_6) pt.push(global.allFilters[5].name)
      if(global.allFilters[6].id==tag_7) pt.push(global.allFilters[6].name)
      setFilters(pt)
    }

    const getAllFilters=()=>{
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(ip_address + '/getAllfilters', requestOptions)
          .then(response => response.json())
          .then(result => {setAllFilters(result); global.allFilters=result})
          .catch(error => console.log('error', error));
          setPubFilters()
    }


    let name_start = ''
    let name_end = ''
    let name_w1 = ''
    let name_w2 = ''
    let name_w3 = ''
    let name_w4 = ''
    let name_w5 = ''
    let name_w6 = ''
    let name_w7 = ''
    let name_w8 = ''


    const [waypointArr, setWaypointsArr] = useState([])


   

    const convertNames = () =>{
      let arr = points_names.split(',')
      if(arr.length == 2) {
        name_start = arr[0]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 3) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 4) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 5) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_w3 = arr[3]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 6) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_w3 = arr[3]
        name_w4 = arr[4]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 7) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_w3 = arr[3]
        name_w4 = arr[4]
        name_w5 = arr[5]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 8) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_w3 = arr[3]
        name_w4 = arr[4]
        name_w5 = arr[5]
        name_w6 = arr[6]
        name_end = arr[arr.length-1]
      }
      if(arr.length == 9) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_w3 = arr[3]
        name_w4 = arr[4]
        name_w5 = arr[5]
        name_w6 = arr[6]        
        name_w7 = arr[7]        
        name_end = arr[arr.length-1]
      }
      if(arr.length == 10) {
        name_start = arr[0]
        name_w1 = arr[1]
        name_w2 = arr[2]
        name_w3 = arr[3]
        name_w4 = arr[4]
        name_w5 = arr[5]
        name_w6 = arr[6]        
        name_w7 = arr[7] 
        name_w8 = arr[8] 
        name_end = arr[arr.length-1]
      }
    }


    const pressLike=()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "useradd": global.user_id,
          "publication_id": id
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/putlikepublication', requestOptions)
          .then(response => response.json())
          .then(result => {
            getCurrentPub()
          })
          .catch(error => console.log('error', error));
    }

    const getCurrentPub=()=>{
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
  
      fetch(ip_address + '/getCurrentPub', requestOptions)
        .then(response => response.json())
        .then(result => {
        setLikes(result[0].likes_count)
        })
        .catch(error => console.log('error', error));
    }

   

    useFocusEffect(useCallback(()=>{
        convertWaypointToArray()
        putImagesToArray()
        getAllFilters()
        
    },[]))
    
    useEffect(()=>{
      setLikes(likes_count)
    },[])
 

    const putImagesToArray =()=>{
      let arr = []
      arr.push({uri: `data:image/jpeg;base64,${JSON.parse(image1)}`})
      arr.push({uri: `data:image/jpeg;base64,${JSON.parse(image2)}`})
      arr.push({uri: `data:image/jpeg;base64,${JSON.parse(image3)}`})
      setImages(arr)
    }



    const prepareToRoute = ()=>{
      convertNames()
      let arr = []
      arr.push({ 
        "id": object_id_startPoint, 
        "point": { longitude: JSON.parse(startpoint).longitude, latitude: JSON.parse(startpoint).latitude }, 
        "name":  name_start
      
      })
      if( object_id_waypoint1!==0) 
      arr.push({ 
        "id": object_id_waypoint1, 
        "point": { longitude: JSON.parse(waypoint1).longitude, latitude: JSON.parse(waypoint1).latitude }, 
        "name":  name_w1
      })
      if( object_id_waypoint2!==0) 
      arr.push({ 
        "id": object_id_waypoint2, 
        "point": { longitude: JSON.parse(waypoint2).longitude, latitude: JSON.parse(waypoint2).latitude }, 
        "name":  name_w2
      })
      if( object_id_waypoint3!==0) 
      arr.push({ 
        "id": object_id_waypoint3, 
        "point": { longitude: JSON.parse(waypoint3).longitude, latitude: JSON.parse(waypoint3).latitude }, 
        "name":  name_w3
      })
      if( object_id_waypoint4!==0) 
      arr.push({ 
        "id": object_id_waypoint4, 
        "point": { longitude: JSON.parse(waypoint4).longitude, latitude: JSON.parse(waypoint4).latitude }, 
        "name":  name_w4
      })
      if( object_id_waypoint5!==0) 
      arr.push({ 
        "id": object_id_waypoint5, 
        "point": { longitude: JSON.parse(waypoint5).longitude, latitude: JSON.parse(waypoint5).latitude }, 
        "name":  name_w5
      })
      if( object_id_waypoint6!==0) 
      arr.push({ 
        "id": object_id_waypoint6, 
        "point": { longitude: JSON.parse(waypoint6).longitude, latitude: JSON.parse(waypoint6).latitude }, 
        "name":  name_w6
      })
      if( object_id_waypoint7!==0) 
      arr.push({ 
        "id": object_id_waypoint7, 
        "point": { longitude: JSON.parse(waypoint7).longitude, latitude: JSON.parse(waypoint7).latitude }, 
        "name":  name_w7
       })
      if( object_id_waypoint8!==0) 
      arr.push({ 
        "id": object_id_waypoint8, 
        "point": { longitude: JSON.parse(waypoint8).longitude, latitude: JSON.parse(waypoint8).latitude }, 
        "name":  name_w8
      })
      arr.push({ 
        "id": object_id_EndPoint, 
        "point": { longitude: JSON.parse(endpoint).longitude, latitude: JSON.parse(endpoint).latitude }, 
        "name":  name_end
      
      })

      global.markers_data = arr
    }




    const convertWaypointToArray = () =>{
        const arr = []
        if( object_id_waypoint1!==0) arr.push(JSON.parse(waypoint1))
        if( object_id_waypoint2!==0) arr.push(JSON.parse(waypoint2))
        if( object_id_waypoint3!==0) arr.push(JSON.parse(waypoint3))
        if( object_id_waypoint4!==0) arr.push(JSON.parse(waypoint4))
        if( object_id_waypoint5!==0) arr.push(JSON.parse(waypoint5))
        if( object_id_waypoint6!==0) arr.push(JSON.parse(waypoint6))
        if( object_id_waypoint7!==0) arr.push(JSON.parse(waypoint7))
        if( object_id_waypoint8!==0) arr.push(JSON.parse(waypoint8))
        setWaypointsArr(arr)
    }
    if(images[0].uri!="data:image/jpeg;base64,"){
      return(
        <View style={{width:'100%', backgroundColor:'red'}} className="rounded-2xl">
            <Text className="text-2xl">
                {name}
            </Text>
            <Text>
              Теги
            </Text>
            
            <FlatList
            data={Filters}
            vertical={true} 
            numColumns={3}       
            renderItem={({item})=> ( 
                
              <TouchableOpacity style={{height:30}} className="rounded-2xl">
              <View className="rounded-2xl flex-row" style={{backgroundColor:'green', height:30}}>
                  <View className="rounded-full" style={{backgroundColor:'white',width:24,height:24}}>
                          <Text>
                             
                          </Text>
                  </View>
                  <Text style={{margin:2}}>
                      {item}
                  </Text>
                  <View>
      
                  </View>
              </View>
          </TouchableOpacity>
               
            )}
            
            />
            <Text>
                Описание: {review}
            </Text>
            <Text>
               Основные точки маршрута: {points_names}
            </Text>
            <Text>
               Длительность маршрута: {distance} км.
            </Text>
            <Text>
              Время прохождения маршрута: {time} 
            </Text>
            
            
            
          
            <MapView
                    initialRegion={{
                      latitude: 53.407163, 
                      longitude: 58.980291,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    showsPointsOfInterest={false}
                    showsIndoors={false}
                    toolbarEnabled={false}
                    showsUserLocation
                    mapType='terrain'        
                    style={{width: '100%', height: '25%',borderRadius:100,padding:10 }}
                    className="rounded-2xl"
                  >
                      
                    <MapViewDirections
                          origin={JSON.parse(startpoint)}
                          waypoints={waypointArr}
                          destination={JSON.parse(endpoint)}
                          apikey={GOOGLE_MAPS_APIKEY}
                          onReady={result=>{
                            setDistance(result.distance)
                            setTime(result.duration)
                            if(result.distance == "") setOnRoute(false)
                            }}
                        />
                </MapView>
                     
                        
                        
                        <FlatList
                        data={images}
                        extraData={images}
                        horizontal={true}
                        contentContainerStyle={{backgroundColor:'gray',paddingHorizontal:10}}       
                        renderItem={({item,index})=> (
                                    
                            <Image style={{width: 200, height: 150}} source={{uri: item.uri}} className="rounded-xl"/>
                      
                        )}
                        />
                        <View className="flex-row">
                        <View className="flex-row" style={{paddingHorizontal:10}}>
                              <Text>
                              {likes}
                                </Text>
                              <TouchableOpacity onPress={()=>{pressLike()}}>
                             
                                 <HeartIcon size={24} color={'black'}/>
                              </TouchableOpacity>
                        </View>
                        <View className="flex-row" style={{paddingHorizontal:10}}>
                              <Text>
                              {comments_count}
                                </Text>
                               <TouchableOpacity onPress={()=>{global.pub_id = id; navigate('Комментарии') }}>
                           <ChatBubbleBottomCenterIcon color={'black'} size={24}/>
                         </TouchableOpacity>  
                              
                        </View>
             
             
                         <TouchableOpacity onPress={()=>{prepareToRoute(); navigate('Карта')}}>
                           <Text>
                             перейти к маршруту
                           </Text>
                         </TouchableOpacity>
                        </View>
                        
             
                              
        </View>
    )
    }
    else {
      return(
        <View style={{width:'100%', backgroundColor:'red'}} className="rounded-2xl">
            <Text className="text-2xl">
                {name}
            </Text>
            <Text>
              Теги
            </Text>
            
            <FlatList
            data={Filters}
            vertical={true} 
            numColumns={3}       
            renderItem={({item})=> ( 
                
              <TouchableOpacity style={{height:30}} className="rounded-2xl">
              <View className="rounded-2xl flex-row" style={{backgroundColor:'green', height:30}}>
                  <View className="rounded-full" style={{backgroundColor:'white',width:24,height:24}}>
                          <Text>
                             
                          </Text>
                  </View>
                  <Text style={{margin:2}}>
                      {item}
                  </Text>
                  <View>
      
                  </View>
              </View>
          </TouchableOpacity>
               
            )}
            
            />
            <Text>
                Описание: {review}
            </Text>
            <Text>
               Основные точки маршрута: {points_names}
            </Text>
            <Text>
               Длительность маршрута: {distance} км.
            </Text>
            <Text>
              Время прохождения маршрута: {time} 
            </Text>
            
            
            
          
            <MapView
                    initialRegion={{
                      latitude: 53.407163, 
                      longitude: 58.980291,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    showsPointsOfInterest={false}
                    showsIndoors={false}
                    toolbarEnabled={false}
                    showsUserLocation
                    mapType='terrain'        
                    style={{width: '100%', height: '25%',borderRadius:100,padding:10 }}
                    className="rounded-2xl"
                  >
                      
                    <MapViewDirections
                          origin={JSON.parse(startpoint)}
                          waypoints={waypointArr}
                          destination={JSON.parse(endpoint)}
                          apikey={GOOGLE_MAPS_APIKEY}
                          onReady={result=>{
                            setDistance(result.distance)
                            setTime(result.duration)
                            if(result.distance == "") setOnRoute(false)
                           }}
                        />
                </MapView>
                     
                        
                        
                        
                        <View className="flex-row">
                        <View className="flex-row" style={{paddingHorizontal:10}}>
                              <Text>
                              {likes}
                                </Text>
                              <TouchableOpacity onPress={()=>{pressLike()}}>
                             
                                 <HeartIcon size={24} color={'black'}/>
                              </TouchableOpacity>
                        </View>
                        <View className="flex-row" style={{paddingHorizontal:10}}>
                              <Text>
                              {comments_count}
                                </Text>
                               <TouchableOpacity onPress={()=>{global.pub_id = id; navigate('Комментарии') }}>
                           <ChatBubbleBottomCenterIcon color={'black'} size={24}/>
                         </TouchableOpacity>  
                              
                        </View>
             
             
                         <TouchableOpacity onPress={()=>{prepareToRoute(); navigate('Карта')}}>
                           <Text>
                             перейти к маршруту
                           </Text>
                         </TouchableOpacity>
                        </View>
                        
             
                              
        </View>
    )
    }
}