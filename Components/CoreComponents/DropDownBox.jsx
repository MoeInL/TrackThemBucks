import {Text, StyleSheet, TouchableOpacity, View, ScrollView, Keyboard} from "react-native";
import { useState } from 'react';
import { useSelector } from "react-redux";

import { AntDesign } from '@expo/vector-icons'; 
import {Ionicons} from '@expo/vector-icons'

export default function CustomButton({title, isPressed, onPress, onPick}){
    const [childChosen, setChildChosen] = useState(false)

    const icons = useSelector(state => state.icons)

    function chooseChild(child){
        setChildChosen(true)
        onPick(child)
    }

    function dropBoxMenu(){
        return(
            <ScrollView style = {styles.menuStyle} horizontal = {true}>
                {icons.map((child) => {
                    return(
                        <TouchableOpacity 
                            style = {[styles.childrenContainer, {backgroundColor: child.background}]} 
                            key={child.name} 
                            onPress={() => chooseChild(child)}
                        > 
                            <Ionicons name = {child.name} size={35} color={child.foreground}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }

    return(
        <View>
            <TouchableOpacity 
                onPress={() => {
                    onPress()
                    Keyboard.dismiss()
                }} 
                style ={styles.containerStyle}
            >
                <Text style = {childChosen? styles.textInputStyleChosen: styles.textInputStyle}>{title}</Text>
                {isPressed? <AntDesign name="caretup" style = {styles.textInputStyle} size={16} marginTop = {2}/>:
                    <AntDesign name="caretdown" style = {styles.textInputStyle} size={16}/>}
            </TouchableOpacity>

            {isPressed? dropBoxMenu(): null}
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle:{
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor:"#F1F1FA",
        borderWidth: 1,
    },

    textInputStyle: {
        opacity: 0.64,
        color: "grey",
    },

    textInputStyleChosen: {
        opacity: 1,
        color: "black",
    },

    menuStyle: {
        backgroundColor: "white",
        position: "absolute",
        top: 42,
        width: "100%",
        padding: 10,
        borderColor:"#F1F1FA",
        borderWidth: 1,
    },

    childrenContainer: {
        borderRadius: 16,
        padding: 8,
        marginHorizontal: 8,
    }
})