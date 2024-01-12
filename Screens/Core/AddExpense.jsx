import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateBackend } from "../../Requests/https";
import { addTransaction } from "../../States/reducers/transactionSlice";

import DropDownBox from "../../Components/CoreComponents/DropDownBox";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import LoadingOverlay from "../../Components/AuthUIComponents/LoadingOverlay";
import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";

export default function AddExpense({navigation}) {
    const [expense, setExpense] = useState("0")
    const [iconChosen, setIconChosen] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    const [titleValid, setTitleValid] = useState(true)
    const [descriptionValid, setDescriptionValid] = useState(true)

    const [isPressed, setIsPressed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const userinformation = useSelector(state => state.userInfo)
    const transactionList = useSelector(state => state.transactions)
    const dispatch = useDispatch()

    const dataInDatabse = {
        userInfo: userinformation.state,
        expenseList: [...transactionList,
            {
                iconName: iconChosen.name,
                iconColor: iconChosen.foreground,
                iconBackgroundColor: iconChosen.background,
                title: title,
                description: description,
                amount: expense,
                time: getTime(),
                isExpense: iconChosen.name === "cash"? false: true,
            }
        ]
    }

    function getTime(){
        const now = new Date();
        let currentHour = now.getHours();
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        let periodOfDay;

        if (currentHour >= 12) {
            periodOfDay = 'PM';
            if (currentHour > 12) {
                currentHour -= 12;
            }
        } else {
            periodOfDay = 'AM';
            if (currentHour === 0) {
                currentHour = 12;
            }
        }

        return `${currentHour}:${currentMinutes} ${periodOfDay}`;

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
        else if(expense === "0"){
            Alert.alert("Error", "Please enter an amount")
        }
        else{
            addExpense()
        }
    }

    async function addExpense(){
        setIsLoading(true)
       
        try{
            await updateBackend(userinformation.state.id, dataInDatabse)
            dispatch(addTransaction(dataInDatabse.expenseList))
            navigation.navigate("Home")
        }
        catch(error){
            Alert.alert("Error", 'Could not add expense, pls try again later')
            setExpense("0")
            setIconChosen("")
        }

        setIsLoading(false)
    }

    if(isLoading){
        return <LoadingOverlay/>
    }

    return (
        <View style = {styles.ScreenStyle}>
            <View style = {styles.textContainer}>
                <Text style = {styles.titleTxt}>How much?</Text>

                <View style = {styles.moneyContainer}>
                    <Text style = {styles.moneyTxt}>$</Text>
                    <TextInput 
                        style = {[styles.moneyTxt, {flex: 1}]}
                        value = {expense}
                        keyboardType="numeric"
                        onChangeText = {(text) => setExpense(text)}
                        onFocus={() => setExpense("")}
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
    )
}

const styles = StyleSheet.create({
    ScreenStyle:{
        flex: 1,
        gap: 20,
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