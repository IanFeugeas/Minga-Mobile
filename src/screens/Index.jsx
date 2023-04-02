import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SectionMain from "../components/Hero";
import LogIn from "./LogIn"

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
            <LogIn/>
        </ScrollView>
    );
}

export default Index