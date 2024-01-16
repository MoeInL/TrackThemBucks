import { View, Text, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import CustomCoreButton from './CustomCoreButton';
import FilterButtons from './FilterButtons';
import CustomButton from '../OnboardingComponents/CustomButton';

export default function FilterModal({showModal, setShowModal, setPreviewTransactionList}) {
    const transactionListInRedux = useSelector(state => state.transactions)
    const [filterMode, setFilterMode] = useState("")
    const [sortMode, setSortMode] = useState("")

    function applyFilter(){
        switch(filterMode){
            case "income":
                setPreviewTransactionList(transactionListInRedux.filter(transaction => transaction.isExpense === false))
                break
            case "expense":
                setPreviewTransactionList(transactionListInRedux.filter(transaction => transaction.isExpense === true))
                break
            default:
                setPreviewTransactionList(transactionListInRedux)
        }
    }

    function applySort(){
        switch(sortMode){
            case "highest":
                setPreviewTransactionList([...transactionListInRedux].sort((a, b) => b.amount - a.amount))
                break
            case "lowest":
                setPreviewTransactionList([...transactionListInRedux].sort((a, b) => a.amount - b.amount))
                break
            case "newest":
                setPreviewTransactionList([...transactionListInRedux].reverse())
                break
            case "oldest":
                setPreviewTransactionList(transactionListInRedux)
                break
            default:
                setPreviewTransactionList(transactionListInRedux)
        }
    }

    return(
        <Modal
            animationType = "slide"
            transparent = {true}
            visible = {showModal}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.modalView}>
                    <TouchableWithoutFeedback onPress = {() => setShowModal(false)}>
                        <View style = {styles.swipeDownView}>
                            <Text style = {styles.swipeDown}>h</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style = {styles.headerStyle}>
                        <Text style = {styles.txtStyle}>Filter Transaction</Text>

                        <CustomCoreButton title = "Reset" onPress = {() => {
                            setFilterMode("")
                            setSortMode("")
                        }}/>
                    </View>

                    <View style = {{ gap: 16 }}>
                        <Text style = {styles.txtStyle}>Filter by</Text>

                        <View style = {{flexDirection: 'row', gap: 8}}>
                            <FilterButtons title = "Income" onPress = {() => setFilterMode("income")}/>
                            <FilterButtons title = "Expense" onPress = {() => setFilterMode("expense")}/>
                        </View>
                    </View>

                    <View style = {{ gap: 16 }}>
                        <Text style = {styles.txtStyle}>Sort By</Text>

                        <View style = {styles.sortView}>
                            <FilterButtons title = "Highest" onPress = {() => setSortMode("highest")}/>
                            <FilterButtons title = "Lowest" onPress = {() => setSortMode("lowest")}/>
                            <FilterButtons title = "Newest" onPress = {() => setSortMode("newest")}/>
                            <FilterButtons title = "Oldest" onPress = {() => setSortMode("oldest")}/>
                        </View>
                    </View>

                    <CustomButton text = "Apply" onPress = {() => {
                            setShowModal(false)
                            if(filterMode !== ""){
                                applyFilter()
                            }
                            else
                                applySort()
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    swipeDownView: {
        width: "100%",
        alignItems: "center",
    },

    swipeDown: {
        height: 4,
        width: 40,
        borderRadius: 5,
        backgroundColor: "#D3BDFF",
        color: "#D3BDFF",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000AA",
    },

    modalView: {
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        bottom: 0,
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        gap: 16,
    },

    headerStyle: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    txtStyle: {
        fontSize: 16,
        fontWeight: "600",
    },

    sortView: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,

    },
})