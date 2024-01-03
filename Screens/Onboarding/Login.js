import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";

import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";
import PasswordBox from "../../Components/OnboardingComponents/PasswordBox";

export default function Login({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailConfirmed, setEmailConfirmed] = useState(true)
    const [passConfirmed, setPassConfirmed] = useState(true)

    function setEmailText(text){
        if(text !== "")
            setEmail(text)
    }

    function setPasswordText(text){
        if(text !== "")
            setPassword(text)
    }

    function confirmLogin(){
        let proceed = true

        if(email === ""){
            setEmailConfirmed(false)
            proceed = false
        }
        if(password === ""){
            setPassConfirmed(false)
            proceed = false
        }
        if(proceed){
            console.log("we can proceed")
            setEmail("")
            setPassword("")
        }
    }

    return(
        <View style = {styles.screenStyle}>
            <CustomTextInput placeholder = "Email" isValid = {emailConfirmed} onChangeText={setEmailText}/>
            <PasswordBox placeholder = "Password" isValid={passConfirmed} onChangeText={setPasswordText}/>
            <CustomButton text = "Login" onPress={confirmLogin}/>
            <View style = {styles.container}>
                <Text style = {styles.txtStyle}>Forgot Password?</Text>
            </View>
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

    container: {
        alignItems: "center",
    },

    txtStyle: {
        color: "#7F3DFF",
        fontSize: 18,
        fontWeight: "600",
    }
})
