import {View, Text, StyleSheet} from 'react-native';
import { useState } from 'react';
import CustomButton from '../../Components/OnboardingComponents/CustomButton';
import CustomTextInput from '../../Components/OnboardingComponents/CustomTextInput';

export default function AddAccount({navigation}) {
    const [name, setName] = useState("")
    const [accountType, setAccountType] = useState("")
    const [balance, setBalance] = useState("")

    return(
        <>
            <View style = {styles.screenStyle}>
                <Text style = {styles.txtStyle}>Balance</Text>
                <Text style = {styles.moneyStyle}>$00.0</Text>
            </View>

            <View style = {styles.containerView}>
                <CustomTextInput placeholder="Name" isValid={true} onChangeText={(text) => setName(text)}/>
                <CustomTextInput placeholder="Account Type" isValid={true}/>
                <CustomTextInput placeholder="Balance" isValid={true} onChangeText={(text) => setBalance(text)}/>
                <CustomButton text={"Add Account"} onPress={() => navigation.navigate("AddAccount")}/>
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
        marginLeft: 5,
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