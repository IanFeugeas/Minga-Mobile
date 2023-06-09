import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import tabsActions from "../store/ReloadTabs/actions"
import mangasClickActions from '../store/MangasPagination/actions';
import chapterClickActions from '../store/ChapterClicked/actions';
import google from "../../images/Google.png"
import arroba from "../../images/arroba.png"
import lock from "../../images/lock2.png"
import { ScrollView } from 'react-native';
import logo from "../../images/logoWellcome.png"
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from "react-native"

const { mangasClicked} = mangasClickActions
const { reloadTabs } = tabsActions
const { chapterClicked} = chapterClickActions

export default function LoginForm({ setRender }) {
    const navigation= useNavigation()
    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let state = useSelector((store) => store.tabsReducer.state)
    let dispatch = useDispatch()

    async function handleSubmit() {
        setLoading(true)

        let data = {
            mail: email,
            password: password
        }
        console.log(data);
        let url = 'https://minga-grupoblanco.onrender.com/api/signin/'
        let admin
        let author
        try {
            await axios.post(url, data).then(res =>{
              res.data.user.is_admin ? (admin = true) : (admin = false)
              res.data.user.is_author ? (author = true) : (author = false)
              AsyncStorage.setItem("token", res.data.token)
              AsyncStorage.setItem("user",JSON.stringify({
                id: res.data.user._id,
                name: res.data.user.name,
                mail: res.data.user.mail,
                photo: res.data.user.photo,
                admin,
                author
              }))
              dispatch(reloadTabs({ state: !state }))
              dispatch(mangasClicked({ state: false }))
              dispatch(chapterClicked({ state: false }))
              setLoading(false)
              setTimeout(() => navigation.navigate("Home"), 1000)
            })
            console.log('Login Succesful')
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

  return (
    <ScrollView>
      <View style={styles.welcome}>
        <View style={styles.titleWelcome}>
            <Text style={styles.textTitle}>Minga</Text>
            <Image source={logo} style={styles.logo} />
        </View> 
        <Text style={styles.welcomeH2}> Welcome! </Text>
        <Text style={styles.welcomeText}>Discover manga, manhua and manhwa, track your progress, have fun, read manga</Text>
      </View>
      <View style={styles.containerLogIn}>
        <View style={styles.fieldset}>
          <Text style={styles.legend}>Email</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} id="mail" name="mail" required onChangeText={(inputText => setEmail(inputText))} />
            <Image style={styles.imagenInput} source={arroba}/>
          </View>
          
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Password</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} secureTextEntry={true} id="password" name="password" required onChangeText={(inputText => setPassword(inputText))} />
            <Image style={styles.imagenInput} source={lock}/>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.divGoogle}>
          <TouchableOpacity style={styles.button2} onPress={() => {}}>
            <Image style={styles.googleImg} source={google} />
            <Text style={styles.buttonText2}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.parrafosForm}>
          <Text>
          You don't have an account yet?
            <Text style={styles.parrafosFormText} onPress={() => {
                setRender("Register");
              }}> Sign up</Text> 
          </Text>
        </View>
      </View>
      <Spinner visible={loading}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerLogIn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    marginTop: 50,
    width: "100%",
  },
  fieldset: {
    display: "flex",
    alignItems: "flex-start",
    width: 410,
    height: 65,
    width: "90%",
    justifyContent: "flex-start",
    background: "#EBEBEB",
    borderBottomWidth: 1,
  },
  legendCont:{
    display: "flex",
    width:"100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imagen:{
    width: 19,
    height: 19,
    marginBottom: 10,
  },
  imagenInput: {
    width: 19,
    height: 19
  },
  googleImg: {
    width: 30,
    height:30
  },
  buttonText2:{
    color: "gray"
  },
  legend: {
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 1,
    fontWeight: 500,
    color: "#ff8c00",
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    height: 45,
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#ff8c00",
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  
  buttonText: {
    color: "white",
    fontSize: 20
  },

  button2: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 60,
    margin: 15,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 20
  },
  
  buttonText3: {
    color: "grey"
  },

  divGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 410,
    height: 16,
    borderRadius: 10,
    background: "#EBEBEB",
    border: 1,
  },

  parrafosForm: {
    display: "flex",
    gap: 17,
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  parrafosFormText:{
    color: "#ff8c00",
    fontWeight: 700,
  },
  welcome: {
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 100

},
titleWelcome: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
},
logo: {
},
textTitle: {
  color: "#ff8c00",
  fontSize: 40,
  paddingBottom: 6
},
welcomeH2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
},
welcomeText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 20,
}
});