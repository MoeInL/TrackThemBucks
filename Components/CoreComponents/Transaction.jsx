import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

import { useSelector } from "react-redux";

import {Ionicons} from '@expo/vector-icons'

export default function Transaction({isExpense}) {
    const transaction = useSelector(state => state.transactions)

    return (
        <TouchableOpacity style = {styles.componentContainer}> 
            <View style = {[styles.iconContainer, {backgroundColor: transaction.iconBackgroundColor}]}>
                <Ionicons name = {transaction.iconName} size = {35} color = {transaction.iconColor}/>
            </View>
            
            <View style = {styles.textStyle}>
                <View style = {styles.topText}>
                    <Text style = {styles.titleText}>{transaction.title}</Text>
                    <Text style = {isExpense?[styles.amountText, {color: 'red'}]:[styles.amountText, {color: 'green'}]}>{isExpense? `- $${transaction.amount}`: `+ $${transaction.amount}`}</Text>
                </View>

                <View style = {styles.bottomText}>
                    <Text style = {styles.text}>{transaction.description}</Text>
                    <Text style = {styles.text}>{transaction.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    componentContainer:{
        padding: 10,
        flexDirection: 'row',
    },

    iconContainer: {
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        brightness: 0.1,
    },

    topText:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bottomText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textStyle:{
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 5,
    },

    titleText: {
        fontSize: 16,
        fontWeight: '500',
    },

    text: {
        fontSize: 13,
        fontWeight: '500',
        color: '#91919F',
    },

    amountText:{
        fontSize: 16,
        fontWeight: '600',
    }
})