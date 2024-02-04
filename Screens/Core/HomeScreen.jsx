import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { pullFromBackend, updateBackend } from '../../Requests/https';
import { pushUserInfoToRedux } from '../../States/actions/userInfoActions';
import { addTransaction, deleteTransactionInRedux } from '../../States/reducers/transactionSlice';
import { addNotification } from '../../States/reducers/notificationSlice';
import { getCurrentTime } from '../../Requests/getTime';

import Header from '../../Components/CoreComponents/Header';
import MoneyPreview from '../../Components/CoreComponents/moneyPreview';
import CustomCoreButton from '../../Components/CoreComponents/CustomCoreButton';
import Transaction from '../../Components/CoreComponents/TransactionDetails';
import LoadingOverlay from '../../Components/AuthUIComponents/LoadingOverlay';

export default function Home({navigation, focused}) {    
    const dispatch = useDispatch()
    const [expenses, setExpenses] = useState(0)
    const [income, setIncome] = useState(0)
    const [hasNotification, setHasNotification] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false) 

    const transactionListInRedux = useSelector(state => state.transactions)
    const userInformationInRedux = useSelector(state => state.userInfo)
    const isFocused = navigation.isFocused();

    let tempObject = {
        transactionList: [],
        userInformation: userInformationInRedux,
    }

    useEffect(() => {
        async function fetchData() {
            const response = await pullFromBackend()
            const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

            if(response[userIdFromDatabase].userInformation.monthlyIncome === 0){
                navigation.navigate("AddIncome")
            }

            dispatch(pushUserInfoToRedux(response[userIdFromDatabase].userInformation)) 
        
            Object.keys(response[userIdFromDatabase]).forEach((key) => {
                if(key === "transactionList"){
                    dispatch(addTransaction(response[userIdFromDatabase].transactionList))
                }

                if(key === "notificationList"){
                    setHasNotification(true)
                    dispatch(addNotification(response[userIdFromDatabase].notificationList))
                }
            })
        }

        fetchData()
        calculateExpenses()
        focused = isFocused
    }, [])

    useEffect(() => {
        calculateExpenses()
        calculateIncome()
    }, [transactionListInRedux])

    useEffect(() => {
        setIncome(calculateIncome())
    }, [userInformationInRedux, transactionListInRedux])

    useEffect(() => {
        if(income !== 0 && !hasNotification){
            expenses > income? pushNotification(): deleteNotification()
        }
    }, [expenses, income])

    function calculateIncome(){
        let totalIncome = Number(userInformationInRedux.monthlyIncome)
        
        transactionListInRedux.forEach((transaction) => {
            if(!transaction.isExpense){
                totalIncome += Number(transaction.amount)
            }
        })

        return totalIncome <= 9999? totalIncome: 9999
    }

    function calculateExpenses(){
        let totalExpenses = 0

        transactionListInRedux.forEach((transaction) => {
            if(transaction.isExpense){
                totalExpenses += Number(transaction.amount)
            }
        })

        setExpenses(totalExpenses <= 9999? totalExpenses: 9999)
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
                {[...transactionListInRedux].reverse().slice(0,6).map((transaction) => {
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
                            key = {transaction.id}
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
                    )
                })}
            </ScrollView>
        )
    }
    //List isn't updating when transaction is deleted
    async function deleteTransaction(id){
        setIsAuthenticating(true)

        try{
            dispatch(deleteTransactionInRedux(id))
            tempObject.transactionList = transactionListInRedux.filter((transaction) => transaction.id !== id)
            await updateBackend(userInformationInRedux.id, tempObject)
        }catch(error){
            Alert.alert("Error", "Something went wrong. Please try again later.")
        }
        setIsAuthenticating(false)
    }
    
    async function pushNotification(){
        setHasNotification(true)
        const notification = {
            title: "Expenses Exceeded Monthly Income",
            message: "Your expenses for this month has exceeded your monthly income. You better watch out!!",
            time: getCurrentTime(),
        }

        tempObject = {...tempObject, transactionList: transactionListInRedux, notificationList: notification}
        await updateBackend(userInformationInRedux.id, tempObject)
    }

    async function deleteNotification(){
        setHasNotification(false)
        tempObject = {...tempObject, transactionList: transactionListInRedux}
        await updateBackend(userInformationInRedux.id, tempObject)
    }

    return (
        <LinearGradient colors={['#F5F5DC', 'white']} style = {styles.containerStyle}>
            <View>
                <Header 
                    style = {styles.headerStyle} 
                    onNotificationPress={() => {
                        navigation.navigate("Notification")
                        setHasNotification(false)
                    }}
                    hasNotification={hasNotification}
                />

                <View style = {styles.balanceContainerStyle}>
                    <Text style = {styles.titleStyle}>Account Balance</Text>
                    <Text style = {styles.moneyStyle}>${userInformationInRedux.balance}</Text>
                </View>
            </View>

            <View style = {styles.moneyContainerStyle}>
                <MoneyPreview title = "Income" money = {income} icon = {require("../../assets/Images/income.png")} color = "#00A86B" onPress ={() => navigation.navigate("AddIncome")}/>
                <MoneyPreview title = "Expense" money = {expenses} icon = {require("../../assets/Images/expense.png")} color = "#FD3C4A" onPress ={() => navigation.navigate("AddTransaction")}/>
            </View> 


            <View style = {styles.bottomContainer}>
                <View style = {styles.listHeaderContainer}>
                    <Text style = {styles.listHeaderStyle}>Recent Transaction</Text>
                    <CustomCoreButton title = "See All" onPress={() => navigation.navigate('Transaction')}/>
                </View>

                {!isAuthenticating? 
                    <View style = {styles.transactionContainer}>
                        {transactionListInRedux.length === 0? noTransaction():transactionExist()}
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
        gap: 5,
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
 