import {View, Text, StyleSheet} from "react-native";
import { useState, useEffect } from "react";

import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";

export default function ForgotPassword({navigation}){
    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail("")
            emailValid(true)
        });
    
        return unsubscribe;
      }, [navigation]);

    function confirmInput(){
        if(email === "" || email.includes("@") === false){
            setEmailValid(false)
        }
        else
            navigation.navigate("ResetPassword")
    }

    return(
        <View style = {styles.screenStyle}>
            <View>
                <Text style = {styles.txtStyle}>Don’t worry.</Text>
                <Text style = {styles.txtStyle}>Enter your email and we’ll send you a link to reset your password.</Text>
            </View>

            <CustomTextInput placeholder = "Email" onChangeText={(text) => setEmail(text)} isValid={emailValid} value={email}/>
            <CustomButton text = "Continue" onPress={confirmInput}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 30,
    },

    txtStyle: {
        fontSize: 24,
        fontWeight: "600",
    },
})