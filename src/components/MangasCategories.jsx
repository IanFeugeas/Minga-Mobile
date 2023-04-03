// import React from 'react'
// import { Text, View, TouchableOpacity } from 'react-native'
// import { StyleSheet } from 'react-native'
// import { useState, useEffect} from 'react'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import categoriesActions from "../store/Categories/actions"

// let categoriesCheck = []

// export default function MangasCategories() {

//     const [categories, setCategories] = useState(false)
//     const {captureCheck} = categoriesActions
//     const dispatch = useDispatch()

//     let checkedCategories = useSelector(store => store.categories.categories)
    
//     let categoriesUrl = "https://minga-grupoblanco.onrender.com/api/category"
//     console.log(checkedCategories)
//     useEffect(() =>{
//         axios.get(categoriesUrl).then(e => setCategories(e.data.categories))
//     }, [])

//     function handleCheck(e, categoryName){
//         categories.forEach(category => {
//             if (category.name === categoryName){
//                 if (!categoriesCheck.includes(category._id)){
//                     categoriesCheck.push(category._id)
//                 } else{
//                     categoriesCheck = categoriesCheck.filter(e => e !== category._id)
//                 }
//                 dispatch(captureCheck({ categories: categoriesCheck.join()}))
//             }
//         })
//     }
//   return (
//     <View style={styles.mangasCat}>
//             {
//                 categories ? categories.map((category, i) => {
//                     let checkclass = checkedCategories.includes(category._id) ? "checked" : ""
//                     return <TouchableOpacity style={[styles[`category-${category.name}`], checkclass && styles.checked]} key={i} onPress={(event) => handleCheck(event, category.name)} categoryName={category.name} >
//                         <Text style={[styles[`text-${category.name}`]]}>{category.name}</Text>
//                     </TouchableOpacity>
//                 }) : ""
//             }
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     mangasCat: {
//         display: 'flex',
//         flexDirection: 'row',
//         marginHorizontal: 5,
//         gap: 8,
//         marginBottom: 20,
//     },
//     'category-shonen': {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 65,
//         height: 35,
//         borderRadius: 50,
//         fontWeight: '500',
//         fontSize: 12,
//         backgroundColor: '#FFE0DF',
//     },
//     'category-comic': {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 65,
//         height: 35,
//         borderRadius: 50,
//         fontWeight: '500',
//         fontSize: 12,
//         backgroundColor: '#E0DBFF',
//     },
//     'category-shojo': {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 65,
//         height: 35,
//         borderRadius: 50,
//         fontWeight: '500',
//         fontSize: 12,
//         backgroundColor: '#D1FBF0',
//     },
//     'category-seinen': {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 65,
//         height: 35,
//         borderRadius: 50,
//         fontWeight: '500',
//         fontSize: 12,
//         backgroundColor: '#FFDFC8',
//     },
//     'text-shonen': {
//         color: '#EF8481',
//     },
//     'text-comic': {
//         color: '#8883F0',
//     },
//     'text-shojo': {
//         color: '#00BA88',
//     },
//     'text-seinen': {
//         color: '#FC9C57',
//     },
//     checked: {
//         borderColor: 'rgba(0, 0, 0, 0.5)',
//         borderWidth: 1,
//         opacity: 0.5,
//         transform: [
//             { scale: 1.1 }
//         ]
//     }
// })

import React from 'react'
import { Text, View, Image, Button } from 'react-native'
import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import categoriesActions from '../store/Categories/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'

let categoriesCheck = []

function MangasCategories() {
    const [categories, setCategories] = useState(false)
    const { captureCheck } = categoriesActions
    const dispatch = useDispatch()

    let checkedCategories = useSelector(store => store.categories.categories)

    let categoriesUrl = "https://minga-grupoblanco.onrender.com/api/category"
    useEffect(() => {
        axios.get(categoriesUrl).then(e => setCategories(e.data.data))
    }, [])

    function handleCheck(e, categoryName) {
        categories.forEach(category => {
            if (category.name === categoryName) {
                if (!categoriesCheck.includes(category._id)) {
                    categoriesCheck.push(category._id)
                } else {
                    categoriesCheck = categoriesCheck.filter(e => e !== category._id)
                }
                dispatch(captureCheck({ categories: categoriesCheck.join() }))
            }
        })
    }

    return (
        <View style={styles.mangasType}>
            {
                categories ? categories.map((category, i) => {
                    let checkclass = checkedCategories.includes(category._id) ? "checked" : ""
                    return <TouchableOpacity style={[styles[`category-${category.name}`], checkclass && styles.checked]} key={i} onPress={(event) => handleCheck(event, category.name)} categoryName={category.name} >
                        <Text style={[styles[`text-${category.name}`]]}>{category.name}</Text>
                    </TouchableOpacity>
                }) : ""
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mangasType: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        marginHorizontal: 5,
        gap: 8,
        marginBottom: 20,
    },
    'category-shonen': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#FFE0DF',
    },
    'category-comic': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#E0DBFF',
    },
    'category-shojo': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#D1FBF0',
    },
    'category-seinen': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#FFDFC8',
    },
    'text-shonen': {
        color: '#EF8481',
    },
    'text-comic': {
        color: '#8883F0',
    },
    'text-shojo': {
        color: '#00BA88',
    },
    'text-seinen': {
        color: '#FC9C57',
    },
    checked: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        opacity: 0.5,
        transform: [
            { scale: 1.1 }
        ]
    }
})

export default MangasCategories