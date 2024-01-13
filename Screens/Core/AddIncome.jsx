import {View, Text, TextInput, StyleSheet} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { pullFromBackend, updateBackend } from '../../Requests/https';
import { pushUserInfoToRedux } from '../../States/actions/userInfoActions';

import CustomButton from "../../Components/OnboardingComponents/CustomButton";
import LoadingOverlay from "../../Components/AuthUIComponents/LoadingOverlay";

export default function AddIncome({navigation}){
    const dispatch = useDispatch()
    const [income, setIncome] = useState("0")
    const [isfocused, setIsFocused] = useState(true)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const tempObject = {
        expenseList: [],
        userInfo: { }
    }

    function handleContinue(){
        setIsAuthenticating(true)
        async function handleData() {
            const response = await pullFromBackend()
            const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

            tempObject.userInfo = {...response[userIdFromDatabase].userInfo, monthlyIncome: income}
            tempObject.expenseList = response[userIdFromDatabase].expenseList
            dispatch(pushUserInfoToRedux(tempObject.userInfo))
            
            await updateBackend(tempObject.userInfo.id,tempObject)
        }

        handleData()
        setIsAuthenticating(false)
        navigation.navigate("Home")
    }

    if(isAuthenticating){
        return <LoadingOverlay/>
    }

    return(
        <View style = {styles.screenContainer}>
            <View style = {styles.textContainer}>
                    <Text style = {styles.titleTxt}>How much?</Text>

                    <View style = {styles.moneyContainer}>
                        <Text style = {styles.moneyTxt}>$</Text>
                        <TextInput 
                            style = {[styles.moneyTxt, {flex: 1}]}
                            value = {income}
                            keyboardType="numeric"
                            onChangeText = {(text) => setIncome(text)}
                            onFocus={() => {
                                setIncome("") 
                                setIsFocused(true)
                            }}
                            onBlur={() => {
                                setIncome(income === "" ? "0" : income)
                                setIsFocused(false)
                            }}
                            maxLength={4}
                            autoFocus = {true}
                        />
                    </View>
            </View>

            {!isfocused?<View style = {styles.bttnContainer}>
                <CustomButton text = "Continue" onPress={handleContinue}/>
            </View>: null}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
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

    bttnContainer: {
        padding: 16,
        height: "13%",
        backgroundColor: "white",
    },
});
