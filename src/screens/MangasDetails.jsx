import React from 'react'
import { Text, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import actions from '../store/Detail/actions'

const { captureManga } = actions
const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

export default function MangasDetails() {
    const route = useRoute()
    const mangaId = route.params.mangaId
    const dispatch = useDispatch()
    let manga = useSelector(store => store.manga.manga)

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                getManga(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [mangaId]));

    function getManga(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(captureManga({ manga_id: mangaId, headers: headers }))
    }

  return (
    <ScrollView style={{minHeight: windowHeight, backgroundColor: "#ff8c00"}}>
            <View style={styles.ViewPrincipal}>
                <View style={styles.cardDetails}>
                    <Image source={{ uri: manga.cover_photo }} style={styles.imgPrincipal} alt={manga.title} />
                    <Text style={styles.mangaTitle}>{manga.title}</Text>
                    <View style={styles.section2}>
                        <Text style={[styles[`span-${manga.category_id.name}`]]}>{manga.category_id?.name}</Text>
                        <Text style={styles.companyName}> Author: {manga.author_id?.name}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    ViewPrincipal: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    cardDetails:{
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: 400,
        marginTop: 30,
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 16,
        backgroundColor: "black",
        gap: 15
    },
    imgPrincipal: {
        width: '90%',
        height: 300,
        marginTop: 5,
        resizeMode: 'cover',
        borderRadius: 16
    },
    mangaTitle: {
        color: "white",
        fontSize: 20
    },
    section2: {
        display: "flex",
        flexDirection: "row",
        gap: 160
    },
    companyName: {
        color: "white"
    },
    'span-shonen': {
        color: '#EF8481'
    },
    'span-comic': {
        color: '#8883F0'
    },
    'span-shojo': {
        color: '#00BA88'
    },
    'span-seinen': {
        color: '#FC9C57'
    },
})
