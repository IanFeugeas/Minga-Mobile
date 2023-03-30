import React from 'react';
import {ImageBackground ,View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import imageBg from "../../images/Backgroundhero.png"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SectionMain() {
  return (   
    <View style={styles.sectionMain}>
     <ImageBackground
      source={imageBg}
      style={styles.background}>
      <View style={styles.viewText}>
        <Text style={styles.title}>For the love of mangas</Text>
        <Text style={styles.subTitle}>
          Explore our varieties
        </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.pButton}>Let's go!</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
);
}

const styles = StyleSheet.create({
    sectionMain: { 
      alignItems: 'center',
      justifyContent: 'center',
    },
    background:{
        width: windowWidth,
        height: windowHeight,
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 388,
        height: 204,
        gap: 25,
        marginBottom: 100
    },
    title: {
      color: "white",
      fontSize: 40,
      fontWeight: 'bold',
      textShadowOffset: {width: 1, height: 8},
      textShadowRadius: 50,
      textAlign: "center"
    },
    subTitle: {
      fontSize: 20,
      color: "white"
    },
    button: {
        width: 140,
        height: 55,
        backgroundColor: 'orange',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pButton: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 24,
        textDecorationLine: 'none',
    },
  });
  
  export default SectionMain;