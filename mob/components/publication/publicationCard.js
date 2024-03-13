import { useEffect,useState } from "react"
import { FlatList, Text, TouchableOpacity, View,Image } from "react-native"
import MapView from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { ip_address } from "../../config"
import { useNavigation } from "@react-navigation/core"

const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"


export default function PublicationCard(props){

    const [nickname, setNickName] = useState("")
    const {navigate} = useNavigation()
    const [images, setImages] = useState([])

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

    // id: 5,
    // useradd: 1,
    // name: '8',
    // points_names: 'Alibi, Музей Истории Магнитостроя',
    // review: '',
    // likes_count: 0,
    // comments_count: 0,
    // checked: 0,
    // image1: 'image1',
    // image2: 'image2',
    // image3: 'image3',
    // startpoint: '{"longitude":58.961067,"latitude":53.407791}',
    // endpoint: '{"longitude":58.96259139441874,"latitude":53.39532632095306}',
    // waypoint1: null,
    // waypoint2: null,
    // waypoint3: null,
    // waypoint4: null,
    // waypoint5: null,
    // waypoint6: null,
    // waypoint7: null,
    // waypoint8: null,
    // object_id_startPoint: 54,
    // object_id_EndPoint: 25,
    // object_id_waypoint1: 0,
    // object_id_waypoint2: 0,
    // object_id_waypoint3: 0,
    // object_id_waypoint4: 0,
    // object_id_waypoint5: 0,
    // object_id_waypoint6: 0,
    // object_id_waypoint7: 0,
    // object_id_waypoint8: 0

    const getUserNickName = (id) =>{
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
    
        fetch(ip_address + '/getusernickname', requestOptions)
          .then(response => response.json())
          .then(result => {
            setNickName(result[0].nickname)
            
          })
          .catch(error => console.log('error', error));


    }

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
          "useradd": 1,
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
            setNickName(result)
            
          })
          .catch(error => console.log('error', error));
    }

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
    object_id_waypoint8

    } = props

    useEffect(()=>{
        
        convertWaypointToArray()
        getUserNickName(useradd)
        putImagesToArray()
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
      console.warn(arr)
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

    return(
        <View style={{width:'100%',height:'70%'}}>
            <Text>
                {nickname}
            </Text>
            <Text>
                {id}
            </Text>
            <Text>
                {startpoint}
            </Text>
            <Text>
                {review}
            </Text>
            <Text>
                {points_names}
            </Text>
            <Text>
            {likes_count}
            </Text>
            <Text>
            {comments_count}
            </Text>
            <Text>
            {checked}
            </Text>
            <TouchableOpacity onPress={()=>{pressLike()}}>
                             
                <Text>
                    поставить лайк
                </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{prepareToRoute(); navigate('Карта')}}>
              <Text>
                перейти к маршруту
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{global.pub_id = id; navigate('Комментарии') }}>
              <Text>
                Комментарий
              </Text>
            </TouchableOpacity>
            
            <FlatList
            data={images}
            extraData={images}
            vertical={true}
            contentContainerStyle={{backgroundColor:'red'}}       
            renderItem={({item,index})=> (
                        
                 <Image style={{width: 120, height: 120}} source={{uri: item.uri}}/>
           
            )}
            />
            <MapView
         initialRegion={{
           latitude: 53.407163, 
           longitude: 58.980291,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
         style={{width: '100%', height: '40%' }}
       >
          
        <MapViewDirections
               origin={JSON.parse(startpoint)}
               waypoints={waypointArr}
               destination={JSON.parse(endpoint)}
               apikey={GOOGLE_MAPS_APIKEY}
              
             />
       </MapView>

       
        </View>
    )

}