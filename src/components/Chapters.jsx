import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/Detail/actions'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'
import { Image } from 'react-native'
import Comment from '../../images/comment.png'
import chapterClickActions from '../store/ChapterClicked/actions'
import { useNavigation } from '@react-navigation/native';

const { read_chapters } = actions
const { chapterClicked } = chapterClickActions

function Chapters() {
    const route = useRoute();
    const mangaId = route.params.mangaId;
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    let [token, setToken] = useState('')
    let chapters = useSelector(store => store.chapters.chapters)
    let [checkChapter, setCheckChapter] = useState(false)


    function handleChapterCheck() {
        setCheckChapter(true)
    }

    let manga = useSelector(store => store.chapters.manga)

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
                getChapters(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [mangaId]));

    function getChapters(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(read_chapters({ manga_id: mangaId, page: page, headers: headers}))
    }

    useEffect(() => {
        if (token) {
            getChapters(token)
        }
    }, [page])

    const navigation = useNavigation()
    function handleRead(e,id){
        dispatch(chapterClicked({state: true}))
        setTimeout( () => {
            navigation.navigate('Chapter',{chapterId: _id, mangaId: mangaId});
        }, 100)
    }

    return (
        <>
            <View style={styles.chaptersOn}>
                <TouchableOpacity style={[styles.mangaBtn, checkChapter ? styles.checked : '']} onPress={handleChapterCheck}>
                    <Text style={checkChapter ? styles.checkedText : styles.btncheckChapter}>Chapters</Text>
                </TouchableOpacity>
            </View>
            {
                checkChapter ? 
                <View style={{ gap: 20}}>
                    {
                        chapters?.length > 0
                            ?
                            chapters.map((chapter, i) => {
                                return (
                                    <View style={styles.chapterCard} key={i}>
                                        <Image style={styles.imgChapter} source={{ uri: chapter.cover_photo }} alt={chapter.title} />
                                        <View style={styles.orderChapter}>
                                            <Text style={styles.textChapter}>Chapter #{chapter.order}</Text>
                                            <View style={styles.comentChapter}>
                                                <Image style={styles.commentImg} source={Comment} alt="icono-coment" />
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.btnRead} onPress={(event) => handleRead(event, chapter._id)}><Text style={styles.btnReadText}>Read</Text></TouchableOpacity>
                                    </View>
                                )
                            })
                            :
                            <Text>No Chapter founded</Text>
                    }
                    <View style={styles.divChapter}>
                        { page===1 ? <></> : <TouchableOpacity style={styles.btnChapter} onPress={() => { setPage(page - 1) }}>
                            <Text style={styles.btnNextPrev}>Prev</Text>
                        </TouchableOpacity> }
                        { chapters.length === 4 ? <TouchableOpacity style={styles.btnChapter} onPress={() => { setPage(page + 1) }}>
                            <Text style={styles.btnNextPrev}>Next</Text>
                        </TouchableOpacity> : <></> }
                    </View>

                </View> : <></>
            }
        </>
    )
}
const styles = StyleSheet.create({
    chaptersOn: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 60
    },
    mangaBtn: {
        backgroundColor: "black",
        width: 130,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center",
    },
    checkedText: {
        color: "orange",
        fontSize: 20
    },
    chapterCard: {
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 16,
        width: "90%",
        height: 180,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
        marginLeft: 20
        
    },
    commentImg: {
        width: 30,
        height: 30
    },
    imgChapter: {
        width: "55%",
        height: "100%",
        borderRadius: 16
    },
    orderChapter: {
        justifyContent: "center",
        alignItems: "center",
        gap: 100,
        paddingLeft: 10

    },
    textChapter: {
        color: "white",
        fontSize: 17
    },
    btnRead: {
        backgroundColor: "orange",
        width: 50,
        height: 30,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        
    },
    divChapter:{
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
        gap: 10

    },
    btncheckChapter: {
        color: "orange"
    },
    btnChapter:{
        backgroundColor: "black",
        width: 50,
        height: 30,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    btnNextPrev: {
        color: "orange"
    }





})

export default Chapters