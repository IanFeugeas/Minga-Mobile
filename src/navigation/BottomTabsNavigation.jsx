import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from '../screens/Index'
import LogIn from "../screens/LogIn"
import Register from "../screens/Register"

const Tab = createBottomTabNavigator()

function BottomTabsNavigation(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Index} options={{ headerShown: false }}/>
            <Tab.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>
            <Tab.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </Tab.Navigator>
    )
}

export default BottomTabsNavigation
