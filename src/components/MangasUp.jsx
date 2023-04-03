import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput, Image } from 'react-native'
import fondoMangas from "../../images/fondomangas.png"
import { useDispatch } from 'react-redux';
import textActions from '../store/Search/actions';
import lupa from "../../images/Search.png"

const { captureText } = textActions

export default function MangasUp() {

  const dispatch = useDispatch()
  function handleSearch(text) {
    dispatch(captureText({ inputText: text}))
  }

  return (
    <ImageBackground source={fondoMangas} style={styles.bgImage}>
        <Text style={styles.titleText}>Mangas</Text>
        <View style={styles.search}>
            <Image source={lupa} style={styles.lupa}/>
            <TextInput style={styles.inputSearch} placeholder='Find your manga here' onChangeText={handleSearch}/>            
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    bgImage: {
        height: 400,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "center",
        gap: 40
    },
    titleText: {
        color: "white",
        fontSize: 60
    },
    search: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: 380,
      height: 50,
      borderRadius: 15,
      backgroundColor: "white",
      gap: 5,
      paddingLeft: 10
    },
    inputSearch: {
      alignItems: "center",
      width: 360,
      height: 50,
    },
    viewMangas: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
})