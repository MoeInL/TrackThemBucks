import {View, Text, StyleSheet, Alert} from 'react-native';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushNameToRedux, pushAccountTypeToRedux, pushBalanceToredux } from '../../States/actions/userInfoActions';
import { updateBackend } from '../../Requests/https';

import CustomButton from '../../Components/OnboardingComponents/CustomButton';
import CustomTextInput from '../../Components/OnboardingComponents/CustomTextInput';
import DropDownBox from '../../Components/SetupComponents/DropDownBox';

export default function AddWallet({navigation}) {
    //Fix the balance length to a number
    //make the UI more interactive friendly
    //fix the , code for the balance
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
            balance: balance,
            walletCreated: true,
        }, 
    }

    useEffect(() => {
        setIsPressed(false)
    }, [accountType])

    function AddWallet(){
        dispatch(pushNameToRedux(name))
        dispatch(pushBalanceToredux(balance))
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
        <>
            <View style = {styles.screenStyle}>
                <Text style = {styles.txtStyle}>Balance</Text>
                <Text style = {styles.moneyStyle}> {balance === ""? "$0.00": `$${balance}`}</Text>
            </View>

            <View style = {styles.containerView}>
                <CustomTextInput 
                    inputConfig={{
                        placeholder: "Name",
                        onChangeText: (text) => setName(text),
                        value: name,
                    }}
                    isValid={true} 
                />

                <DropDownBox 
                    title={accountType === ""? "Account Type": accountType} 
                    children={[["Bank",0], ["Paypall",1], ["Venmo",2], ["Cashapp",3]]}
                    isPressed={isPressed}
                    onPress={() => setIsPressed(!isPressed)}
                    onPick={(text) => setAccountType(text)}
                />

                {!isPressed? <CustomTextInput 
                    inputConfig={{
                        placeholder: "Balance", 
                        onChangeText: (text) => setBalance(text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
                        value: balance,
                        keyboardType: "numeric"
                    }}
                    isValid={true} 
                />: null}

                {!isPressed? <CustomButton 
                    text={"Add Account"} 
                    onPress={AddWallet}
                />: null}
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        justifyContent: 'flex-end'
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
        gap: 20,
        height: "50%",
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
})