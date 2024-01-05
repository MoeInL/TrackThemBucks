import {View, StyleSheet, Alert} from "react-native";
import { useState, useEffect } from "react";

import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";

export default function ForgotPassword({navigation}){
    const [password, setPassword] = useState("")
    const [pass, setPass] = useState("")
    const [passwordValid, setPasswordValid] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setPass("")
            setPassword("")
            setPasswordValid(true)
        });
    
        return unsubscribe;
      }, [navigation]);

    function isEqual(){
        if(pass === password){
            confirmInput()
        }
        else{
          Alert.alert("Passwords do not match")
        }
    }

    function confirmInput(){
        if(password === ""){
            setPasswordValid(false)
        }
        else
            navigation.navigate("Login")
    }

    return(
        <View style = {styles.screenStyle}>
            <CustomTextInput 
                inputConfig={{
                    placeholder: "New Password", 
                    onChangeText: (text) => setPass(text),
                    value: pass,
                }}
                isValid={true} 
            />
            <CustomTextInput 
                inputConfig={{
                    placeholder: "Retype new Password", 
                    onChangeText: (text) => setPassword(text),
                    value: password,
                }}
                isValid={passwordValid} 
            />
            <CustomButton text = "Continue" onPress={isEqual}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 20,
    },
})