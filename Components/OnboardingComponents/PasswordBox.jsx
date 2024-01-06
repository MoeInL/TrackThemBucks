import {View, TextInput, StyleSheet} from "react-native";
import {useState } from "react";

import PressableEye from "./PressableEye";

export default function PasswordBox({inputConfig, isValid}){
    const [hidden, setHidden] = useState(true)

    function toggleHidden(){
        setHidden(!hidden)
    }
    
    return(
        <View style = {isValid? styles.componentStyle: styles.invalidInput}>
            <TextInput 
                {...inputConfig}
                style = {isValid? styles.textInputStyle: [styles. textInputStyle, {color: "red"}]}
                secureTextEntry = {hidden}
            />

            <PressableEye hidden = {hidden} onPress={toggleHidden}/>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle:{
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        borderColor:"#F1F1FA",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    invalidInput:{
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        borderColor: "red",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    textInputStyle: {
       height: 40,
       flex: 1,
    }
})

