import { useCallback, useEffect, useState } from "react"
import {View} from "react-native"
import { ip_address } from "../../config";
import { FlatList } from "react-native-gesture-handler";
import PublicationCard from "../../components/publication/publicationCard";
import { useFocusEffect } from "@react-navigation/core";




export default function PublicationsScreen(){

    const [data, setData] = useState()


    const getAllpubs = () => {
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
    
        fetch(ip_address + '/getallpublication', requestOptions)
          .then(response => response.json())
          .then(result => {
            setData(result)
            
          })
          .catch(error => console.log('error', error));
    
      }


      useFocusEffect(
        useCallback(()=>{getAllpubs()},[])
      )
    
    
    
    return(
        <View>
           <FlatList
          data={data}
          extraData={data}
          vertical={true}
          contentContainerStyle={{ alignSelf: 'flex-start',paddingBottom:4000 }}
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
