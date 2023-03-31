import { Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SectionMain from "../components/Hero";
import Register from "./Register"

function Index() {

    const user = {
        name: 'Ian Fabricio',
        lastName: 'Feugeas'
    }

    AsyncStorage.setItem('user', JSON.stringify(user))
        .then(res => console.log(res))
        .catch(err => console.log(err))

    return (
        <ScrollView>
            <SectionMain/>
            <Register/>
        </ScrollView>
    );
}

export default Index