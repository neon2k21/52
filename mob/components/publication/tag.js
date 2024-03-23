import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../color';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


export default function Tag(props){
    const [colorTag, setColorTag]=useState('#fff')
    const [go, setGo] = useState(true)
    const {name} = props
if(go){
    console.log(name)
   

    if(name=='природа'){setColorTag(COLORS.tag1)}
    if(name=='еда'){setColorTag(COLORS.tag2)}
    if(name=='достопримечательности'){setColorTag(COLORS.tag3)}
    if(name=='на машине'){setColorTag(COLORS.tag4)}
    if(name=='пеший'){setColorTag(COLORS.tag5)}
    if(name=='развлечения'){setColorTag(COLORS.tag6)}
    if(name=='семейный'){setColorTag(COLORS.tag7)}

    setGo(false)
}

    
   
return(
  
        <View style={{backgroundColor:colorTag, height:heightPercentageToDP(2.8), borderRadius:heightPercentageToDP(1.5), left:widthPercentageToDP(2),marginVertical:widthPercentageToDP(1), marginEnd:5}}>
            <View style={{flexDirection:'row'}}>
            <View style={{backgroundColor:COLORS.white,width:heightPercentageToDP(1.5),height:heightPercentageToDP(1.5), top:heightPercentageToDP(0.6), borderRadius:heightPercentageToDP(1.5), opacity:0.5, marginHorizontal:5}}>
            </View>
            <Text style={{top:heightPercentageToDP(0.26), color:COLORS.white, fontFamily:'Medium', fontSize:heightPercentageToDP(1.4), marginEnd:5}}>
                {name}
            </Text>
            
            </View>
        </View>

)


}
// const style = StyleSheet.create({
//     teg:{
//         opacity:STYLE.opacity,
//         height:STYLE.height,
//         backgroundColor:selected.backgroundColor
//     }
// });