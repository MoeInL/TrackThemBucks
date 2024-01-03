import {View, StyleSheet, Text, TouchableOpacity} from "react-native";

export default function CustomButton({text, onPress}){
    return(
        <View style = {styles.componentStyle}>
            <TouchableOpacity style = {styles.buttonStyle} onPress = {onPress}>
                <Text style = {styles.textStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle:{
        alignItems: "center",
    },

    buttonStyle: {
        backgroundColor: "#7F3DFF",
        padding: 10,
        borderRadius: 12,
        width: "100%",
    },

    textStyle: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        color: "white",
    }
})