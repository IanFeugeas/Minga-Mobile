import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, StyleSheet } from 'react-native'
import MangasUp from '../components/MangasUp'
import { Dimensions } from 'react-native'
import MangasCategories from '../components/MangasCategories'
import MangasCards from '../components/MangasCards'

const windowHeight = Dimensions.get('window').height;

export default function Mangas() {
  return (
    <ScrollView>
        <MangasUp/>
        <ScrollView style={styles.sectionCards}>
            <Text style={styles.explore}>Explore</Text>
            <MangasCategories/>
            <MangasCards/>
        </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sectionCards: {
    display: 'flex',
    padding: 10,
    width: '100%',
    minHeight: windowHeight,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    marginTop: -80
  },
  explore:{
     marginLeft: 150,
     marginTop: 10,
     marginBottom: 10,
     fontWeight: 'bold',
     fontSize: 25,
  }

})
