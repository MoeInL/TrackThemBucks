import { View, Text, StyleSheet } from "react-native";

export default function TitleText({text}){
    return(
        <View style = {styles.componentStyle}>
            <Text style = {styles.textStyle}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle:{
        alignItems: "center",
        height: 78,
        justifyContent: "center",
    },

    textStyle: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        
        width: 277,
    }
})