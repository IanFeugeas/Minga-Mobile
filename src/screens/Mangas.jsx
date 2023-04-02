import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, StyleSheet } from 'react-native'
import MangasUp from '../components/MangasUp'

export default function Mangas() {
  return (
    <ScrollView>
        <MangasUp/>
        <ScrollView>
            <Text>Explore</Text>
        </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})
