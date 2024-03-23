import { useNavigation } from "@react-navigation/core"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert,Image, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { ip_address } from "../config";
import { COLORS } from "../color";


const styles = StyleSheet.create({
  maincontainer:
    {
width:'100%'    ,
height:'100%',
backgroundColor:'#F9F1E5'
},
    image:
    {
      width:widthPercentageToDP(100),
      height:heightPercentageToDP(100)
    },
    logoLogin:{
      width:214,
      height:124,
      position:'absolute',
      alignSelf:'center',
      top:95
    },
    loginBlur:{
      position:'absolute',
      width:292,
      height:303,
    },
    formcontainer:
    {
      position:'absolute',
      width:292,
      height:303,
      alignSelf:'center',
       top:67,
      bottom:190
    },
    title:{
      position:'absolute',
      alignSelf:'center',
      fontFamily:'Black',
      fontSize:24,
      textTransform:'lowercase',
      top:28
    },
    textLogin:
    {
position:'absolute',
fontFamily:'Black',
fontSize:10,
textTransform:'lowercase',
top:77,
left:25
},
textPassword:
    {
position:'absolute',
fontFamily:'Black',
fontSize:10,
textTransform:'lowercase',
top:148,
left:25
},
    textinputLogin:
    {
      position:'absolute',
      width:242,
      height:44,
      borderRadius:5,
      borderWidth:2,
      alignSelf:'center',
      top:94,
      fontFamily:'Black',
      fontSize:16,
      padding:10,
    },
    textinputPassword:
    {
      position:'absolute',
      width:242,
      height:44,
      borderRadius:5,
      borderWidth:2,
      alignSelf:'center',
      top:165,
      fontFamily:'Black',
      fontSize:16,
      padding:10
    },
    touchableopacity:
    {
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      height:35,
      width:180,
      backgroundColor:COLORS.blue,
      top:234,
      borderRadius:5
    },
    texttouchableopacity:
    {
      color:'#fff',
      position:'absolute',
      fontFamily:'Black',
      fontSize:15,
      textTransform:'uppercase'
    },
    photoLogin:{
      position:'absolute',
      bottom:150,
      left:widthPercentageToDP(8)
    },
    signalLogin:{
      position:'absolute',
      bottom:370,
      left:widthPercentageToDP(50)
    }

    

})

const classnames = 
[
  {
    "image": "absolute",
    "formcontainer": "rounded-2xl border-2",
    "textinput": "w-3/4  border-2 rounded-2xl",
    "text": "text-2xl",
    "touchableopacity": "w-1/4  border-2 rounded-2xl"

  }
]



export default function LoginScreen(){

  const {navigate} = useNavigation()
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickName] = useState('')

    const [activeTab, setActiveTab] = useState(1);


    const sendData = async () =>{
       
        if(activeTab==2){
          if(password !=''&& login!=''&& nickname!=''){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "nickname": nickname.toLowerCase(),
              "login": login.toLowerCase(),
              "pass": password.toLowerCase()
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/user', requestOptions)
              .then(response => response.json())
              .then(async result => {
                console.log(result)})
              .catch(error => console.log('error', error));
              Alert.alert('Вы успешно зарегистрировались!', '', [
                {
                  text: 'Отлично!',
                  onPress: () => {setActiveTab(1)},
                }
              ]);
    
            }
            else{
              Alert.alert('Ошибка!', '', [
                {
                  text: 'Проверьте данные!',
                 
                }
              ]);
            }
           
        }
        else{
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "login": login.toLowerCase(),
          "password": password.toLowerCase()
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(ip_address+'/getuser', requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            
            global.userNickName = result[0].nickname
            global.user_id = result[0].id
            global.user_avatar = result[0].avatar
            if(result!="Данные не совпадают! Проверьте и повторите попытку") {
                navigate('Главный экран')
            }
            else {
                 Alert.alert('Авторизация',
                    result ,[
                    {
                      text: 'ОК'
                    }
                   ])  
            }
          
        })
          .catch(error => console.log('error', error));
        }
        
    } 
    
 



 

  if(activeTab==1){
    return(
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.white, justifyContent: 'center' }}>
    <View style={{ maxWidth: '75%', paddingHorizontal: 8 }}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 999 }}>

        <TouchableOpacity style={{ width: '33.333%', overflow: 'hidden', borderRadius: 999,backgroundColor:'white'}} >
          <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'gray' }}>Вход</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '33.333%', overflow: 'hidden', borderRadius: 999 }} onPress={()=>{setActiveTab(2);console.log(activeTab)}}>
          <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'gray' }}>Регистрация</Text>
        </TouchableOpacity>

      </View>
      
      <View style={styles.formcontainer}>
            <Image source={require('../assets/images/loginBlur.png')} style={styles.loginBlur}/>
            <Text style={styles.title}>вход</Text>
              <Text  style={styles.textLogin}>
                Логин
              </Text>

              <TextInput
              style={styles.textinputLogin}

              onChangeText={setLogin}
              value={login}
              />

              <Text style={styles.textPassword}>
                Пароль
              </Text>

              <TextInput
              secureTextEntry={true}
              style={styles.textinputPassword}
              onChangeText={setPassword}
              value={password}/>

              <TouchableOpacity  style={styles.touchableopacity}  onPress={()=>{sendData();}}>
                <Text style={styles.texttouchableopacity}>
                  Вход
                </Text>
              </TouchableOpacity>
              
            </View>
    </View>
  </View>
  );
  }
  else{
  return (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.white, justifyContent: 'center' }}>
    <View style={{ maxWidth: '75%', paddingHorizontal: 8 }}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 999 }}>

      <TouchableOpacity style={{ width: '33.333%', overflow: 'hidden', borderRadius: 999}} onPress={()=>{setActiveTab(1);console.log(activeTab)}}>
          <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'gray' }}>Вход</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '33.333%', overflow: 'hidden', borderRadius: 999,backgroundColor:'white' }} >
          <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'gray' }}>Регистрация</Text>
        </TouchableOpacity>

      </View>
      
      <View style={styles.formcontainer}>
            <Image source={require('../assets/images/loginBlur.png')} style={styles.loginBlur}/>
            <Text style={styles.title}>Регистрация</Text>
            <Text  style={[styles.textLogin,{top:-15}]}>
                Никнейм
              </Text>

              <TextInput
              style={[styles.textinputLogin,{top:0}]}

              onChangeText={setNickName}
              value={nickname}
              />
              <Text  style={styles.textLogin}>
                Логин
              </Text>

              <TextInput
              style={styles.textinputLogin}

              onChangeText={setLogin}
              value={login}
              />

              <Text style={styles.textPassword}>
                Пароль
              </Text>

              <TextInput
              secureTextEntry={true}
              style={styles.textinputPassword}
              onChangeText={setPassword}
              value={password}/>          

              <TouchableOpacity  style={styles.touchableopacity}  onPress={()=>{sendData();}}>
                <Text style={styles.texttouchableopacity}>
                  Регистрация
                </Text>
              </TouchableOpacity>
              
            </View>
    </View>
  </View>
  );
  }
}