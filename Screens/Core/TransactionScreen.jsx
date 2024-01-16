import {View, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Ionicons } from '@expo/vector-icons';
import Transaction from '../../Components/CoreComponents/TransactionDetails';
import FilterModal from "../../Components/CoreComponents/FilterModal";

export default function TransactionScreen() {
    const transactionListInRedux = useSelector(state => state.transactions)
    const [hasTransaction, setHasTransaction] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [previewList, setPreviewList] = useState([])
    const [isFiltering, setIsFiltering] = useState(false)

    useEffect(() => {
        if(transactionListInRedux.length !== 0){
            setHasTransaction(true)
            setPreviewList(transactionListInRedux)
        }
    }
    , [transactionListInRedux])

    function noTransaction(){
        return(
            <View style = {styles.noTransactionContainerStyle}>
                <Text style = {styles.noTransactionTextStyle}>No Transaction</Text>
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <View style = {styles.header}>
                    <TouchableOpacity style = {styles.iconStyle} onPress = {() => setModalVisible(true)}>
                        <Ionicons name="filter" size={30} color="black"/>
                    </TouchableOpacity>

                    {isFiltering? 
                    <View style = {styles.filterIndicator}>
                        <Text style = {styles.filterTxt}>1</Text>
                    </View>: null}
                </View>

                <View>
                    <Text style = {styles.txtStyle}>See Your Transactions</Text>
                </View>

                <View style = {styles.transactionContainer}>
                    {hasTransaction?<FlatList
                        data = {previewList}
                        keyExtractor = {(transaction) => transaction.id}
                        contentContainerStyle = {{gap: 10}}
                        renderItem = {(transaction) =>
                            <Transaction
                                isExpense = {transaction.item.isExpense}
                                iconName = {transaction.item.iconName}
                                iconColor = {transaction.item.iconColor}
                                iconBackgroundColor = {transaction.item.iconBackgroundColor}
                                title = {transaction.item.title}
                                amount = {transaction.item.amount}
                                description = {transaction.item.description}
                                time = {transaction.item.time}
                            />
                        }
                    />:noTransaction()}
                </View>
            </View>

            <FilterModal 
                showModal = {modalVisible} 
                setShowModal = {setModalVisible}
                setPreviewTransactionList = {setPreviewList}
                setIsFiltering = {setIsFiltering}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        paddingTop: 50,
        gap: 10,
    },

    header:{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginVertical: 15,
    },

    iconStyle:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 8,
    },

    txtStyle:{
        fontSize: 23,
        fontWeight: "600",
    },

    transactionContainer:{
        flex: 9,
        paddingHorizontal: 10,
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

    filterIndicator:{
        position: "absolute", 
        top: 0, 
        right: 0, 
        width: 20, 
        height: 20, 
        borderRadius: 50, 
        backgroundColor: "#7F3DFF",
        justifyContent: "center",
        alignItems: "center",
    },

    filterTxt:{
        fontSize: 12,
        fontWeight: "600",
        color: "white",
    }
});
