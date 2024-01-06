import {Text, Pressable, StyleSheet, View} from 'react-native';

export default function CustomCheckBox({text, pressableText, pressed, onPress}) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <View style = {pressed? [styles.checkBoxStyle, styles.checkboxPressed]: styles.checkBoxStyle}/>
            </Pressable>
            <Text style={styles.text}>{text} <Text style = {[styles.pressableTextStyle, styles.text]}>{pressableText}</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    text: {
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 18,
    },

    checkBoxStyle: {
        height: 25,
        width: 25,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#7F3DFF",
    },

    checkboxPressed: {
        backgroundColor: "#7F3DFF",
    },

    pressableTextStyle: {
        color: "#7F3DFF",
    }
});
