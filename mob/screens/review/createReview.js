
import { createRef, useEffect, useRef, useState } from "react"
import { Text, TextInput, Image, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { ip_address } from "../../config";
import { RatingBar } from "@aashu-dubey/react-native-rating-bar";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/core";




export default function CreateReview() {


   const navigation = useNavigation()

    const mapRef = useRef()

   
    const [comment, setComment] = useState("");

    const [rating, setRating] = useState(1)

    const [image, setImage] = useState([]);
    const [image1,setImage1] = useState("")
    const [image2,setImage2] = useState("")
    const [image3,setImage3] = useState("")



  

    const uploadComment = () =>{
        if(comment != ""){
            var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "user": global.user_id, 
            "object":  global.object_id,
            "comment":  comment,
            "mark":     rating,  
            "image1":   JSON.stringify(image1), 
            "image2":   JSON.stringify(image2),
            "image3":   JSON.stringify(image3), 
           
        });
        
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
         
        };
    
        fetch(ip_address + '/createreview', requestOptions)
          .then(response => response.json())
          .then(result => { console.log(result)})
          .catch(error => console.log('error', error));

          navigation.goBack()
        }
        if(comment == ""){
            alert('Укажите Комментарий')
        }
       
    }

    
    




    const addImage = async (base64) => {
      if(image.length<=2)
      { 
          setImage([...image, {"base64": base64[0].base64}])
          console.log('image.length',image.length)
          if(image.length==0) setImage1(base64[0].base64)
          if(image.length==1) setImage2(base64[0].base64)
          if(image.length==2) setImage3(base64[0].base64)
      }
      else return
   
  }


  const openGallery = () => {
      
      launchImageLibrary({
          mediaType: 'photo',
          includeBase64: true,
         
         },response => {
          if(response.didCancel){
                  console.log("отмена")
          } 
          else if( response.errorCode) {
              console.log("ошибка")
          }
          else {
              addImage(response.assets)
          }
      })
  }

   
    


    return (
        <View style={{ width: '100%', height: '100%' }}>
            
            <Text>
               Написать Комментарий
            </Text>

             <Text>
                Комментарий
            </Text>
            <TextInput
            onChangeText={setComment}
            value={comment}
            />
            <TouchableOpacity onPress={()=>{openGallery()}}>
                 <Text>
                Добавить картинку
            </Text>
            </TouchableOpacity>
            <FlatList
            data={image}
            extraData={image}
            horizontal={true}        
            renderItem={({item,index})=> (
               
              <Image id={index} style={{width: 120, height: 120}} source={{uri: `data:image/jpeg;base64,${item.base64}`}} />
                
            )}
            />

            <Text>
                Поставить оценку
            </Text>

          <RatingBar
          initialRating={rating}
          direction="horizontal"
          itemCount={5}
          itemPadding={4}
          ratingElement={{
            full: <Icon name="star-rate" color="#54D3C2" size={40} />,
            half: <Icon name="star-half" color="#54D3C2" size={40} />,
            empty: <Icon name="star-border" color="#54D3C2" size={40} />,
          }}
          onRatingUpdate={value => setRating(value)}
        />
          
            
            <TouchableOpacity onPress={()=>{uploadComment(); }}>
                <Text>
                    Готов
                </Text>
            </TouchableOpacity>
           
            <Text>
                Отмена
            </Text> 
        </View>
    )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

