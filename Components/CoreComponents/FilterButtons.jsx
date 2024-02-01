import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilterButtons({title, onPress, isPressed}) {
    return(
        <TouchableOpacity 
            style = {isPressed? [styles.buttonStyle, {backgroundColor:'#EEE5FF'}]: styles.buttonStyle} 
            onPress = {() => onPress()}
        >
            <Text style = {isPressed? [styles.textStyle, {color: '#7F3DFF'}]: styles.textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E3E5E5",
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },

    textStyle: {
        fontSize: 14,
        fontWeight: "500",
    },
})