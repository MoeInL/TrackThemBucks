import {View, Text, StyleSheet, Alert} from "react-native";
import { useState, useEffect } from "react";

import LoadingOverlay from "../../Components/AuthUI/LoadingOverlay";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";

import { verifyEmail } from "../../Requests/auth";

export default function ForgotPassword({navigation}){
    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(true)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail("")
            setEmailValid(true)
        });
    
        return unsubscribe;
    }, [navigation]);

    async function checkEmail(email){
        let proceed = true;
        setIsAuthenticating(true)

        try{
            const token = await verifyEmail(email)
        }catch(error){
            Alert.alert(
                'Authentication Failed', 
                'Please enter a valid email.'
            )
           
            setIsAuthenticating(false)
            proceed = false
        }
        proceed? navigation.navigate("ResetPassword"): null
    }

    function confirmInput(){
        if(email === "" || email.includes("@") === false){
            setEmailValid(false)
        }
        else
           checkEmail(email)
    }

    if(isAuthenticating)
        return <LoadingOverlay/>

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