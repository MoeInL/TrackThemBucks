import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";

import DropDownBox from "../../Components/CoreComponents/DropDownBox";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";

export default function AddExpense() {
    const [expense, setExpense] = useState("0")
    const [iconChosen, setIconChosen] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState("")
    const [title, setTitle] = useState("")

    const [isPressed, setIsPressed] = useState(false)

    const tempExpense = {
        iconName: iconChosen.name,
        iconColor: iconChosen.foreground,
        iconBackgroundColor: iconChosen.background,
        title: title,
        description: description,
        amount: expense,
        time: time,
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

    function addExpense(){
        setTime(getTime())
        //push to redux
        //push to backend
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
                        onPress={() => setIsPressed(!isPressed)}
                        isPressed={isPressed}
                        onPick = {(icon) => setIconChosen(icon)}
                    />

                    {!isPressed? <TextInput 
                        placeholder="Title" 
                        maxLength={10}
                        style = {styles.textInputStyle}
                        onChangeText={(text) => setTitle(text)}
                    />: null}

                    {!isPressed? <TextInput 
                        placeholder="Description" 
                        maxLength={30}
                        style = {styles.textInputStyle}
                        onChangeText={(text) => setDescription(text)}
                    />: null}
                </View>

                <CustomButton text = "Continue" onPress={() => {}}/>
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