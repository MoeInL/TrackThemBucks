import {View, Text, StyleSheet} from 'react-native';

import CustomButton from '../../Components/OnboardingComponents/CustomButton';

export default function SetupAccount({navigation}) {
    return(
        <View style = {styles.screenStyle}>
            <View style = {styles.txtContainer}>
                <Text style = {styles.headerText}>Let's setup your account!</Text>
                <Text>Account can be your bank, credit card or your wallet.</Text>
            </View>

            <CustomButton text={"Let's go"} onPress={() => navigation.navigate("AddAccount")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        paddingVertical: "10%",
        paddingHorizontal: "5%",
        marginTop: 50,
        gap: 20,
        justifyContent: 'space-between',
    },

    txtContainer: {
        gap: 20,
        width: "80%",
    },

    headerText: {
        fontSize: 36,
        fontWeight: '500',
    }
})