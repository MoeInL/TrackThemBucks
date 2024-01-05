import {View, Text, TextInput, StyleSheet} from "react-native";

export default function CustomTextInput({inputConfig, isValid, errorTxt}){
    return(
        <View style = {isValid? styles.componentStyle: styles.invalidInput}>
            <TextInput 
                {...inputConfig} 
                style = {isValid? styles.textInputStyle: [styles. textInputStyle, {color: "red"}]}
            />

            {!isValid? <Text style = {styles.errorTxtStyle}>{errorTxt}</Text>: null}
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle:{
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "center",
        borderColor:"#F1F1FA",
        borderWidth: 1,
    },

    invalidInput:{
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "center",
        borderColor: "red",
        borderWidth: 1,
    },

    textInputStyle: {
       height: 40,
    },

    errorTxtStyle: {
        color: "red",
        fontSize: 12,
    }
})

