import { useCallback, useEffect, useState } from "react"
import {View, FlatList, TouchableOpacity, Text, StyleSheet, Pressable, Image, Modal} from "react-native"
import { ip_address } from "../../config";
import PublicationCard from "../../components/publication/publicationCard";
import { useFocusEffect } from "@react-navigation/core";
import { COLORS } from "../../color";
import Tag from "../../components/publication/tag"
import { head } from "lodash";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const filters = [
  {"id": 1, "name": "природа"}, 
  {"id": 2, "name": "еда"}, 
  {"id": 3, "name": "достопримечательности"}, 
  {"id": 4, "name": "на машине"}, 
  {"id": 5, "name": "пеший"}, 
  {"id": 6, "name": "развлечения"}, 
  {"id": 7, "name": "семейный"}]


export default function PublicationsScreen(){
  const [modalVisible, setModalVisible] = useState(false);

    const [data, setData] = useState()
    const [selectFilter,setSelectFilter] = useState(false)

    const selectTag = (id)=>{
      if(id==1 && !selectFilter){
        getAllpubsByTag(1,0,0,0,0,0,0)
        setSelectFilter(true)
        return
      }
      if(id==2 && !selectFilter){
        getAllpubsByTag(0,2,0,0,0,0,0)
        setSelectFilter(true)
        return
      }
      if(id==3 && !selectFilter){
        getAllpubsByTag(0,0,3,0,0,0,0)
        setSelectFilter(true)
        return
      }
      if(id==4 && !selectFilter){
        getAllpubsByTag(0,0,0,4,0,0,0)
        setSelectFilter(true)
        return
      }
      if(id==5 && !selectFilter){
        getAllpubsByTag(0,0,0,0,5,0,0)
        setSelectFilter(true)
        return
      }
      if(id==6 && !selectFilter){
        getAllpubsByTag(0,0,0,0,0,6,0)
        setSelectFilter(true)
        return
      }
      if(id==7 && !selectFilter){
        getAllpubsByTag(0,0,0,0,0,0,7)
        setSelectFilter(true)
        return
      }
      if(selectFilter){
        getAllpubs()
        setSelectFilter(false)
        return
      }
    }


 



    const getAllpubs = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
    
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
          })
          .catch(error => console.log('error', error));
    
      }


    useFocusEffect(useCallback(()=>{getAllpubs()},[]))
        
    return(
        <View style={styles.container}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.title}>Маршруты</Text>
          <Pressable
        
        onPress={() => setModalVisible(true)}>
        <Image style={styles.openModal}source={require('../../assets/images/filterWhite.png')}/>
      </Pressable>
      </View>
             <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{justifyContent:'center'}}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image source={require('../../assets/images/cross.png')} style={styles.cross}/>
            </Pressable>
          <FlatList
            data={filters}
            vertical={true} 
            numColumns={3}       
            renderItem={({item})=> ( 
                
              <TouchableOpacity style={{height:30}} className="rounded-2xl" onPress={()=>{selectTag(item.id)}}>
              <Tag name={item.name}/>
          </TouchableOpacity>
               
            )}
            />
            
          </View>
     
      </Modal>

           <FlatList
          data={data}
          extraData={data}
          vertical={true}
          contentContainerStyle={{ paddingBottom:4000 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            
              <PublicationCard 
              id={item.id} 
              useradd={item.useradd} 
              name={item.name} 
              image={item.image}
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
const styles = StyleSheet.create({
  container:{
    backgroundColor:COLORS.blue
  },
  title:{
    fontFamily:'Black',
    fontSize:heightPercentageToDP(4.4),
    color:COLORS.white,
    marginLeft:widthPercentageToDP(2),
    marginVertical:heightPercentageToDP(2)
  },
  openModal:{
    width:heightPercentageToDP(4.5),
    height:heightPercentageToDP(4.5),
    marginLeft:widthPercentageToDP(30),
    marginTop:heightPercentageToDP(1)
  },
  modalView:{
    alignSelf:'center',
    backgroundColor:'#fff',
    alignItems:'center',
    padding:10,
    width:widthPercentageToDP(87),
    paddingLeft:0,
    borderBottomEndRadius:heightPercentageToDP(1.8),borderBottomStartRadius:heightPercentageToDP(1.8),borderTopEndRadius:heightPercentageToDP(1.8),
    borderTopStartRadius:heightPercentageToDP(1.8),
    marginTop:heightPercentageToDP(40)
  },
  cross:{
    width:24,
    height:24,
    marginLeft:widthPercentageToDP(70)
  }
})