import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Register from "../components/Register"
import Mangas from "../screens/Mangas"
import LogIn from "../components/LogIn";
import Index from "../screens/Index"
import Logout from "../screens/Logout";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

function BottomTabsNavigation(){
    let [token, setToken] = useState("")
    let state = useSelector(store => store)

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
    }, [state]))
    return (
        <Tab.Navigator 
            tabBarOptions={{
            style: {
              backgroundColor: 'orange',
              borderTopColor: 'transparent',
              height: 55,
              paddingBottom: 5,
              paddingTop: 5,
              elevation: 0,
              shadowOpacity: 0,
            },
            labelStyle: {
              fontSize: 10,
              marginBottom: 5,
            },
            activeTintColor: 'orange',
            inactiveTintColor: '#9B9B9B',
            tabStyle: {
              paddingTop: 0,
              paddingBottom: 0,
            },
            
          }}>
            <Tab.Screen name="Home" component={Index} initialParams={{state: "register"}}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                    <FontAwesome name="home" size={30} color={color} />
                ),
              }}/>
            {token ? <></>
            :
            <>
            <Tab.Screen name="Register" component={Register}
             options={{
                headerShown: false,
                tabBarLabel: 'Register',
                tabBarIcon: ({ color }) => (
                <FontAwesome name="user-circle-o" size={24} color={color} />
            ),
          }}/>
            <Tab.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>
            </>
            }
            {token ? <Tab.Screen name="Mangas" component={Mangas}
              options={{
                headerShown: false,
                tabBarLabel: 'Mangas',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="book" size={24} color={color} />
                ),
              }}/>: <></>}
            {token ? <Tab.Screen name='LogOut' component={Logout} options={{ headerShown: false,}}/> : <></>}
        </Tab.Navigator>
    )
}

export default BottomTabsNavigation
