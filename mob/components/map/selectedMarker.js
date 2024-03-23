import {View, Text, StyleSheet} from 'react-native';
import { COLORS } from '../../color';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


export default function SelectedMarker(props){
   
    const {id,name,altitude,longitute} = props
   
return(
   
        <View style={styles.container}>
            <View style={styles.circle}>
                    <Text style={styles.number}>
                        {id}
                    </Text>
            </View>
            <Text style={styles.name}>
                {name}
            </Text>
            <View>

            </View>
        </View>
)

}
const styles = StyleSheet.create({
    container:{
        borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
                borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5),
                backgroundColor:COLORS.white,
                flexDirection:'row',
                height:heightPercentageToDP(3.5),
                alignItems:'center',
                marginVertical:heightPercentageToDP(0.4),
                marginEnd:heightPercentageToDP(0.8)

    },
    circle:{
        backgroundColor:COLORS.black,width:heightPercentageToDP(2.3),height:heightPercentageToDP(2.3),  borderBottomEndRadius:heightPercentageToDP(1.5),borderTopEndRadius:heightPercentageToDP(1.5),
        borderTopStartRadius:heightPercentageToDP(1.5), borderBottomStartRadius:heightPercentageToDP(1.5), marginHorizontal:widthPercentageToDP(1), opacity:1, justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontFamily:'Bold',
        fontSize:heightPercentageToDP(1.5),
        marginEnd:widthPercentageToDP(2)
    },
    number:{
        fontFamily:'Medium',
        fontSize:heightPercentageToDP(1.5),
        color:COLORS.white,
        top:heightPercentageToDP(-0.1)
    }
})

