import {View, TextInput, StyleSheet} from "react-native";

export default function CustomTextInput({placeholder, onChangeText, isValid, value}){
    return(
        <View style = {isValid? styles.componentStyle: styles.invalidInput}>
            <TextInput 
                placeholder = {placeholder} 
                onChangeText = {onChangeText}
                style = {isValid? styles.textInputStyle: [styles. textInputStyle, {color: "red"}]}
                value= {value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle:{
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "center",
        borderColor:"#F1F1FA",
        borderWidth: 1,
    },

    invalidInput:{
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "center",
        borderColor: "red",
        borderWidth: 1,
    },

    textInputStyle: {
       height: 40,
    }
})

