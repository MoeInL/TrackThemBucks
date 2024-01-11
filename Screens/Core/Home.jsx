import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { pullFromBackend } from '../../Requests/https';
import { pushUserInfoToRedux } from '../../States/actions/userInfoActions';
import { createTransaction } from '../../States/actions/transaction/transactionActions';

import Header from '../../Components/CoreComponents/Header';
import MoneyPreview from '../../Components/CoreComponents/moneyPreview';
import CustomButton from '../../Components/CoreComponents/CustomButton';

export default function Home({navigation}) {    
    const dispatch = useDispatch()
    const [userBalance, setUserBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [income, setIncome] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const response = await pullFromBackend()
            const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

            dispatch(pushUserInfoToRedux(response[userIdFromDatabase].userInfo)) 
            setUserBalance(response[userIdFromDatabase].userInfo.balance)
        }

        fetchData()
    }, [])

    //console.log(transactions)

    return (
        <LinearGradient colors={['#FFF6E5', 'white']} style = {styles.containerStyle}>
            <View>
                <Header style = {styles.headerStyle}/>

                <View style = {styles.balanceContainerStyle}>
                    <Text style = {styles.titleStyle}>Account Balance</Text>
                    <Text style = {styles.moneyStyle}>${userBalance}</Text>
                </View>
            </View>

            <View style = {styles.moneyContainerStyle}>
                <MoneyPreview title = "Income" money = {expenses} icon = {require("../../assets/Images/income.png")} color = "#00A86B"/>
                <MoneyPreview title = "Expense" money = {income} icon = {require("../../assets/Images/expense.png")} color = "#FD3C4A" onPress ={() => navigation.navigate("AddExpense")}/>
            </View> 


            <View>
                <View style = {styles.listHeaderContainer}>
                    <Text style = {styles.listHeaderStyle}>Recent Transaction</Text>
                    <CustomButton title = "See All"/>
                </View>

                <ScrollView style = {styles.scrollViewStyle}>
                    
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        padding: "5%",
        paddingTop: 50,
        gap: 30,
    },

    headerStyle: {
        justifyContent: "flex-start",
        backgroundColor: "red",
    },

    balanceContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },

    titleStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#91919F",
    },  

    moneyStyle: {
        fontSize: 40,
        fontWeight: "600",
        color: "#161719",
    },

    moneyContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    listHeaderStyle:{
        fontSize: 18,
        fontWeight: "600",
    },

    listHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    scrollViewStyle: {
        marginTop: 10,
        marginRight: 10,
    },
});
 