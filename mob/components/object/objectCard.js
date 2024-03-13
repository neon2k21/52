import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { ip_address } from "../../config";



export default function ObjectCard(props){

    const {name, image,id} = props

    const [result, setResult] = useState([])

    const getInfoAboutCurrentObject =()=>{
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
    
        fetch(ip_address + '/deletefromfavor', requestOptions)
          .then(response => response.json())
          .then(result => {      
            setResult(result)
          })
          .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        getInfoAboutCurrentObject()
    },[])


    const removeObjectFromFavor=()=>{
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
    
        fetch(ip_address + '/deletefromfavor', requestOptions)
          .then(response => response.json())
          .then(result => {      
            setResult(result)
          })
          .catch(error => console.log('error', error));
    }

    return(
        <View  style={{width:'80%',height:'50%'}}>
            <Image source={{uri: image}} style={{width:'80%',height:'50%'}}/>
            <Text>
                {name}
            </Text>
            <Text>
                {id}
            </Text>
        </View>
       
        
        
    )



}