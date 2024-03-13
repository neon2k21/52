import { useState, useEffect } from "react"
import { FlatList,View,Image,Text } from "react-native"
import { RatingBar } from "@aashu-dubey/react-native-rating-bar";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ip_address } from "../../config";



export default function Review(props){

    const [imageData, setImageData] = useState([])
    const [nickname, setNickName] = useState("")

    const {user, object, comment, mark, image1, image2, image3,data} = props


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

    useEffect(()=>{
        putImagesToArray()
        getUserNickName(user)
    },[])


    const putImagesToArray =()=>{
        let arr = []     
        arr.push({uri: `data:image/jpeg;base64,${JSON.parse(image1)}`})
        arr.push({uri: `data:image/jpeg;base64,${JSON.parse(image2)}`})
        arr.push({uri: `data:image/jpeg;base64,${JSON.parse(image3)}`})
        setImageData(arr)
  
      }

return(
    <View style={{width:500, height:200}}>
        <Image />
        <Text>
            юзер: {nickname}
        </Text>

        <Text>
        object: {object}
        </Text>
        <Text>
        comment: {comment}
        </Text>
        <RatingBar
          initialRating={mark}
          direction="horizontal"
          allowHalfRating
          itemCount={5}
          itemPadding={4}
          ignoreGestures={true}
          ratingElement={{
            full: <Icon name="star-rate" color="#54D3C2" size={40} />,
            half: <Icon name="star-half" color="#54D3C2" size={40} />,
            empty: <Icon name="star-border" color="#54D3C2" size={40} />,
          }}
        />
        <Text>
            data: {data}
        </Text>

        <FlatList
            data={imageData}
                    
            renderItem={({item})=> (                 <Image style={{width: 120, height: 120}} source={{uri: item.uri}}/>
            )}
            />

    </View>
)


}