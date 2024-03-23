import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../color';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


export default function Publication_Tag(props){
    const [selected, setSelected] = useState({backgroundColor:COLORS.white, height:30, opacity:0.5})
    const [go, setGo] = useState(true)
    const {id, name} = props
    const STYLE = selected
if(go){
    console.log(name)
   

    if(id==1) {
        setSelected({backgroundColor:COLORS.tag1, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
        borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(9.5)
    })
    }
    if(id==2 ) {
        setSelected({backgroundColor:COLORS.tag2, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(5.7), left:widthPercentageToDP(1)
        })
    }
    if(id==3) {
        setSelected({backgroundColor:COLORS.tag3, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(21.5), left:widthPercentageToDP(2)
        })
    }
    if(id==4) {
        setSelected({backgroundColor:COLORS.tag4, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(11), left:widthPercentageToDP(3)
        })
        
    }
    if(id==5) {
        setSelected({backgroundColor:COLORS.tag5, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(8.5), marginVertical:widthPercentageToDP(1)
        })
    }
    if(id==6) {
        setSelected({backgroundColor:COLORS.tag6, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(12.7), marginVertical:widthPercentageToDP(1), left:widthPercentageToDP(1)
        })
    }
    if(id==7) {
        setSelected({backgroundColor:COLORS.tag7, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(10.7),  left:widthPercentageToDP(2),marginVertical:widthPercentageToDP(1)
        })
    }
    setGo(false)
}
    const selectTag=(id)=>{
        
        if(id==1 && global.tag_1==0) {
            global.tag_1 = id
            setSelected({backgroundColor:COLORS.tag1, height:heightPercentageToDP(2.7), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(9.5)
            })
            return;
        }
        if(id==1 && global.tag_1!==0) {
            global.tag_1 = 0
            setSelected({backgroundColor:COLORS.tag1, height:heightPercentageToDP(2.7), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(9.5)
            })
            return;
        }
        if(id==2 && global.tag_2===0) {
            global.tag_2 = id
            setSelected({backgroundColor:COLORS.tag2, height:heightPercentageToDP(2.7), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(5.7), left:widthPercentageToDP(1)
            })
            return;
        }
        if(id==2 && global.tag_2!==0) {
            global.tag_2 = 0
            setSelected({backgroundColor:COLORS.tag2, height:heightPercentageToDP(2.7), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(5.7), left:widthPercentageToDP(1)
            })
            return;
        }
        if(id==3 && global.tag_3===0) {
            global.tag_3 = id
             setSelected({backgroundColor:COLORS.tag3, height:heightPercentageToDP(2.7), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
            borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(21.5), left:widthPercentageToDP(2)
        })
            return;
        }
        if(id==3 && global.tag_3!==0) {
            global.tag_3 = 0
            setSelected({backgroundColor:COLORS.tag3, height:heightPercentageToDP(2.7), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(21.5), left:widthPercentageToDP(2)
            })
            return;
        }
        if(id==4 && global.tag_4===0) {
            global.tag_4 = id
            setSelected({backgroundColor:COLORS.tag4, height:heightPercentageToDP(2.7), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(11), left:widthPercentageToDP(3)
            })
                        return;
        }
        if(id==4 && global.tag_4!==0) {
            global.tag_4 = 0
            setSelected({backgroundColor:COLORS.tag4, height:heightPercentageToDP(2.7), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(11), left:widthPercentageToDP(3)
            })
            return;
        }
        if(id==5 && global.tag_5===0) {
            global.tag_5 = id
            setSelected({backgroundColor:COLORS.tag5, height:heightPercentageToDP(2.8), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(8.5), marginVertical:widthPercentageToDP(1)
            })           
             return;
        }
        if(id==5 && global.tag_5!==0) {
            global.tag_5 = 0
            setSelected({backgroundColor:COLORS.tag5, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(8.5), marginVertical:widthPercentageToDP(1)
            })       
                 return;
        }
        if(id==6 && global.tag_6===0) {
            global.tag_6 = id
            setSelected({backgroundColor:COLORS.tag6, height:heightPercentageToDP(2.8), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(12.7), marginVertical:widthPercentageToDP(1), left:widthPercentageToDP(1)
            })          
              return;
        }
        if(id==6 && global.tag_6!==0) {
            global.tag_6 = 0
            setSelected({backgroundColor:COLORS.tag6, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(12.7), marginVertical:widthPercentageToDP(1), left:widthPercentageToDP(1)
            })         
               return;
        }
        if(id==7 && global.tag_7===0) {
            global.tag_7 = id
            setSelected({backgroundColor:COLORS.tag7, height:heightPercentageToDP(2.8), opacity:1,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(10.7),  left:widthPercentageToDP(2),marginVertical:widthPercentageToDP(1)
            })           
             return;
        }
        if(id==7 && global.tag_7!==0) {
            global.tag_7 = 0
            setSelected({backgroundColor:COLORS.tag7, height:heightPercentageToDP(2.8), opacity:0.5,  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), width:heightPercentageToDP(10.7),  left:widthPercentageToDP(2),marginVertical:widthPercentageToDP(1)
            })           
             return;
        }
    }
    
   
return(
    <TouchableOpacity onPress={()=>{selectTag(id);}}>
        <View style={STYLE}>
            <View style={{flexDirection:'row'}}>
            <View style={{backgroundColor:'white',width:heightPercentageToDP(1.5),height:heightPercentageToDP(1.5), top:heightPercentageToDP(0.6),  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
        borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), left:5, opacity:0.5}}>
            </View>
            <Text style={{left:8, top:heightPercentageToDP(0.26), color:COLORS.white, fontFamily:'Medium', fontSize:heightPercentageToDP(1.4)}}>
                {name}
            </Text>
            <View>

            </View>
            </View>
        </View>
    </TouchableOpacity>
)


}
// const style = StyleSheet.create({
//     teg:{
//         opacity:STYLE.opacity,
//         height:STYLE.height,
//         backgroundColor:selected.backgroundColor
//     }
// });