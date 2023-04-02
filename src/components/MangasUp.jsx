import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput } from 'react-native'
import fondoMangas from "../../images/fondomangas.png"
import { useDispatch, useSelector } from 'react-redux';
import { captureText } from '../store/text/textActions';

export default function MangasUp() {

    

const Search = () => {
  const dispatch = useDispatch();
  const search = useRef(null);
  const text = useSelector((store) => store.text.text);

  const handleSearch = () => {
    dispatch(captureText({ inputText: search.current._lastNativeText }));
  };
}
  return (
    <ImageBackground source={fondoMangas} style={styles.bgImage}>
        <View style={styles.viewMangas}>
            <Text style={styles.titleText}>Mangas</Text>
            <View style={styles.search}>
                <View style={styles.imgSearch} />
                    <TextInput
                        ref={search}
                        style={styles.inputSearch}
                        placeholder="Find your manga here"
                        onChange={handleSearch}
                        value={text}
                        />
                </View>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    bgImage: {
        height: 500,
        resizeMode: "contain",
        justifyContent: "center"
    },
    titleText: {
        color: "white",
        fontSize: 60
    },
    viewMangas: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
})