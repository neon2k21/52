import { useWindowDimensions,Text,View,TouchableOpacity,FlatList, Image} from "react-native";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useCallback, useEffect, useState } from "react";
import { ip_address } from "../../config";
import PublicationCard from "../../components/publication/publicationCard";
import ObjectCard from "../../components/object/objectCard";
import { launchImageLibrary } from "react-native-image-picker";







export  default function Profile(){

    const [image, setImage] = useState(global.user_avatar)

    const setNewAvatar=(avatar)=>{
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "id": global.user_id,
          "avatar": avatar
        });
    
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/setNewAvatar', requestOptions)
          .then(response => response.json())
          .then(result => {})
          .catch(error => console.log('error', error));

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
              console.log(response.assets[0].base64)
              setImage(response.assets[0].base64)
              global.user_avatar = response.assets[0].base64
              setNewAvatar(response.assets[0].base64)
          }
      })
  }


  const navigation = useNavigation()
  
  
   
    useEffect(()=>{
      setImage(global.user_avatar)
    },[])
 
  
  
 
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'mypubs', title: 'мои записи' },
    { key: 'mylikes', title: 'понравившиеся' }
    
  ]);

  const MyPubs=()=>{
    const [MyPubs, setMyPubs] = useState([])

   
    const getMyPubs = ()=>{
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": global.user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/getalluserpublications', requestOptions)
      .then(response => response.json())
      .then(result => {      
        setMyPubs(result)
      })
      .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(()=>{
            getMyPubs()
        },[])
    )



    return(
        <View>
           <FlatList
          data={MyPubs}
          extraData={MyPubs}
          vertical={true}
          contentContainerStyle={{ alignSelf: 'flex-start',paddingBottom:3000 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (


              <PublicationCard 
              id={item.id} 
              useradd={item.useradd} 
              name={item.name} 
              points_names={item.points_names}
              review={item.review} 
              likes_count={item.likes_count} 
              comments_count={item.comments_count}
              checked={item.checked}
              image1={item.image1} 
              image2={item.image2} 
              image3={item.image3}
              startpoint={item.startpoint}
              endpoint={item.endpoint}
              waypoint1={item.waypoint1}
              waypoint2={item.waypoint2}
              waypoint3={item.waypoint3}
              waypoint4={item.waypoint4}
              waypoint5={item.waypoint5}
              waypoint6={item.waypoint6}
              waypoint7={item.waypoint7}
              waypoint8={item.waypoint8}
              object_id_startPoint={item.object_id_startPoint}
              object_id_EndPoint={item.object_id_EndPoint}
              object_id_waypoint1={item.object_id_waypoint1}
              object_id_waypoint2={item.object_id_waypoint2}
              object_id_waypoint3={item.object_id_waypoint3}
              object_id_waypoint4={item.object_id_waypoint4}
              object_id_waypoint5={item.object_id_waypoint5}
              object_id_waypoint6={item.object_id_waypoint6}
              object_id_waypoint7={item.object_id_waypoint7}
              object_id_waypoint8={item.object_id_waypoint8}
              tag_1={item.tag_1}
              tag_2={item.tag_2}
              tag_3={item.tag_3}
              tag_4={item.tag_4}
              tag_5={item.tag_5}
              tag_6={item.tag_6}
              tag_7={item.tag_7}
              />

          )}

        />
        </View>
    )
}
  
  
  const MyLikes=()=>{
    const [MyFavorObjects, setMyFavorObjects] = useState([])
    const [LikedPubs, setLikedPubs] = useState([])
  

    const removeMyFavorObjects = (id)=>{
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "object": id,
          "user": global.user_id
        });
    
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/deletefromfavor', requestOptions)
          .then(response => response.json())
          .then(result => {})
          .catch(error => console.log('error', error));
          getMyFavorObjects()
    }


    const getMyFavorObjects = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "id": global.user_id
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/getuserfavor', requestOptions)
          .then(response => response.json())
          .then(result => {      
            setMyFavorObjects(result)
          })
          .catch(error => console.log('error', error));
    }

    const getLikedPubs = ()=>{
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": global.user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/getuserlikes', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setLikedPubs(result)
      })
      .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(()=>{
            getMyFavorObjects()
            getLikedPubs()
        },[])
    )
    return(
        <View>
            <Text>
                Места
            </Text>
            <FlatList
          data={MyFavorObjects}
          extraData={MyFavorObjects}
          horizontal={true}
          contentContainerStyle={{ alignSelf: 'flex-start' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
          <TouchableOpacity onLongPress={()=>{removeMyFavorObjects(item.id)}} onPress={()=>{console.log('nehaha')}}>
            <ObjectCard name={item.name} image={item.image} id={item.id}/>
          </TouchableOpacity>
          )}

        />
            <Text>
                подборки
            </Text>
            <FlatList
          data={LikedPubs}
          extraData={LikedPubs}
          vertical={true}
          contentContainerStyle={{ alignSelf: 'flex-start',paddingBottom:3000 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (


              <PublicationCard
              id={item.id} 
              useradd={item.useradd} 
              name={item.name} 
              points_names={item.points_names}
              review={item.review} 
              likes_count={item.likes_count} 
              comments_count={item.comments_count}
              checked={item.checked}
              image1={item.image1} 
              image2={item.image2} 
              image3={item.image3}
              startpoint={item.startpoint}
              endpoint={item.endpoint}
              waypoint1={item.waypoint1}
              waypoint2={item.waypoint2}
              waypoint3={item.waypoint3}
              waypoint4={item.waypoint4}
              waypoint5={item.waypoint5}
              waypoint6={item.waypoint6}
              waypoint7={item.waypoint7}
              waypoint8={item.waypoint8}
              object_id_startPoint={item.object_id_startPoint}
              object_id_EndPoint={item.object_id_EndPoint}
              object_id_waypoint1={item.object_id_waypoint1}
              object_id_waypoint2={item.object_id_waypoint2}
              object_id_waypoint3={item.object_id_waypoint3}
              object_id_waypoint4={item.object_id_waypoint4}
              object_id_waypoint5={item.object_id_waypoint5}
              object_id_waypoint6={item.object_id_waypoint6}
              object_id_waypoint7={item.object_id_waypoint7}
              object_id_waypoint8={item.object_id_waypoint8}
              tag_1={item.tag_1}
              tag_2={item.tag_2}
              tag_3={item.tag_3}
              tag_4={item.tag_4}
              tag_5={item.tag_5}
              tag_6={item.tag_6}
              tag_7={item.tag_7}
              />

          )}

        />
        </View>
    )
  }
  
 
 
  
  
  const renderScene = SceneMap({
    mypubs: MyPubs,
    mylikes: MyLikes,
      
  });

  const renderTabBar = props => (
  
    <TabBar
    
      {...props}
      indicatorStyle={{ backgroundColor: 'green'}}        
         
         renderLabel={({ route}) => (
          <Text style={{ fontSize:wp(3.2), color: 'black', margin: 8, fontWeight: "bold" }}>
            {route.title}
          </Text>
        )}
    />
  );
  return(
    <View style={{width:'100%',height:'100%'}}>
      <View className="flex-row" style={{gap:wp(5),paddingHorizontal:wp(5)}}>
                  
                  <TouchableOpacity className="flex-row" onLongPress={()=>{openGallery()}}>
                  <Image className="rounded-full" style={{width:70, height:70}} source={{uri: `data:image/jpeg;base64,${image}`}}/>
                      <Text>
                          Привет, {global.userNickName}
                      </Text>  
                  </TouchableOpacity>
                  
                  </View>
      <TabView
    renderTabBar={renderTabBar}
    style={{backgroundColor:'white'}}
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
  />
    </View>
      
        
  
  )
}