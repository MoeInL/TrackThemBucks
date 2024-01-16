import {Text, TouchableOpacity, StyleSheet} from "react-native";

export default function CustomCoreButton({title, onPress}) {
    return (
        <TouchableOpacity style = {styles.buttonStyle} onPress = {onPress}>
            <Text style = {styles.textStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#EEE5FF",
        borderRadius: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    textStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#7F3DFF",
    },
});