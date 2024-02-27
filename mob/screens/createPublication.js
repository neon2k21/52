import { useState } from "react"
import { Text, TextInput, Image } from "react-native";
import YaMap, {Marker,RoutesFoundEvent} from 'react-native-yamap';






export default function CreatePublication(){

    const [image, setImage] = useState();
    const [text,setText] = useState();
    const [website,setWebsite] = useState();

    
    

    return(
        <View>
            <Text>
                Создать публикацию
            </Text>
            <Text>
                Точки Маршрута:
            </Text>
            {/* Точки маршрута */}
            <Text>
                Создать публикацию
            </Text>
            <Text>
                Карта
            </Text>
            <YaMap
          ref={this.map}
          showUserPosition
          followUser
          initialRegion={{
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            zoom: 1,
            azimuth: 80,
            tilt: 100
          }}
  style={{ flex: 1,width:'100%',height:'100%' }}
>
 {
    data.map((val, index) => {
   
      return (
       
            <Marker
            onPress={()=>{
              console.log(val.address); 
              setDataToBottomSheet(val.id,val.altitude,val.longitute,val.name,val.address, val.working_time, val.image, val.website, val.phone);
              handleSheetChanges()
                      }
              }
              point={{ lat: parseFloat(val.longitute), lon: parseFloat(val.altitude)}}
             
              />
       
      
              )
         })
  }
  
</YaMap>
            <Text>
               Комментарий
            </Text>
            <TextInput/>
            <Text>
               Добавить картинку
            </Text>
            <Image/>
            <TextInput/>
            <Text>
                Готов
            </Text>
            <Text>
                Отмена
            </Text>
        </View>
    )


}