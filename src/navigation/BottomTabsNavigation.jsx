import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Register from "../components/Register"
import Form from "../screens/Form"
import Mangas from "../screens/Mangas"
import LogIn from "../components/LogIn";
import Index from "../screens/Index"
import Logout from "../screens/Logout";
import MangasDetails from "../screens/MangasDetails";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

function BottomTabsNavigation(){
    let [token, setToken] = useState("")
    let state = useSelector((store) => store.tabsReducer.state)
    let mangaClicked = useSelector((store) => store.mangasPagination.state)
    let chapterClicked = useSelector((store) => store.chapterClickReducer.state)

    useFocusEffect(React.useCallback(() =>{
        async function getData(){
            try{
                const value = await AsyncStorage.getItem("token")
                setToken(value)
            } catch(error) {
                console.log(error)
            }
        }
        getData()
    }, [state, mangaClicked, chapterClicked]))

    return (
        <Tab.Navigator 
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#111111",
            borderTopColor: "transparent",
            height: 55,
            paddingBottom: 5,
            paddingTop: 5,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            marginBottom: 5,
          },
          tabBarActiveTintColor: "#ff8c00",
          tabBarInactiveTintColor: "#9B9B9B",
          tabBarTabStyle: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}>
            
            <Tab.Screen name="Home" 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" size={size} color={color} />
                ),
              }} component={Index} initialParams={{state: "Register"}}/>
            {token ? <></>
            :
            <>
            <Tab.Screen name="Register" 
             options={{
                headerShown: false,
                tabBarLabel: 'Register',
                tabBarIcon: ({ color }) => (
                <FontAwesome name="user-circle" size={24} color={color} />
            ),
          }} component={Form} initialParams={{ state: 'Register' }}/>

            <Tab.Screen name="LogIn"  options={{
               headerShown: false,
               tabBarLabel: "LogIn",
               tabBarIcon: ({ color }) => (
                <AntDesign name="login" size={24} color={color} />
              ),
               }} component={Form} initialParams={{ state: 'Login' }}/>
            </>
            }
            {token ? <Tab.Screen options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="book" size={24} color={color} />
                ),
              }} name="Mangas" component={Mangas}/>: <></>}
              {token && mangaClicked ? <Tab.Screen options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="info" size={24} color={color} />
                  ),
                }} name="Details" component={MangasDetails}/>: <></>}
            {token ? <Tab.Screen options={{
               headerShown: false,
               tabBarLabel: "LogOut",
               tabBarIcon: ({ color }) => (
                <AntDesign name="logout" size={24} color={color} />
              ),
               }} name='LogOut' component={Logout}/> : <></>}
        </Tab.Navigator>
    )
}

export default BottomTabsNavigation
