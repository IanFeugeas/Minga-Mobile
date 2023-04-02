import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from '../screens/Index'
import Register from "../screens/Register"
import Mangas from "../screens/Mangas"

const Tab = createBottomTabNavigator()

function BottomTabsNavigation(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Index} options={{ headerShown: false }}/>
            <Tab.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Tab.Screen name="Mangas" component={Mangas} options={{ headerShown: false }}/>
        </Tab.Navigator>
    )
}

export default BottomTabsNavigation
