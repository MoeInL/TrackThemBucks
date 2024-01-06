import { View, Text, StyleSheet } from "react-native";

export default function SmallText({text}){
    return(
        <View style = {styles.componentStyle}>
            <Text style = {styles.textStyle}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle:{
        alignItems: "center",
        marginTop: 15,
    },

    textStyle: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        width: 277,
        color: "#91919F"
    }
})