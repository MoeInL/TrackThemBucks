import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { pullFromBackend } from '../../Requests/https';
import { pushUserInfoToRedux } from '../../States/actions/userInfoActions';
import { addTransaction } from '../../States/reducers/transactionSlice';

import Header from '../../Components/CoreComponents/Header';
import MoneyPreview from '../../Components/CoreComponents/moneyPreview';
import CustomButton from '../../Components/CoreComponents/CustomButton';
import Transaction from '../../Components/CoreComponents/Transaction';
import SplashScreen from '../../Screens/SplashScreen';

export default function Home({navigation}) {    
    const dispatch = useDispatch()
    const [userBalance, setUserBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [income, setIncome] = useState(0)
    const [SplashScreenLoaded, setSplashScreenLoaded] = useState(false)

    const transactionList = useSelector(state => state.transactions)

    useEffect(() => {
        async function fetchData() {
            setSplashScreenLoaded(true)

            const response = await pullFromBackend()
            const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

            dispatch(pushUserInfoToRedux(response[userIdFromDatabase].userInfo)) 
            setUserBalance(response[userIdFromDatabase].userInfo.balance)

            Object.keys(response[userIdFromDatabase]).forEach((key) => {
                if(key === "expenseList"){
                    dispatch(addTransaction(response[userIdFromDatabase].expenseList))
                }
            })
            setSplashScreenLoaded(false)
        }

        fetchData()
        calculateExpenses()
    }, [])

    useEffect(() => {
        calculateExpenses()
    }, [transactionList])

    function calculateExpenses(){
        let total = 0

        transactionList.forEach((transaction) => {
            if(transaction.isExpense){
                total += Number(transaction.amount)
            }
        })

        setExpenses(total)
    }

    function noTransaction(){
        return(
            <View style = {styles.noTransactionContainerStyle}>
                <Text style = {styles.noTransactionTextStyle}>No Transaction</Text>
            </View>
        )
    }

    if(SplashScreenLoaded){
        return <SplashScreen/>
    }

    return (
        <LinearGradient colors={['#FFF6F9', 'white']} style = {styles.containerStyle}>
            <View>
                <Header style = {styles.headerStyle}/>

                <View style = {styles.balanceContainerStyle}>
                    <Text style = {styles.titleStyle}>Account Balance</Text>
                    <Text style = {styles.moneyStyle}>${userBalance}</Text>
                </View>
            </View>

            <View style = {styles.moneyContainerStyle}>
                <MoneyPreview title = "Income" money = {income} icon = {require("../../assets/Images/income.png")} color = "#00A86B"/>
                <MoneyPreview title = "Expense" money = {expenses} icon = {require("../../assets/Images/expense.png")} color = "#FD3C4A" onPress ={() => navigation.navigate("AddExpense")}/>
            </View> 


            <View style = {styles.bottomContainer}>
                <View style = {styles.listHeaderContainer}>
                    <Text style = {styles.listHeaderStyle}>Recent Transaction</Text>
                    <CustomButton title = "See All"/>
                </View>

                <View style = {styles.transactionContainer}>
                    {transactionList.length === 0? noTransaction():
                        <ScrollView style = {styles.scrollViewStyle}>
                            {[...transactionList].reverse().slice(0,6).map((transaction, index) => {
                                return (
                                    <Transaction 
                                        isExpense = {transaction.isExpense}
                                        iconName = {transaction.iconName}
                                        iconColor = {transaction.iconColor}
                                        iconBackgroundColor = {transaction.iconBackgroundColor}
                                        title = {transaction.title}
                                        amount = {transaction.amount}
                                        description = {transaction.description}
                                        time = {transaction.time}
                                        key = {index}
                                    />
                                )
                            })}
                        </ScrollView>
                    }
                </View>
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

    bottomContainer:{
        flex: 1, 
    },

    transactionContainer: {
        marginTop: 10,
        flex: 1,
    },

    noTransactionContainerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    noTransactionTextStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#91919F",
    },
});
 