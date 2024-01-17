import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function HeaderComponent({userName, hasProfilePic, onPress}) {
    return (
        <View style = {styles.componentSryle}>
            <View style = {styles.userInfo}>
                <View style = {styles.proilePicConatiner}>
                    {!hasProfilePic? <MaterialIcons 
                        name="account-circle" 
                        size={90}
                        color="#7F3DFF"
                    />:<Image style = {styles.proilePicStyle} source={require("../../assets/Images/profilePicIcon.png")}/>
                    }
                </View> 

                <View style = {styles.userNameContainer}>
                    <Text style = {styles.userNameStyle}>Username</Text>
                    <Text style = {styles.userName}>{userName}</Text>
                </View>
            </View>
                
            <TouchableOpacity onPress = {onPress}>
                <Feather name="edit-2" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    componentSryle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    proilePicConatiner:{
        borderColor: "#AD00FF",
        borderWidth: 3,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },

    proilePicStyle: {
        width: 70,
        height: 70,
        borderRadius: 60,
    },

    userInfo: {
        flexDirection: "row",
        gap: 10,
    },

    userNameContainer:{
        justifyContent: "center",
        gap: 5,
    },

    userNameStyle:{
        color: "#91919F",
        fontSize: 14,
        fontWeight: "500",
    },

    userName:{
        fontSize: 24,
        fontWeight: "600",
    }
});

