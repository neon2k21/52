import { useCallback, useEffect,useState } from "react"
import { FlatList, Text, TouchableOpacity, View,Image, StyleSheet } from "react-native"
import MapView from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { ip_address } from "../../config"
import { useFocusEffect, useNavigation } from "@react-navigation/core"
import { HeartIcon,ChatBubbleBottomCenterIcon } from "react-native-heroicons/outline"
import Tag from "./tag"
import { COLORS } from "../../color"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"

const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"

const filters = [
  {"id": 1, "name": "природа"}, 
  {"id": 2, "name": "еда"}, 
  {"id": 3, "name": "достопримечательности"}, 
  {"id": 4, "name": "на машине"}, 
  {"id": 5, "name": "пеший"}, 
  {"id": 6, "name": "развлечения"}, 
  {"id": 7, "name": "семейный"}]


export default function PublicationCard(props){

  const {

    id, 
    image,
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

    const setPubFilters=()=>{
      let pt = []
      if(tag_1!=0) pt.push(filters[0].name)
      if(tag_2!=0) pt.push(filters[1].name)
      if(tag_3!=0) pt.push(filters[2].name)
      if(tag_4!=0) pt.push(filters[3].name)
      if(tag_5!=0) pt.push(filters[4].name)
      if(tag_6!=0) pt.push(filters[5].name)
      if(tag_7!=0) pt.push(filters[6].name)
      setFilters(pt)
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
    },[]))
    
    useEffect(()=>{
      setPubFilters()
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
        <View style={styles.container} >
            
            <Text style={styles.nick}>
                {name}
            </Text>
            
            
            <FlatList
            data={Filters}
            vertical={true} 
            numColumns={3}       
            renderItem={({item})=> ( 
                
              
              <Tag name={item}></Tag>
               
            )}
            
            />
           
            
            
            
         
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
                    style={styles.map}
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
                <Text style={styles.description}>
                {review}
            </Text>
                     
                        
                        
                        <FlatList
                        data={images}
                        extraData={images}
                        horizontal={true}
                        contentContainerStyle={{paddingHorizontal:10, marginTop:10}}       
                        renderItem={({item,index})=> (
                                    
                            <Image style={{width: heightPercentageToDP(33), height: heightPercentageToDP(27)}} source={{uri: item.uri}} className="rounded-xl"/>
                      
                        )}
                        />
                         
                         <View className="flex-row" style={{marginVertical:8, alignItems:'center'}}>
                        <View className="flex-row" style={{paddingHorizontal:widthPercentageToDP(2)}}>
                          <TouchableOpacity onPress={()=>{pressLike()}}>
                             
                                <Image source={require('../../assets/images/heart.png')} style={styles.like}/>
                              </TouchableOpacity>
                              <Text style={styles.likesNumber}>
                              {likes}
                                </Text>
                              
                        </View>
                        <View className="flex-row" style={{paddingHorizontal:10}}>
                              
                               <TouchableOpacity onPress={()=>{global.pub_id = id; navigate('Комментарии') }}>
                               <Image source={require('../../assets/images/comment.png')} style={styles.comment}/>

                         </TouchableOpacity>  
                              <Text style={styles.likesNumber}>
                              {comments_count}
                                </Text>
                        </View>
             
             
                         <TouchableOpacity onPress={()=>{prepareToRoute(); navigate('Карта')}}>
                         <Image source={require('../../assets/images/goButton.png')} style={styles.go}/>

                         </TouchableOpacity>
                        </View>
                        
             
                              
        </View>
    )
    }
    else {
      return(
        <View style={styles.container} >

            <Text style={styles.nick}>
                {name}
            </Text>
            
            
            <FlatList
            data={Filters}
            vertical={true} 
            numColumns={3}       
            renderItem={({item})=> ( 
                
              
              <Tag name={item}></Tag>
               
            )}
            
            />
           
            
            
            
         
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
                    style={styles.map}
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
                <Text style={styles.description}>
                {review}
            </Text>
                
        
                        
                        
                        <View className="flex-row" style={{marginVertical:8, alignItems:'center'}}>
                        <View className="flex-row" style={{paddingHorizontal:widthPercentageToDP(2)}}>
                          <TouchableOpacity onPress={()=>{pressLike()}}>
                             
                                <Image source={require('../../assets/images/heart.png')} style={styles.like}/>
                              </TouchableOpacity>
                              <Text style={styles.likesNumber}>
                              {likes}
                                </Text>
                              
                        </View>
                        <View className="flex-row" style={{paddingHorizontal:10}}>
                              
                               <TouchableOpacity onPress={()=>{global.pub_id = id; navigate('Комментарии') }}>
                               <Image source={require('../../assets/images/comment.png')} style={styles.comment}/>

                         </TouchableOpacity>  
                              <Text style={styles.likesNumber}>
                              {comments_count}
                                </Text>
                        </View>
             
             
                         <TouchableOpacity onPress={()=>{prepareToRoute(); navigate('Карта')}}>
                         <Image source={require('../../assets/images/goButton.png')} style={styles.go}/>

                         </TouchableOpacity>
                        </View>
                        
             
                              
        </View>
    )
    }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:COLORS.white,
    width:'100%',
    borderRadius:heightPercentageToDP(1.5),
    marginBottom:heightPercentageToDP(1)
  },
  nick:{
      fontFamily:'Black',
      color:COLORS.black,
    marginLeft:widthPercentageToDP(5),
    marginTop:heightPercentageToDP(2),
    fontSize:heightPercentageToDP(1.6)
  },
  description:{
    marginTop:heightPercentageToDP(-11),
    fontFamily:'SemiBold',
    width:widthPercentageToDP(65),
    marginLeft:widthPercentageToDP(2),
    height: widthPercentageToDP(23),
    fontSize:heightPercentageToDP(1.4)
  },
  map:{
    width: '27%', 
    height: widthPercentageToDP(23),
    borderBottomEndRadius:heightPercentageToDP(1.5),
    borderWidth:1,
    marginLeft:widthPercentageToDP(70),
    marginTop:heightPercentageToDP(1),

  },
  like:{
    width:23,
    height:20
  },
  likesNumber:{
    marginLeft:widthPercentageToDP(1.3),
    textAlign:'center',
    fontFamily:'Medium',
    fontSize:heightPercentageToDP(2),
    textAlignVertical:'top',
    height:20

  },
  comment:{
    width:21,
    height:20
  },
  go:{
    width:105,
    height:29,
    marginLeft:widthPercentageToDP(47)
  }
})