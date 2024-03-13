import {FlatList, Text,TouchableOpacity,View} from 'react-native'
import ObjectCard from '../../components/object/objectCard';
import PublicationCard from '../../components/publication/publicationCard';
import { useFocusEffect } from '@react-navigation/core';
import { useCallback,useState } from 'react';
import { ip_address } from '../../config';



export default function LikesScreen(){

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
              />

          )}

        />
        </View>
    )
}