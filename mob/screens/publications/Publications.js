import { useCallback, useEffect, useState } from "react"
import {View, FlatList, TouchableOpacity, Text} from "react-native"
import { ip_address } from "../../config";
import PublicationCard from "../../components/publication/publicationCard";
import { useFocusEffect } from "@react-navigation/core";




export default function PublicationsScreen(){

    const [data, setData] = useState()
    const [tags, setTags] = useState([])

    const selectTag = (id)=>{
      if(id==1){
        getAllpubsByTag(1,0,0,0,0,0,0)
        return
      }
      if(id==2){
        getAllpubsByTag(0,2,0,0,0,0,0)
        return
      }
      if(id==3){
        getAllpubsByTag(0,0,3,0,0,0,0)
        return
      }
      if(id==4){
        getAllpubsByTag(0,0,0,4,0,0,0)
        return
      }
      if(id==5){
        getAllpubsByTag(0,0,0,0,5,0,0)
        return
      }
      if(id==6){
        getAllpubsByTag(0,0,0,0,0,6,0)
        return
      }
      if(id==7){
        getAllpubsByTag(0,0,0,0,0,0,7)
        return
      }
    }


    function getAllFilters(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      
  
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
            console.log('result',result)
            
          })
          .catch(error => console.log('error', error));
    
      }

      const getAllpubsByTag = (filter1,filter2,filter3,filter4,filter5,filter6,filter7) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "tag_1": filter1,
          "tag_2": filter2,
          "tag_3": filter3,
          "tag_4": filter4,
          "tag_5": filter5,
          "tag_6": filter6,
          "tag_7": filter7
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/getallpublicationbyfilter', requestOptions)
          .then(response => response.json())
          .then(result => {
            setData(result)
            console.log('result',result)
            
          })
          .catch(error => console.log('error', error));
    
      }

    useEffect(()=>{},[])

      useFocusEffect(useCallback(()=>{ 
        getAllFilters()
        getAllpubs()
       
      },[]))
    
    
    
    return(
        <View style={{height:'100%', width:'100%'}}>
         <FlatList
            data={tags}
            vertical={true} 
            numColumns={3}       
            renderItem={({item})=> ( 
                
              <TouchableOpacity style={{height:30}} className="rounded-2xl" onPress={()=>{selectTag(item.id)}}>
              <View className="rounded-2xl flex-row" style={{backgroundColor:'green', height:30}}>
                  <View className="rounded-full" style={{backgroundColor:'white',width:24,height:24}}>
                          <Text>
                              {item.id}
                          </Text>
                  </View>
                  <Text style={{margin:2}}>
                      {item.name}
                  </Text>
                  <View>
      
                  </View>
              </View>
          </TouchableOpacity>
               
            )}
            />

           <FlatList
          data={data}
          extraData={data}
          vertical={true}
          contentContainerStyle={{ paddingBottom:4000 }}
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
