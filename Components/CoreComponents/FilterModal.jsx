import { View, Text, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import CustomCoreButton from './CustomCoreButton';
import FilterButtons from './FilterButtons';
import CustomButton from '../OnboardingComponents/CustomButton';

export default function FilterModal({showModal, setShowModal, setPreviewTransactionList, setIsFiltering}) {
    const transactionListInRedux = useSelector(state => state.transactions)
    const [filterMode, setFilterMode] = useState("")
    const [sortMode, setSortMode] = useState("")
    const [filterList, setFilterList] = useState([])

    const [incomebttn, setIncomeBttn] = useState(false)
    const [expensebttn, setExpenseBttn] = useState(false)
    const [highestbttn, setHighestBttn] = useState(false)
    const [lowestbttn, setLowestBttn] = useState(false)
    const [newestbttn, setNewestBttn] = useState(false)
    const [oldestbttn, setOldestBttn] = useState(false)


    useEffect(() => {
        setFilterList(transactionListInRedux)
    }, [transactionListInRedux])

    useEffect(() => {
      switch(filterMode){
            case "Income":  
                console.log("Income")
                setIncomeBttn(!incomebttn)
                setExpenseBttn(false)
                setFilterList(transactionListInRedux.filter(transaction => transaction.isExpense === false))
                break
            case "Expense":
                setExpenseBttn(!expensebttn)
                setIncomeBttn(false)
                setFilterList(transactionListInRedux.filter(transaction => transaction.isExpense === true))
                break
            default:
                setIncomeBttn(false)
                setExpenseBttn(false)
                setFilterList(transactionListInRedux)
                break
        }
    },[filterMode])

    useEffect(() => {
        switch(sortMode){
            case "highest":
                setHighestBttn(!highestbttn)
                setLowestBttn(false)
                setNewestBttn(false)
                setOldestBttn(false)
                setFilterList([...filterList].sort((a, b) => Number(b.amount) - Number(a.amount)))
                break
            case "lowest":
                setLowestBttn(!lowestbttn)
                setHighestBttn(false)  
                setNewestBttn(false)
                setOldestBttn(false)
                setFilterList([...filterList].sort((a, b) => Number(a.amount) - Number(b.amount)))
                break
            case "newest":
                setNewestBttn(!newestbttn)
                setHighestBttn(false)
                setLowestBttn(false)
                setOldestBttn(false)
                setFilterList([...filterList].reverse())
                break
            case "oldest":
                setOldestBttn(!oldestbttn)
                setHighestBttn(false)
                setLowestBttn(false)
                setNewestBttn(false)
                setFilterList(filterList)
                break 
            default:   
                setHighestBttn(false)
                setLowestBttn(false)
                setNewestBttn(false)
                setOldestBttn(false)
                setFilterList(transactionListInRedux)
                break
        }
    }, [sortMode])

    return(
        <Modal
            animationType = "slide"
            transparent = {true}
            visible = {showModal}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.modalView}>
                    <TouchableWithoutFeedback onPress = {() => {
                        setShowModal(false)
                        setFilterMode("")
                        setSortMode("")
                        setIsFiltering(false)
                    }}>
                        <View style = {styles.swipeDownView}>
                            <Text style = {styles.swipeDown}>h</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style = {styles.headerStyle}>
                        <Text style = {styles.txtStyle}>Filter Transaction</Text>

                        <CustomCoreButton title = "Reset" onPress = {() => {
                            setFilterMode("")
                            setSortMode("")
                            setIsFiltering(false)
                            setPreviewTransactionList(transactionListInRedux)
                        }}/>
                    </View>

                    <View style = {{ gap: 16 }}>
                        <Text style = {styles.txtStyle}>Filter by</Text>

                        <View style = {{flexDirection: 'row', gap: 8}}>
                            <FilterButtons title = "Income" isPressed = {incomebttn} onPress = {() => setFilterMode("Income")}/>
                            <FilterButtons title = "Expense" isPressed = {expensebttn} onPress = {() => setFilterMode("Expense")}/>
                        </View>
                    </View>

                    <View style = {{ gap: 16 }}>
                        <Text style = {styles.txtStyle}>Sort By</Text>

                        <View style = {styles.sortView}>
                            <FilterButtons title = "Highest" isPressed = {highestbttn} onPress = {() => setSortMode("highest")}/>
                            <FilterButtons title = "Lowest" isPressed={lowestbttn} onPress = {() => setSortMode("lowest")}/>
                            <FilterButtons title = "Newest" isPressed = {newestbttn} onPress = {() => setSortMode("newest")}/>
                            <FilterButtons title = "Oldest" isPressed={oldestbttn} onPress = {() => setSortMode("oldest")}/>
                        </View>
                    </View>

                    <CustomButton text = "Apply" onPress = {() => {
                            setShowModal(false)
                            if(filterMode){
                                setIsFiltering(true)
                                setPreviewTransactionList(filterList)
                            }
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
        gap: 20,
        paddingBottom: 40,
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