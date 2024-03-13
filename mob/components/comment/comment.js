import { useFocusEffect } from "@react-navigation/core";
import { useCallback, useState } from "react";
import { TouchableOpacity,View,Text,Image } from "react-native"
import { ip_address } from "../../config";



export default function Comment(props){
    const [nickname, setNickName] = useState("")

    const {userid, date,id, comment } = props

    const getUserNickName = (id) =>{
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
            
          })
          .catch(error => console.log('error', error));


    }

    const getUserPhoto = ()=>{
        
    }


    useFocusEffect(
        useCallback(()=>{
            getUserNickName(global.user_id)
        },[])
    )


    return(
        <TouchableOpacity onLongPress={()=>{if(userid==global.user_id) console.log('mojno')}}>
            <Image/>
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