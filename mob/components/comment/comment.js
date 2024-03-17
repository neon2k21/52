import { useFocusEffect } from "@react-navigation/core";
import { useCallback, useState } from "react";
import { TouchableOpacity,View,Text,Image } from "react-native"
import { ip_address } from "../../config";



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
            setImage({uri: `data:image/jpeg;base64,result[0].avatar`})
          })
          .catch(error => console.log('error', error));
    }


    useFocusEffect(
        useCallback(()=>{
            getUserData(global.user_id)
        },[])
    )


    return(
        <TouchableOpacity>
            <Image style={{width:120, height:120}} source={{uri: image.uri}}/>
            <Text>
                {nickname}
            </Text>
            <Text>
                {date}
            </Text>
            <Text>
                {comment}
            </Text>
            <Text>
                {id}
            </Text>
           
        </TouchableOpacity>

    )
}