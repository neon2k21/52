import { createRef, useEffect, useRef, useState } from "react"
import { Text, TextInput, Image, View, StyleSheet } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { ip_address } from "../../config";
import {decode as atob, encode as btoa} from 'base-64'
import { useNavigation } from "@react-navigation/core";
import Publication_Tag from "../../components/publication/publication_tag";
import {COLORS} from "../../color.js"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { indexOf } from "lodash";
import SelectedMarker from '../../components/map/selectedMarker.js';





const GOOGLE_MAPS_APIKEY = "AIzaSyDbRLi8IgYRaG-NzyNyQn-p_7Kznko_z-o"


export default function CreatePublication() {

    const {navigate} = useNavigation()
    const navigation = useNavigation()

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

    const [tags, setTags] = useState([])
    const numColumns=3
    

    function getAllFilters(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        // const data = [
//   { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }
// ];

// const minCols = 2;

// const calcNumColumns = (width) => {
//   const cols = width / styles.item.width;
//   const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
//   const colsMinusMargin = cols - (2 * colsFloor * styles.item.margin);
//   if (colsMinusMargin < colsFloor && colsFloor > minCols) {
//     return colsFloor - 1;
//   } else return colsFloor;
// };

// const formatData = (data, numColumns) => {
//   const amountFullRows = Math.floor(data.length / numColumns);
//   let amountItemsLastRow = data.length - amountFullRows * numColumns;

//   while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
//     data.push({key: `empty-${amountItemsLastRow}`, empty: true});
//     amountItemsLastRow++;
//   }
//   return data;
// };

// const renderItem = ({ item, index }) => {
//     if (item.empty) {
//       return <View style={[styles.item, styles.itemTransparent]} />;
//     }
//     return (
//       <View style={styles.item}>
//         <Text style={styles.itemText}>{item.key}</Text>
//       </View>
//     );
//   };

// const App = () => {
//    const {width} = useWindowDimensions();
//     const [numColumns, setNumColumns] = useState(calcNumColumns(width));

//     useEffect(() => { 
//       setNumColumns(calcNumColumns(width));
//       }, [width]);

//     return (
//       <FlatList
//         key={numColumns}
//         data={formatData(data, numColumns)}
//         style={styles.container}
//         numColumns={numColumns}
//         renderItem={renderItem}
//       />
//     );
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: '#A1A1A1',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     margin: 1,
//     height: 120,
//     width: 90
//   },
//   itemTransparent: {
//     backgroundColor: 'transparent',
//   },
//   itemText: {
//     color: '#fff',
//   },
// });
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(ip_address + '/getAllfilters', requestOptions)
          .then(response => response.json())
          .then(result => {setTags(result)})
          .catch(error => console.log('error', error));
           
    }

    useEffect(()=>{
        drawRoute(global.route_to_publicate)
        getMarkersNames(global.waypointNames)
        getAllFilters()
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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "useradd": global.user_id, 
            "image":global.user_avatar,
            "name":    global.userNickName,
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
            "object_id_waypoint8":object_id_waypoint8,
            "tag_1":  global.tag_1,
            "tag_2":  global.tag_2,
            "tag_5":  global.tag_3,
            "tag_4":  global.tag_4,
            "tag_3":  global.tag_5,
            "tag_6":  global.tag_6,
            "tag_7":  global.tag_7
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
            global.tag_1 = 0
            global.tag_2 = 0
            global.tag_3 = 0
            global.tag_4 = 0
            global.tag_5 = 0
            global.tag_6 = 0
            global.tag_7 = 0
            navigation.goBack()
    
        
       
    }

    
    const addImage = async (base64) => {
        if(image.length<=2)
        { 
            setImage([...image, {"base64": base64[0].base64}])
            if(image.length==0) setImage1(base64[0].base64)
            if(image.length==1) setImage2(base64[0].base64)
            if(image.length==2) setImage3(base64[0].base64)
        }
        else return
     
    }


    const openGallery = () => {
        
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.01
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
            navigate('Карта')
            
    }
    
    
console.log(waypointNames)

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Image source={require('../../assets/images/buttonBack.png')} style={styles.buttonBack}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <View style={styles.stop}>
                <Text style={styles.stopText}>
                    Отменить
                </Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.head}>
                Создание публикации:
            </Text>
            
           
          
            <Text style={styles.tegs}>
                теги
            </Text> 
            <FlatList
            style={styles.tegsList}
            data={tags}
vertical={true}            
numColumns={4}       
            renderItem={({item})=> ( 
                
                    <Publication_Tag id={item.id} name={item.name}/>
               
            )}
            />           
             <Text style={styles.tegsText}>*Нажмите,чтобы выбрать</Text>

             <Text style = {styles.pleceHead}>места</Text>
             <ScrollView horizontal={true} style={{top:heightPercentageToDP(74), position:'absolute'}}>
             <FlatList
          data={markers_data}
          id='haha'
          extraData={markers_data}
          vertical={true}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.placeList}
          renderItem={({ item, index }) => (


              <SelectedMarker id={index + 1} altitude={item.altitude} longitute={item.longitute} name={item.name} />

          )}

        />
        </ScrollView>
             <Text style = {styles.descriptionText}>
                описание
            </Text>
            <TextInput
            style = {styles.descrription}
            placeholder="Введите текст..."
            multiline
            editable
            textAlignVertical='top'
            placeholderTextColor={COLORS.black}
            selectionColor={COLORS.black}
            clearButtonMode="always"
          
            onChangeText={setComment}
            value={comment}
            />
            
            <TouchableOpacity onPress={()=>{openGallery()}}>
            <Text style={styles.photoHead}>
фотографии
            </Text>
                 <Image source={require('../../assets/images/addPhoto.png')} style = {styles.plus}/>
            </TouchableOpacity>
            <FlatList
            data={image}
            extraData={image}
            horizontal={true}        
            renderItem={({item,index})=> (           
                                  <Image id={index} style={{width: 120, height: 120}} source={{uri: `data:image/jpeg;base64,${item.base64}`}} />
           
            )}
            />
          
            
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', top:heightPercentageToDP(-1)}}onPress={()=>{write_data()}}>
                <Image source={require('../../assets/images/buttonReady.png')} style={styles.buttonReady}></Image>
                <Text style={styles.readyText}>
                    Создать Публикацию
                </Text>
               
            </TouchableOpacity>
           
          
        </View>
    )


}
const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.blue,
        width: '100%', height: '100%',
    },
    head:{
        fontFamily:'Black',
        color:COLORS.white,
        fontSize:heightPercentageToDP(3.7),
        width:widthPercentageToDP(80),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(-0.9),
        lineHeight:heightPercentageToDP(3.7)
    },
    tegs:{
        fontFamily:'ExtraBold',
        color:COLORS.white,
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(1.8)
    },
    tegsList:{
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(21.5),
        width:widthPercentageToDP(100),
        position:'absolute',
    },
    stop:{
        top:heightPercentageToDP(-3.8),
        borderColor:COLORS.white,
        borderBottomEndRadius:heightPercentageToDP(1.8),borderBottomStartRadius:heightPercentageToDP(1.8),borderTopEndRadius:heightPercentageToDP(1.8),
        borderTopStartRadius:heightPercentageToDP(1.8),
        borderWidth:2,
        
        left:widthPercentageToDP(66),
        width:widthPercentageToDP(31),
        height:heightPercentageToDP(4.7),
        
        justifyContent:'center',
        alignItems:'center'
    },
    stopText:{
        color:COLORS.white,
        fontFamily:'Bold',
        fontSize:heightPercentageToDP(1.8),
        letterSpacing:heightPercentageToDP(-0.1),
    },
    buttonBack:{
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(0.7),
        height:heightPercentageToDP(4.7),
        width:heightPercentageToDP(4.7),
    },
    tegsText:{
        color:COLORS.black,
        fontFamily:'Bold',
        fontSize:heightPercentageToDP(1.4),
        top:heightPercentageToDP(9),
        left:widthPercentageToDP(2),
        letterSpacing:heightPercentageToDP(-0.07),
    },
    pleceHead:{
        fontFamily:'ExtraBold',
        color:COLORS.white,
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(50)
    },
    placeList:{
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(0),
    },
    descriptionText:{
        fontFamily:'ExtraBold',
        color:COLORS.white,
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
       top:heightPercentageToDP(9)
    },
    descrription:{
        color:COLORS.black,
        backgroundColor:COLORS.white,
        width:widthPercentageToDP(96),
        height:heightPercentageToDP(23),
        left:widthPercentageToDP(2),
        borderRadius:heightPercentageToDP(2),
        fontFamily:'SemiBold',
        fontSize:heightPercentageToDP(1.5),
        paddingVertical:heightPercentageToDP(2),
        paddingHorizontal:widthPercentageToDP(3),
        top:heightPercentageToDP(10)
    }, 
    photoHead:{
        fontFamily:'ExtraBold',
        color:COLORS.white,
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(12.5)
    },
    plus:{
        width:widthPercentageToDP(5),
        height:widthPercentageToDP(5),
        top:heightPercentageToDP(10.5),
        left:widthPercentageToDP(93)
    },
    readyText:{
        fontFamily:'Bold',
        position:'absolute',
        color:COLORS.black,
        fontSize:heightPercentageToDP(1.8),
        left:widthPercentageToDP(31),
        letterSpacing:-1
    },
    buttonReady:{
        width:widthPercentageToDP(102),
        height:heightPercentageToDP(7)
    }
});