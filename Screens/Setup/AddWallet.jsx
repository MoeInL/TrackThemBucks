import {View, Text, StyleSheet, Alert, Keyboard,KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushNameToRedux, pushAccountTypeToRedux, pushBalanceToredux } from '../../States/actions/userInfoActions';
import { updateBackend } from '../../Requests/https';

import CustomButton from '../../Components/OnboardingComponents/CustomButton';
import CustomTextInput from '../../Components/OnboardingComponents/CustomTextInput';
import DropDownBox from '../../Components/SetupComponents/DropDownBox';

export default function AddWallet({navigation}) {
    //make the UI more interactive friendly
    
    const [name, setName] = useState("")
    const [accountType, setAccountType] = useState("")
    const [balance, setBalance] = useState("")
    const [isPressed, setIsPressed] = useState(false)

    const dispatch = useDispatch()
    const information = useSelector(state => state.userInfo)
    
    const tempOnject = {
        userInformation: {
            ...information,
            name: name,
            accountType: accountType,
            balance: balance.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            walletCreated: true,
        }, 
    }

    useEffect(() => {
        setIsPressed(false)
    }, [accountType])

    function AddWallet(){
        dispatch(pushNameToRedux(name))
        dispatch(pushBalanceToredux(balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')))
        dispatch(pushAccountTypeToRedux(accountType))

        pushToFirebase()
    }

    async function pushToFirebase() {
        let proceed = true;
        
        try {
            await updateBackend(information.id, tempOnject)
        } catch (error) {
            Alert.alert("Error", "Could not connect to server. Please try again later.")
            proceed = false
        }
        proceed? navigation.navigate("SetupSuccess"): null
    }
    return(
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style = {styles.screenStyle}>
                    <View style = {styles.txtContainer}>
                        <Text style = {styles.txtStyle}>Balance</Text>
                        <Text style = {styles.moneyStyle}> {balance === ""? "$0.00": `$${balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
                    </View>

                    <View style = {styles.containerView}>
                        <View style = {styles.inputContainer}>
                            <CustomTextInput 
                                inputConfig={{
                                    placeholder: "Name",
                                    onChangeText: (text) => setName(text),
                                    value: name,
                                    onblur: Keyboard.dismiss(),
                                }}
                                isValid={true} 
                            />

                            <DropDownBox 
                                title={accountType === ""? "Account Type": accountType} 
                                children={[["Bank",0], ["Paypall",1], ["Venmo",2], ["Cashapp",3]]}
                                isPressed={isPressed}
                                onPress={() => {
                                    setIsPressed(!isPressed)
                                    Keyboard.dismiss()
                                }}
                                onblur={() => setIsPressed(false)}
                                onPick={(text) => setAccountType(text)}
                            />

                            {!isPressed? <CustomTextInput 
                                inputConfig={{
                                    placeholder: "Balance", 
                                    onChangeText: (text) => setBalance(text),
                                    value: balance,
                                    keyboardType: "numeric",
                                    maxLength: 7,
                                    onblur: Keyboard.dismiss()
                                }}
                                isValid={true} 
                            />: null}
                        </View>

                        {!isPressed? <CustomButton 
                            text={"Add Account"} 
                            onPress={AddWallet}
                        />: null}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: "flex-end",
    },

    txtContainer: {
        padding: 16,
    },

    txtStyle:{
        fontSize: 18,
        fontWeight: '600',
        color: '#FCFCFC',
        opacity: 0.64,
    },

    moneyStyle:{
        fontSize: 64,
        fontWeight: '600',
        color: 'white',
    },

    containerView: {
        backgroundColor: "white",
        justifyContent: "space-between",
        height: "50%",
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },

    inputContainer: {
        gap: 20,
    },
})