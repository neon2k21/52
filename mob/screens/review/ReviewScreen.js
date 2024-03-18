import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { useCallback, useState } from "react";
import Review from "../../components/Review/reviewCard";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { ip_address } from "../../config";



export default function ReviewScreen(){
    
    const {navigate} = useNavigation()
    const [reviews, setReviews] = useState([])

    const getReviews=(id)=>{
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
    
        fetch(ip_address + '/getcurrentreview', requestOptions)
          .then(response => response.json())
          .then(result => {
            setReviews(result)
          })
          .catch(error => console.log('error', error));
      }

      useFocusEffect(
        useCallback(()=>{
            getReviews(global.object_id)
        })
      )

    return(
        <View>
            <TouchableOpacity onPress={()=>{navigate('Написать отзыв')}}>
                <Text>
                    написать отзыв
                </Text>
            </TouchableOpacity>
            <FlatList
           data={reviews}
           vertical={true}
           contentContainerStyle={{width:'100%'}}
           renderItem={({item}) => (
 
             <Review 
               user={item.user}
               object={item.object}
               comment={item.comment}
               mark={item.mark}
               image1={item.image1}
               image2={item.image2}
               image3={item.image3}
               data={item.data} 
               />
           )}
        />
        </View>
    )
}