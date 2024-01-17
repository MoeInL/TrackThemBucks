import {View, Text, Image, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MaterialIcons } from '@expo/vector-icons';
import { updateBackend } from "../../Requests/https";

import CustomTextInput from "../../Components/OnboardingComponents/CustomTextInput";

export default function EditProfileScreen({navigation}) {
    const hasProfilePic = useSelector(state => state.userInfo.hasProfilePic);
    const userInformationInRedux = useSelector(state => state.userInfo);
    const transactionsInRedux = useSelector(state => state.transactions);
    //notificationInRedux is never working
    const notificationsInRedux = useSelector(state => state.notifications);

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const tempObject = {
        transactionList: transactionsInRedux,
        notificationList: notificationsInRedux,
        userInformation: {...userInformationInRedux,
            name: name,
            phoneNumber: phoneNumber,
            hasProfilePic: hasProfilePic,
        }
    }

    return (
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}> 
            <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
                <View style = {styles.screenStyle}>
                    <View style = {styles.profilePicView}>
                        <TouchableOpacity style = {styles.proilePicConatiner}>
                            {!hasProfilePic? <MaterialIcons 
                                name="account-circle" 
                                size={200}
                                color="#7F3DFF"
                            />:<Image style = {styles.proilePicStyle} source={require("../../assets/Images/profilePicIcon.png")}/>
                            }
                        </TouchableOpacity> 
                    </View>

                    <View style = {styles.userInfo}>
                        <View>
                            <Text style = {styles.txtStyle}>Name</Text>
                            <CustomTextInput 
                                inputConfig={{
                                    onChangeText: (text) => {setName(text)},
                                    value: name,
                                }}
                                isValid = {true}
                            />
                        </View>
                        
                        <View>
                            <Text style = {styles.txtStyle}>Phone Number</Text>
                            <CustomTextInput 
                                inputConfig={{
                                    onChangeText: (text) => {setPhoneNumber(text)},
                                    value: phoneNumber,
                                    inputMode: "tel",
                                }}
                                isValid = {true}
                            />
                        </View>

                        <View style = {{alignItems: 'center', flex: 1, justifyContent: 'flex-end'}}>
                            <TouchableOpacity 
                                style = {styles.buttonStyle} 
                                onPress = {() => {
                                    navigation.navigate("Profile")
                                    updateBackend(userInformationInRedux.id, tempObject)
                                }}
                            >
                                <Text style = {styles.bttnTextStyle}>Save</Text>
                            </TouchableOpacity>  
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        paddingTop: "5%",
        gap: 20,
    },

    profilePicView: {
        height: '45%',
        alignItems: "center",
    },

    proilePicConatiner:{
        borderColor: "#AD00FF",
        borderWidth: 3,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    proilePicStyle: {
        width: 70,
        height: 70,
        borderRadius: 60,
    },

    userInfo: {
        gap: 20,
        backgroundColor: "#7F3DFF",
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: "5%",
    },

    txtStyle: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        marginLeft: "4%",
        marginBottom: "2%",
    },

    buttonStyle: {
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        width: "80%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
    },

    bttnTextStyle: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        color: "#7F3DFF",
    }
});