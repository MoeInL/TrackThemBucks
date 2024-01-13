import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { pullFromBackend, updateBackend } from '../../Requests/https';
import { pushUserInfoToRedux } from '../../States/actions/userInfoActions';
import { addTransaction, deleteTransactionInRedux } from '../../States/reducers/transactionSlice';

import Header from '../../Components/CoreComponents/Header';
import MoneyPreview from '../../Components/CoreComponents/moneyPreview';
import CustomButton from '../../Components/CoreComponents/CustomButton';
import Transaction from '../../Components/CoreComponents/Transaction';
import LoadingOverlay from '../../Components/AuthUIComponents/LoadingOverlay';

export default function Home({navigation}) {    
    const dispatch = useDispatch()
    const [userBalance, setUserBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [income, setIncome] = useState(0)
    const [isAuthenticating, setIsAuthenticating] = useState(false) 

    const transactionList = useSelector(state => state.transactions)
    const userInformation = useSelector(state => state.userInfo)
    
    const tempObject = {
        expenseList: [],
        userInfo: userInformation.state,
    }

    useEffect(() => {
        async function fetchData() {
            const response = await pullFromBackend()
            const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

            dispatch(pushUserInfoToRedux(response[userIdFromDatabase].userInfo)) 
            setUserBalance(response[userIdFromDatabase].userInfo.balance.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
            setIncome(Number(response[userIdFromDatabase].userInfo.monthlyIncome))
          
            Object.keys(response[userIdFromDatabase]).forEach((key) => {
                if(key === "expenseList"){
                    dispatch(addTransaction(response[userIdFromDatabase].expenseList))
                }
            })
        }

        fetchData()
        calculateExpensesAndIcome()
    }, [])

    useEffect(() => {
        calculateExpensesAndIcome()
    }, [transactionList, userInformation])

    function calculateExpensesAndIcome(){
        let totalExpenses = 0
        let totalIncome = income

        transactionList.forEach((transaction) => {
            if(transaction.isExpense){
                totalExpenses += Number(transaction.amount)
            }
            else{
                totalIncome += Number(transaction.amount)
            }
        })

        setExpenses(totalExpenses <= 9999? totalExpenses: 9999)

        if(totalIncome <= 9999){
            setIncome(totalIncome - totalExpenses >= 0? totalIncome - totalExpenses: 0)
        }
    }

    function noTransaction(){
        return(
            <View style = {styles.noTransactionContainerStyle}>
                <Text style = {styles.noTransactionTextStyle}>No Transaction</Text>
            </View>
        )
    }

    function transactionExist(){
        return(
            <ScrollView style = {styles.scrollViewStyle}>
                {[...transactionList].reverse().slice(0,6).map((transaction) => {
                    return (
                        <View key = {transaction.id}>
                            <Transaction 
                                isExpense = {transaction.isExpense}
                                iconName = {transaction.iconName}
                                iconColor = {transaction.iconColor}
                                iconBackgroundColor = {transaction.iconBackgroundColor}
                                title = {transaction.title}
                                amount = {transaction.amount}
                                description = {transaction.description}
                                time = {transaction.time}
                                onPress = {() => {
                                    Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
                                        {
                                            text: 'Cancel',    
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'OK', 
                                            onPress: () => deleteTransaction(transaction.id),
                                        }
                                    ]);
                                }}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        )
    }

    async function deleteTransaction(id){
        setIsAuthenticating(true)

        try{
            dispatch(deleteTransactionInRedux(id))
            tempObject.expenseList = transactionList.filter((transaction) => transaction.id !== id)
            await updateBackend(userInformation.state.id, tempObject)
        }catch(error){
            Alert.alert("Error", "Something went wrong. Please try again later.")
        }
        setIsAuthenticating(false)
    }

    return (
        <LinearGradient colors={['#F5F5DC', 'white']} style = {styles.containerStyle}>
            <View>
                <Header style = {styles.headerStyle}/>

                <View style = {styles.balanceContainerStyle}>
                    <Text style = {styles.titleStyle}>Account Balance</Text>
                    <Text style = {styles.moneyStyle}>${userBalance}</Text>
                </View>
            </View>

            <View style = {styles.moneyContainerStyle}>
                <MoneyPreview title = "Income" money = {income} icon = {require("../../assets/Images/income.png")} color = "#00A86B" onPress ={() => navigation.navigate("AddIncome")}/>
                <MoneyPreview title = "Expense" money = {expenses} icon = {require("../../assets/Images/expense.png")} color = "#FD3C4A" onPress ={() => navigation.navigate("AddTransaction")}/>
            </View> 


            <View style = {styles.bottomContainer}>
                <View style = {styles.listHeaderContainer}>
                    <Text style = {styles.listHeaderStyle}>Recent Transaction</Text>
                    <CustomButton title = "See All"/>
                </View>

                {!isAuthenticating? 
                    <View style = {styles.transactionContainer}>
                        {transactionList.length === 0? noTransaction():transactionExist()}
                    </View>: <LoadingOverlay/>
                }
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
        height: "54%", 
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
 