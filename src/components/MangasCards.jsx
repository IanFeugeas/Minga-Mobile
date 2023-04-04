import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import mangasActions from "../store/Mangas/actions";
import mangasClickActions from "../store/MangasPagination/actions"
import AsyncStorage from '@react-native-async-storage/async-storage';

const { read_mangas } = mangasActions
const { mangasPagination } = mangasClickActions

export default function MangasCards() {

    let text = useSelector(store => store.text.text)
    let order = useSelector(store => store.order.order)
    let mangas = useSelector(store => store.mangas.mangas)
    let categories = useSelector(store => store.categories.categories)
    let [text1,setText1] = useState(useSelector(store => store.text.text))
    let [page,setPage] = useState(1)
    let [token,setToken] = useState('')
    const dispatch = useDispatch()

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []));

    function getMangas(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(read_mangas({ page: page, inputText: text, categories: categories, order: order, headers }))
    }
    useEffect( () => {
        setText1(text)
        getMangas(token)
    }, [page, text, categories, order, token]);

    const navigation = useNavigation()
    
    function handleRead(e, id) {
        dispatch(mangasPagination({state: true}))
        setTimeout( () => {
            navigation.navigate('Details',{mangaId: id});
        }, 100)
    }

    return (
        <View style={styles.mangasCards}>
          {
            mangas ? ( mangas.length ? ( mangas.map((manga, i) => {
                return (
                  <View style={styles.card} key={i}>
                    <View style={styles.cardText}>
                      <View style={[styles[`cardColor-${manga.category_id.name}`]]} />
                      <View style={styles.divTextRead}>
                        <View style={styles.text}>
                          <Text style={styles.title}>{manga.title}</Text>
                          <Text style={[styles[`span-${manga.category_id.name}`]]}>
                            {manga.category_id.name}
                          </Text>
                        </View>
                        <TouchableOpacity style={[styles[`cardAnchor-${manga.category_id.name}`]]} onPress={(event) => handleRead(event, manga._id)}>
                          <Text style={styles.read}>Details</Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.cardImg}>
                      <Image style={styles.imgCard} source={{ uri: manga.cover_photo }} />
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.noMangas}>Mangas not found</Text>
            )
          ) : (
            <View />
          )}
          <View style={styles.pageBtns}>
                {
                    page === 1 ? <></> :
                        <TouchableOpacity style={styles.btns} onPress={() => {setPage(page-1)}}>
                            <Text style={styles.btnsText}>Prev</Text>
                        </TouchableOpacity>
                }
                {
                    mangas.length == 6 || mangas.length == 10 ?
                        <TouchableOpacity style={styles.btns} onPress={() => {setPage(page+1)}}>
                            <Text style={styles.btnsText}>Next</Text>
                        </TouchableOpacity> : <></>
                }
            </View>
        </View>
      );
    };

const styles = StyleSheet.create({
    mangasCards: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 150,
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    divTextRead:{
        gap: 20
    },
    cardText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        gap: 15,
    },
    title: {
        fontSize: 20,
        color: '#222222',
    },
    imgCard: {
        width: 125,
        height: 148,
        borderRadius: 10
    },
    'cardColor-shonen': {
        height: 120,
        borderWidth: 3,
        borderColor: '#EF8481'
    },
    'cardColor-comic': {
        height: 120,
        borderWidth: 3,
        borderColor: '#8883F0'
    },
    'cardColor-shojo': {
        height: 120,
        borderWidth: 3,
        borderColor: '#00BA88'
    },
    'cardColor-seinen': {
        height: 120,
        borderWidth: 3,
        borderColor: '#FC9C57'
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
    'cardAnchor-shonen':{
        backgroundColor: "#EF8481",
        width: 60,
        height: 30,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    'cardAnchor-comic':{
        backgroundColor: "#8883F0",
        width: 60,
        height: 30,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    'cardAnchor-shojo':{
        backgroundColor: "#00BA88",
        width: 60,
        height: 30,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    'cardAnchor-seinen':{
        backgroundColor: "#FC9C57",
        width: 60,
        height: 30,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    read:{
        color: "white",
        fontSize: 16
    },
    pageBtns:{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        gap: 10,
        width: 70,
        height: 30

    },
    btns: {
        backgroundColor: "#2e8b57",
        borderRadius: 16,
        width: 60,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    btnsText:{
        color: "white",
        fontSize: 16
    }
})

