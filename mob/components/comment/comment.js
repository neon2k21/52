import { useFocusEffect } from "@react-navigation/core";
import { useCallback, useState } from "react";
import { TouchableOpacity,View,Text,Image } from "react-native"
import { ip_address } from "../../config";
import { watchPositionAsync } from "expo-location";
import { widthPercentageToDP } from "react-native-responsive-screen";



export default function Comment(props){
    const [nickname, setNickName] = useState("")
    const [image, setImage] = useState("")

    const {userid, date,id, comment } = props

   

    const getUserData = (id)=>{
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
            setImage({uri: `data:image/jpeg;base64,${result[0].avatar}`})
          })
          .catch(error => console.log('error', error));
    }


    useFocusEffect(
        useCallback(()=>{
            getUserData(userid)
        },[])
    )


    return(
       <View className="flex-row">
            <Image style={{width:70, height:70}} className="rounded-full" source={{uri: image.uri}}/>
            <View>
                <View className="flex-row" style={{width:widthPercentageToDP(70)}} >
                <Text className="text-xl">
                {nickname}
            </Text>
            <Text style={{right:-170}}>
                {date}
            </Text>
                </View>
            
            <Text>
                {comment}
            </Text>
            
            </View>
           
           
        </View>

    )
}