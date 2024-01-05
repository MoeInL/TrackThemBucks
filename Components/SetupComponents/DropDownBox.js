import {Text, StyleSheet, TouchableOpacity, View} from "react-native";

import { AntDesign } from '@expo/vector-icons'; 

export default function CustomButton({title, children, isPressed, onPress}){
    let key = 0;

    function dropBoxMenu(){
        return(
            <View style = {styles.menuStyle}>
                {children.map((child) => {
                    return(
                        <TouchableOpacity style = {styles.childrenContainer} key={child[1]}>
                            <Text>{child[0]}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return(
        <View>
            <TouchableOpacity onPress={onPress} style ={styles.containerStyle}>
                <Text style = {styles.textInputStyle}>{title}</Text>
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

    menuStyle: {
        backgroundColor: "white",
        position: "absolute",
        top: 42,
        width: "100%",
        padding: 5,
        borderColor:"#F1F1FA",
        borderWidth: 1,
        gap: 5,
    },

    childrenContainer: {
        padding: 8,
    }
})