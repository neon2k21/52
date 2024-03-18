import {View, Text, TouchableOpacity} from 'react-native';
import { useState } from 'react';


export default function Publication_Tag(props){
    const [selected, setSelected] = useState('red')
   
    const {id,name} = props

    const selectTag=(id)=>{
        
        if(id==1 && global.tag_1==0) {
            global.tag_1 = 1
            setSelected('green')
            return;
        }
        if(id==1 && global.tag_1!==0) {
            global.tag_1 = 0
            setSelected('red')
            return;
        }
        if(id==2 && global.tag_2===0) {
            global.tag_2 = id
            setSelected('green')
            return;
        }
        if(id==2 && global.tag_2!==0) {
            global.tag_2 = 0
            setSelected('red')
            return;
        }
        if(id==3 && global.tag_3===0) {
            global.tag_3 = id
            setSelected('green')
            return;
        }
        if(id==3 && global.tag_3!==0) {
            global.tag_3 = 0
            setSelected('red')
            return;
        }
        if(id==4 && global.tag_4===0) {
            global.tag_4 = id
            setSelected('green')
            return;
        }
        if(id==4 && global.tag_4!==0) {
            global.tag_4 = 0
            setSelected('red')
            return;
        }
        if(id==5 && global.tag_5===0) {
            global.tag_5 = id
            setSelected('green')
            return;
        }
        if(id==5 && global.tag_5!==0) {
            global.tag_5 = 0
            setSelected('red')
            return;
        }
        if(id==6 && global.tag_6===0) {
            global.tag_6 = id
            setSelected('green')
            return;
        }
        if(id==6 && global.tag_6!==0) {
            global.tag_6 = 0
            setSelected('red')
            return;
        }
        if(id==7 && global.tag_7===0) {
            global.tag_7 = id
            setSelected('green')
            return;
        }
        if(id==7 && global.tag_7!==0) {
            global.tag_7 = 0
            setSelected('red')
            return;
        }
    }
   
return(
    <TouchableOpacity style={{height:30}} className="rounded-2xl" onPress={()=>{selectTag(id);}}>
        <View className="rounded-2xl flex-row" style={{backgroundColor:selected, height:30}}>
            <View className="rounded-full" style={{backgroundColor:'white',width:24,height:24}}>
                    <Text>
                        {id}
                    </Text>
            </View>
            <Text style={{margin:2}}>
                {name}
            </Text>
            <View>

            </View>
        </View>
    </TouchableOpacity>
)

}

