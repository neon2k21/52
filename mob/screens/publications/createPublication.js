import { createRef, useEffect, useRef, useState } from "react"
import { Text, TextInput, Image, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { ip_address } from "../../config";
import {decode as atob, encode as btoa} from 'base-64'
import { useNavigation } from "@react-navigation/core";



const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"


export default function CreatePublication() {

    const {navigate} = useNavigation()

   global.user_id = 1

   const [imageFlatlist, setImageFlatList] = useState([])

    const mapRef = useRef()

   
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [wayPoints, setWaypoints] = useState([])
    const [WaypointIDs, setWaypointIDs] = useState([])
    const [waypointNames, setWaypointsNames] = useState("")
    const [image, setImage] = useState([]);
    const [image1,setImage1] = useState("")
    const [image2,setImage2] = useState("")
    const [image3,setImage3] = useState("")

    const [startPoint,setStartPoint] = useState("")
    const [endPoind, setEndPoint] = useState("")
    const [waypoint1,setWaypoint1] = useState("")
    const [waypoint2,setWaypoint2] = useState("")
    const [waypoint3,setWaypoint3] = useState("")
    const [waypoint4,setWaypoint4] = useState("")
    const [waypoint5,setWaypoint5] = useState("")
    const [waypoint6,setWaypoint6] = useState("")
    const [waypoint7,setWaypoint7] = useState("")
    const [waypoint8,setWaypoint8] = useState("")

    const [object_id_startPoint,setobject_id_startPoint] = useState(0)
    const [object_id_EndPoint,setobject_id_EndPoint] = useState(0)
    const [object_id_waypoint1,setobject_id_waypoint1] = useState(0)
    const [object_id_waypoint2,setobject_id_waypoint2] = useState(0)
    const [object_id_waypoint3,setobject_id_waypoint3] = useState(0)
    const [object_id_waypoint4,setobject_id_waypoint4] = useState(0)
    const [object_id_waypoint5,setobject_id_waypoint5] = useState(0)
    const [object_id_waypoint6,setobject_id_waypoint6] = useState(0)
    const [object_id_waypoint7,setobject_id_waypoint7] = useState(0)
    const [object_id_waypoint8,setobject_id_waypoint8] = useState(0)


    useEffect(()=>{
        drawRoute(global.route_to_publicate)
        getMarkersNames(global.waypointNames)
    },[])

    function getMarkersNames(data){
        let names_string = ""
        let waypoint_id = [0,0,0,0,0,0,0,0]
            console.log(data.length-1)
        for(let i = 0; i < data.length; i++){
            if(i==0) setobject_id_startPoint(data[i].id)
            if(i==data.length-1) setobject_id_EndPoint(data[i].id)
            if(i!==data.length-1) names_string += data[i].name +", "
            else names_string += data[i].name
        }
        for(let i=1; i < data.length-1;i++){
           
            waypoint_id[i-1] = data[i].id
        }
        console.warn(waypoint_id)
        setWaypointIDs(waypoint_id)
        setWaypointsNames(names_string)
    }


    function drawRoute(only_points){
       

        if(only_points.length < 3) {
            setWaypoints([])
            setStartPoint(only_points[0])
            setEndPoint(only_points[1])
          }
          else {
              const waypoitns = []
              for(let i=1; i<only_points.length-1;i++){
                waypoitns.push(only_points[i].point)
              }
              setStartPoint(only_points[0].point)
              setWaypoints(waypoitns)
              setEndPoint(only_points[only_points.length-1].point)
           
          }
      }

    const uploadRoute = () =>{
        if(name != ""){
            var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "useradd": global.user_id, 
            "name":name,
            "points_names":waypointNames, 
            "review":comment,  
            "image1": JSON.stringify(image1), 
            "image2":   JSON.stringify(image2),
            "image3":   JSON.stringify(image3), 
            "startpoint": JSON.stringify(startPoint), 
            "endpoint":JSON.stringify(endPoind), 
            "waypoint1":JSON.stringify(waypoint1), 
            "waypoint2":JSON.stringify(waypoint2), 
            "waypoint3":JSON.stringify(waypoint3), 
            "waypoint4":JSON.stringify(waypoint4),  
            "waypoint5":JSON.stringify(waypoint5), 
            "waypoint6":JSON.stringify(waypoint6),  
            "waypoint7":JSON.stringify(waypoint7), 
            "waypoint8":JSON.stringify(waypoint8), 
            "object_id_startPoint":object_id_startPoint, 
            "object_id_EndPoint":object_id_EndPoint, 
            "object_id_waypoint1":object_id_waypoint1, 
            "object_id_waypoint2":object_id_waypoint2, 
            "object_id_waypoint3":object_id_waypoint3, 
            "object_id_waypoint4":object_id_waypoint4, 
            "object_id_waypoint5":object_id_waypoint5, 
            "object_id_waypoint6":object_id_waypoint6, 
            "object_id_waypoint7":object_id_waypoint7, 		
            "object_id_waypoint8":object_id_waypoint8 
        });
        
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
         
        };
    
        fetch(ip_address + '/createpublication', requestOptions)
          .then(response => response.json())
          .then(result => { console.log(result)})
          .catch(error => console.log('error', error));
        }
        if(name=="" && comment !== ""){
            alert('Укажите наименование публикации')
        }
       
    }

    
    const addImage = async (base64) => {
        if(image.length<3)
        { 
            console.log(base64)
            setImage([...image, {"base64": base64[0].base64}])
            console.log('image.length',image.length)
            if(image.length==1) setImage1(base64[0].base64)
            if(image.length==2) setImage2(base64[0].base64)
            if(image.length==3) setImage3(base64[0].base64)
        }
        else return
     
    }


    const openGallery = () => {
        
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
           
           },response => {
            if(response.didCancel){
                    console.log("отмена")
            } 
            else if( response.errorCode) {
                console.log("ошибка")
            }
            else {
                addImage(response.assets)
            }
        })
    }

    const write_data = () =>{


           console.log(JSON.stringify(image1))

            if(wayPoints[0]!="") setWaypoint1(wayPoints[0])
            if(wayPoints[1]!="") setWaypoint2(wayPoints[1])
            if(wayPoints[2]!="") setWaypoint3(wayPoints[2])
            if(wayPoints[3]!="") setWaypoint4(wayPoints[3])
            if(wayPoints[4]!="") setWaypoint5(wayPoints[4])
            if(wayPoints[5]!="") setWaypoint6(wayPoints[5])
            if(wayPoints[6]!="") setWaypoint7(wayPoints[6])
            if(wayPoints[7]!="") setWaypoint8(wayPoints[7])

            
            
            if(WaypointIDs[0]!=0) setobject_id_waypoint1(WaypointIDs[0])
            if(WaypointIDs[1]!=0) setobject_id_waypoint2(WaypointIDs[1])
            if(WaypointIDs[2]!=0) setobject_id_waypoint3(WaypointIDs[2])
            if(WaypointIDs[3]!=0) setobject_id_waypoint4(WaypointIDs[3])
            if(WaypointIDs[4]!=0) setobject_id_waypoint5(WaypointIDs[4])
            if(WaypointIDs[5]!=0) setobject_id_waypoint6(WaypointIDs[5])
            if(WaypointIDs[6]!=0) setobject_id_waypoint7(WaypointIDs[6])
            if(WaypointIDs[7]!=0) setobject_id_waypoint8(WaypointIDs[7])
            uploadRoute()
            navigate('Публикации')
            
    }
    


    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Text>
                Создать публикацию
            </Text>
            <Text>
                Наименование публикации
            </Text>
            <TextInput
            onChangeText={setName}
            value={name}
            />
            <Text>
                Точки Маршрута:
            </Text>
            <Text>
                {waypointNames}
            </Text>
          
            <Text>
                Карта
            </Text> 
            <MapView
         ref={mapRef}
         initialRegion={{
           latitude: 53.407163, 
           longitude: 58.980291,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
         style={{width: '100%', height: '40%' }}
       >
          
        <MapViewDirections
               origin={startPoint}
               waypoints={wayPoints}
               destination={endPoind}
               apikey={GOOGLE_MAPS_APIKEY}
               onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates,{
                    edgePadding: {
                        right:3,
                        bottom: 30,
                        legt:30,
                        top:10
                    }
                })
               }} 
             />
       </MapView>
            
             <Text>
                Комментарий
            </Text>
            <TextInput
            onChangeText={setComment}
            value={comment}
            />
            <TouchableOpacity onPress={()=>{openGallery()}}>
                 <Text>
                Добавить картинку
            </Text>
            </TouchableOpacity>
            <FlatList
            data={image}
            extraData={image}
            horizontal={true}        
            renderItem={({item,index})=> (           
                                  <Image id={index} style={{width: 120, height: 120}} source={{uri: `data:image/jpeg;base64,${item.base64}`}} />
           
            )}
            />
          
            
            <TouchableOpacity onPress={()=>{write_data()}}>
                <Text>
                    Готов
                </Text>
            </TouchableOpacity>
           
            <Text>
                Отмена
            </Text> 
        </View>
    )


}