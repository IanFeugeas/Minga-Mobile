import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SectionMain from "../components/Hero";
import Form from "./Form"

export default function Index() {
    let state = "register"
    let [token, setToken] = useState("")

    useFocusEffect(React.useCallback(() =>{
        async function getData(){
            try{
                const value = await AsyncStorage.getItem("token")
                setToken(value)
            }catch(error){
                console.log(error)
            }
        }
        getData()
    }, [state]))

    return (
        <ScrollView>
            <SectionMain/>
            {token ? "" : <Form state={state} />}
        </ScrollView>
    );
}
