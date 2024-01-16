import { View, StyleSheet, Text, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateBackend } from "../../Requests/https";
import { addTransaction } from "../../States/reducers/transactionSlice";
import { getCurrentTime } from '../../Requests/getTime';

import DropDownBox from "../../Components/CoreComponents/DropDownBox";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import LoadingOverlay from "../../Components/AuthUIComponents/LoadingOverlay";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";


export default function AddTransaction({navigation}) {
    const [expense, setExpense] = useState("0")
    const [iconChosen, setIconChosen] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    const [titleValid, setTitleValid] = useState(true)
    const [descriptionValid, setDescriptionValid] = useState(true)

    const [isPressed, setIsPressed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const userInformationInRedux = useSelector(state => state.userInfo)
    const transactionListFromRedux = useSelector(state => state.transactions)
    const notificationListFromRedux = useSelector(state => state.notification)
    const dispatch = useDispatch()
    
    useEffect(() => {
        navigation.setOptions({
            contentStyle: {backgroundColor: iconChosen.name === "cash"? "#00A86B": "#FD3C4A"},
            headerStyle: {backgroundColor: iconChosen.name === "cash"? "#00A86B": "#FD3C4A"}
        })
        
    }, [iconChosen])

    const dataInDatabse = {
        notificationList: notificationListFromRedux? notificationListFromRedux: null,
        userInformation: userInformationInRedux,
        transactionList: [...transactionListFromRedux,
            {
                iconName: iconChosen.name,
                iconColor: iconChosen.foreground,
                iconBackgroundColor: iconChosen.background,
                title: title,
                description: description,
                amount: expense,
                time: getCurrentTime(),
                isExpense: iconChosen.name === "cash"? false: true,
                id: title + getCurrentTime()
            }
        ]
    }

    function confirmInput(){
        setTitleValid(true)
        setDescriptionValid(true)

        if(title === ""){
            setTitleValid(false)
        }else if(description === "")
            setDescriptionValid(false)
        else if(iconChosen === "")
            Alert.alert("Error", "Please choose an icon")
        else if(expense === "0" || expense === 0 || expense === ""){
            Alert.alert("Error", "Please enter an amount")
        }
        else{
            addExpense() 
        }
    }

    async function addExpense(){
        setIsLoading(true)
       
        try{
            await updateBackend(userInformationInRedux.id, dataInDatabse)
            dispatch(addTransaction(dataInDatabse.transactionList))
            navigation.navigate("Home")
        }
        catch(error){
            Alert.alert("Error", 'Could not add transaction, pls try again later')
            setExpense("0")
            setIconChosen("")
            setDescription("")
            setTitle("")
        }

        setIsLoading(false)
    }

    if(isLoading){
        return <LoadingOverlay/>
    }

    return (
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style = {styles.ScreenStyle}>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.titleTxt}>How much?</Text>

                        <View style = {styles.moneyContainer}>
                            <Text style = {styles.moneyTxt}>$</Text>
                            <TextInput 
                                style = {[styles.moneyTxt, {flex: 1}]}
                                value = {expense.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                keyboardType="numeric"
                                onChangeText = {(text) => setExpense(text)}
                                onFocus={() => setExpense(expense === "0" ? "" : expense)}
                                onBlur={() => {setExpense(expense === "" ? "0" : expense)}}
                                maxLength={4}
                            />
                        </View>
                    </View>
    
                    <View style = {styles.containerView}> 
                            <View style = {styles.upperHalf}>
                                <DropDownBox 
                                    title = {iconChosen === ""? "Choose Category": iconChosen.displayName}
                                    onPress={() => {
                                        setIsPressed(!isPressed)
                                        setIconChosen("")
                                    }}
                                    isPressed={isPressed}
                                    onPick = {(icon) => {
                                        setIconChosen(icon)
                                        setIsPressed(false)
                                    }}
                                />

                                {!isPressed? <CustomTextInput
                                    inputConfig={{ 
                                        value: title,
                                        placeholder: "Title",
                                        maxLength: 16,
                                        onChangeText: (text) => setTitle(text),
                                        autoCapitalize: "words",
                                    }} 
                                    isValid = {titleValid}
                                    errorTxt = "Title cannot be empty"
                                />: null}

                                {!isPressed? <CustomTextInput
                                    inputConfig={{
                                        value: description,
                                        placeholder: "Description",
                                        maxLength: 30,
                                        onChangeText: (text) => setDescription(text)
                                    }} 
                                    isValid={descriptionValid}
                                    errorTxt = "Description cannot be empty"
                                />: null}
                            </View>

                        <CustomButton text = "Continue" onPress={confirmInput}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    ScreenStyle:{
        flex: 1,
        justifyContent: "space-between",
    },

    textContainer: {
        height: "40%",
        justifyContent: "center",
        paddingHorizontal: 23,
    },

    titleTxt: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FCFCFC",
        opacity: 0.64,
    },

    moneyContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    moneyTxt: {
        fontSize: 64,
        fontWeight: "600",
        color: "#FCFCFC",
    },

    containerView: {
        backgroundColor: "white",
        gap: 20,
        flex: 1,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 24,
       justifyContent: "space-between",
    },

    upperHalf: {
        gap: 16,   
    },

    textInputStyle: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: "center",
        borderColor:"#F1F1FA",
        borderWidth: 1,
    },
})