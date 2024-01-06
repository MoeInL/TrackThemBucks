import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import LoadingOverlay from "../../Components/AuthUIComponents/LoadingOverlay";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";
import CustomCheckBox from "../../Components/OnboardingComponents/CustomCheckBox";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";

import { createUser } from "../../Requests/auth";
import { pushTokenToRedux } from "../../States/actions/userActions";

export default function SignUp({navigation}){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [pressed, setPressed] = useState(false)
    const [nameValid, setNameValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)

    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail("")
            setPassword("")
            setName("")
            setEmailValid(true)
            setPasswordValid(true)
            setNameValid(true)
            setPressed(false)
        });
    
        return unsubscribe;
    }, [navigation]);

    function chkBoxPressed(){
        setPressed(!pressed)
    }

    async function signUpHandler(email, password, name){
        let proceed = true;
        setIsAuthenticating(true)

        try{
            const token = await createUser(email, password, name)
            dispatch(pushTokenToRedux(token))
        }catch(error){
            if(error.code === 'ERR_BAD_REQUEST'){
                Alert.alert('Creating Account Failed','Please use a valid email.')
            }else
                Alert.alert('Creating Account Failed','Could not sign you up. Please try again later.')
            
            setIsAuthenticating(false)
            proceed = false
        }

        proceed? navigation.navigate("SetupNavigation"): null
    }

    function confirmSignUp(){
        setEmailValid(true)
        setPasswordValid(true)
        setNameValid(true)

        let proceed = true;

        if(!pressed){
            alert("Please agree to the terms and conditions") 
            proceed = false
        }

        if(name === ""){
            setNameValid(false)
            proceed = false
        } 

        if(email === "" || email.includes("@") === false || email.length <= 5){
            setEmailValid(false)
            proceed = false
        }

        if(password === "" || password.length < 10 || /[A-Z]/.test(password) === false || /[0-9]/.test(password) === false || /[!@#$%^&*]/.test(password) === false)
        {
            setPasswordValid(false)
            proceed = false
        }

        if(proceed){
            setEmail("")
            setPassword("")
            setName("")
            setPressed(false)

            signUpHandler(email, password, name)
        }
    }

    if(isAuthenticating){
        return <LoadingOverlay message = 'Creating user...'/>
    }

    return(
        <View style = {styles.ScreenStyle}>
            <CustomTextInput 
                inputConfig = {{
                    placeholder: "Name",
                    onChangeText: (text) => setName(text),
                    value: name,
                    autoCapitalize: "words",
                    maxLength: 10
                }}
                isValid = {nameValid}
                errorTxt = {"* Name is invalid"}
            />

            <CustomTextInput 
                inputConfig = {{
                    placeholder:  "Email", 
                    onChangeText: (text) => setEmail(text),
                    value: email,
                    inputMode: "email"
                }}
                isValid = {emailValid}
                errorTxt = {"* Email is invalid"}
            />

            <CustomTextInput 
                inputConfig = {{
                    placeholder: "Password", 
                    onChangeText: (text) => setPassword(text),
                    value: password
                }}
                errorTxt = "* Must be 10 characters long, contains uppercase letters, numbers, special character"
                isValid={passwordValid} 
           />

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