import {View, Text, StyleSheet} from 'react-native';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pullFromBackend } from '../../Requests/https';

import Header from '../../Components/CoreComponents/Header';
import MoneyPreview from '../../Components/CoreComponents/moneyPreview';
import CustomButton from '../../Components/CoreComponents/CustomButton';
import { pushUserInfoToRedux } from '../../States/actions/userActions';

export default function Home() {    
    const dispatch = useDispatch()
    const [userBalance, setUserBalance] = useState(0)
    const [expenses, setExpenses] = useState(1000)
    const [income, setIncome] = useState(1000)

    useEffect(() => {
        async function fetchData() {
            const response = await pullFromBackend()
            dispatch(pushUserInfoToRedux(response[Object.keys(response)]))
            setUserBalance(response[Object.keys(response)].balance)
        }
  
        fetchData()
    }, [])

    return (
        <View style = {styles.containerStyle}>
            <View>
                <Header style = {styles.headerStyle}/>

                <View style = {styles.balanceContainerStyle}>
                    <Text style = {styles.titleStyle}>Account Balance</Text>
                    <Text style = {styles.moneyStyle}>${userBalance}</Text>
                </View>
            </View>

            <View style = {styles.moneyContainerStyle}>
                    <MoneyPreview title = "Income" money = {expenses} icon = {require("../../assets/Images/income.png")} color = "#00A86B"/>
                    <MoneyPreview title = "Expense" money = {income} icon = {require("../../assets/Images/expense.png")} color = "#FD3C4A"/>
            </View> 

            <View>
                <View style = {styles.listHeaderContainer}>
                    <Text style = {styles.listHeaderStyle}>Recent Transaction</Text>
                    <CustomButton title = "See All"/>
                </View>

                <View>
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 20,
    },

    headerStyle: {
        justifyContent: "flex-start",
        backgroundColor: "red",
    },

    balanceContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
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
});
 