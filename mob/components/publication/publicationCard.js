import { useEffect,useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import MapView from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { ip_address } from "../../config"

const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"


export default function PublicationCard(props){

    const [nickname, setNickName] = useState("")

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

    const [waypointArr, setWaypointsArr] = useState([])
    
    
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
        

    },[])

    const convertWaypointToArray = () =>{
        const arr = []
        console.error(typeof(object_id_waypoint1))
        if( object_id_waypoint1!==0) arr.push(JSON.parse(waypoint1))
        if( object_id_waypoint2!==0) arr.push(JSON.parse(waypoint2))
        if( object_id_waypoint3!==0) arr.push(JSON.parse(waypoint3))
        if( object_id_waypoint4!==0) arr.push(JSON.parse(waypoint4))
        if( object_id_waypoint5!==0) arr.push(JSON.parse(waypoint5))
        if( object_id_waypoint6!==0) arr.push(JSON.parse(waypoint6))
        if( object_id_waypoint7!==0) arr.push(JSON.parse(waypoint7))
        if( object_id_waypoint8!==0) arr.push(JSON.parse(waypoint8))
        setWaypointsArr(arr)
      console.error(arr)
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

            <TouchableOpacity onPress={()=>{}}>
                             
                <Text>
                    Написать Комментарий
                </Text>
            </TouchableOpacity>
            
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