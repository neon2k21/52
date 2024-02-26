import {View, Text} from 'react-native';


export default function SelectedMarker(props){
   console.error('props',props)
    const {id,name,altitude,longitute} = props
    //console.error(id,name,altitude,longitute)
    //id={item.id} altitude={item.altitude} longitute={item.longitute} name={item.nam

return(
    <View style={{height:30}} className="rounded-2xl">
        <View className="rounded-2xl flex-row" style={{backgroundColor:'green', height:30}}>
            <View className="rounded-full" style={{backgroundColor:'white',width:24,height:24}}>
                    <Text>
                        id
                    </Text>
            </View>
            <Text style={{margin:2}}>
                {name}
            </Text>
            <View>

            </View>
        </View>
    </View>
)

}

