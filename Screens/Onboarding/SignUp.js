import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";
import CustomCheckBox from "../../Components/OnboardingComponents/CustomCheckBox";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";

export default function SignUp({navigation}){
    const [pressed, setPressed] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nameConfirmed, setNameConfirmed] = useState(true)
    const [emailConfirmed, setEmailConfirmed] = useState(true)
    const [passConfirmed, setPassConfirmed] = useState(true)

    function setNameText(text){
        if(text !== ""){
            setName(text)
        }
    }

    function setEmailText(text){
        if(text !== "" && text.includes("@") && text.length > 5){
            setEmail(text)
        }
    }

    function setPasswordText(text){
        if(text !== ""){
            setPassword(text)
        }
    }

    function confirmSignUp(){
        let proceed = true

        if(name === ""){
            setNameConfirmed(false)
            proceed = false
        }
        if(email === ""){
            setEmailConfirmed(false)
            proceed = false
        }
        if(password === ""){
            setPassConfirmed(false)
            proceed = false
        }
        if(!pressed){
            alert("Please agree to the terms and conditions")
            proceed = false
        }
        if(proceed){
            console.log("we can proceed")
            setEmail("")
            setPassword("")
            setName("")
        }
        
    }

    function chkBoxPressed(){
        setPressed(!pressed)
    }

    return(
        <View style = {styles.ScreenStyle}>
            <CustomTextInput placeholder = "Name" onChangeText={setNameText} isValid = {nameConfirmed}/>
            <CustomTextInput placeholder = "Email" onChangeText={setEmailText} isValid = {emailConfirmed}/>
            <CustomTextInput placeholder = "Password" onChangeText={setPasswordText} isValid = {passConfirmed}/>

            <View>
                <CustomCheckBox 
                    text = "By signing up, you agree to the" 
                    pressableText= "Terms of Service and Privacy Policy"
                    pressed={pressed}
                    onPress={chkBoxPressed}
                />
            </View>

            <CustomButton 
                text = "Sign Up" 
                onPress = {confirmSignUp}
            />

            <View style = {styles.container}>
                <Text style = {styles.textStyle}>Already have an account?</Text>
                <TouchableOpacity style = {styles.test} onPress={() => navigation.navigate("Login")}>
                        <Text style = {styles.hyperLinkStyle}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   ScreenStyle:{
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 20,
    },

    container:{
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },

    textStyle:{
        fontSize: 16,
        color: "#91919F",
        fontWeight: "500",
    },

    hyperLinkStyle:{
        fontSize: 16,
        fontWeight: "500",
        color: "#7F3DFF",
        textDecorationLine: "underline",
    },
})