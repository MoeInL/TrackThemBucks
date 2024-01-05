import {View, Text, StyleSheet} from 'react-native';
import { useState } from 'react';

import CustomButton from '../../Components/OnboardingComponents/CustomButton';
import CustomTextInput from '../../Components/OnboardingComponents/CustomTextInput';
import DropDownBox from '../../Components/SetupComponents/DropDownBox';

export default function AddWallet({navigation}) {
    const [name, setName] = useState("")
    const [accountType, setAccountType] = useState("")
    const [balance, setBalance] = useState("")

    const [isPressed, setIsPressed] = useState(false)

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
                    title="Account Type" 
                    children={[["Bank",0], ["Paypall",1], ["Venmo",2], ["Cashapp",3]]}
                    isPressed={isPressed}
                    onPress={() => setIsPressed(!isPressed)}
                />

                {!isPressed? <CustomTextInput 
                    inputConfig={{
                        placeholder: "Balance", 
                        onChangeText: (text) => setBalance(text),
                        value: balance,
                        keyboardType: "numeric"
                    }}
                    isValid={true} 
                />: null}

                {!isPressed? <CustomButton 
                    text={"Add Account"} 
                    onPress={() => navigation.navigate("AddAccount")}
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