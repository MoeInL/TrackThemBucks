import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

export default function LogoutBttn({onPress}) {
    return (
        <TouchableOpacity style = {styles.bttnStyle} onPress = {onPress}>
            <View style = {styles.iconStyle}>
                <MaterialIcons name="logout" size={24} color="#FD3C4A" />
            </View>

            <Text style = {styles.txtStyle}>Logout</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bttnStyle: {
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 16,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,

    },
    txtStyle: {
        fontSize: 16,
        fontWeight: "500",
    },

    iconStyle: {
        backgroundColor: "#FFE2E4",
        borderRadius: 16,
        padding: 10,
    },
});