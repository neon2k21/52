import { useFocusEffect } from "@react-navigation/core"
import { useCallback, useState } from "react"
import { FlatList, TextInput, TouchableOpacity, View, Text } from "react-native"
import { ip_address } from "../../config"
import Comment from "../../components/comment/comment"



export default function CommentScreen(){

    const [comments, setComments] = useState([])
    const [text, setText] = useState("")

    const getAllCommentsForPub = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "id": global.pub_id
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/getallcommentsbypub', requestOptions)
          .then(response => response.json())
          .then(result => {      
            setComments(result)
            console.error(result)
          })
          .catch(error => console.log('error', error));
    }

    const createNewComment=()=>{
        if(text!=""){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            var raw = JSON.stringify({
            "publication_id": global.pub_id,
            "text": text,
            "useradd": global.user_id
            });
        
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
        
            fetch(ip_address + '/writecommentpublication', requestOptions)
            .then(response => response.json())
            .then(result => {      
               
            })
            .catch(error => console.log('error', error));
            getAllCommentsForPub()

        }
        else return
    }

    useFocusEffect(useCallback(()=>{
        getAllCommentsForPub()
    },[]))

    return(
        <View className="w-full h-full">
            <FlatList
          data={comments}
          extraData={comments}
          vertical={true}
          contentContainerStyle={{ alignSelf: 'flex-start',paddingBottom:3000 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item}) => (


              <Comment  userid={item.useradd} date={item.data} comment={item.text} id={item.id}   />

          )}

        />
        <View>
            
             <TextInput 
             placeholder="Поиск"
             placeholderTextColor={'white'}
             selectionColor={'white'}
             clearButtonMode="always"
             autoCorrect={false}
             onChangeText={(text) => setText(text)}
             value= {text}
             className="border-2 " style={{width:'80%'}}/>
             <TouchableOpacity className="bg-red-500" onPress={()=>{createNewComment()}}>
                <Text>
                    отправить
                </Text>
             </TouchableOpacity>
        </View>
       
        </View>
    )


}