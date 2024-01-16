import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 

export default function Header({onProfilePress, onNotificationPress, hasNotification}) {
    function getCurrentMonth(){
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const date = new Date()
        return month[date.getMonth()]
    }

    return(
        <View style = {styles.componentStyle}>
            <TouchableOpacity style = {[styles.iconContainer, styles.profileContainerStyle]} onPress = {onProfilePress}>
                <SimpleLineIcons name="user" size={24} color={'white'}/>
            </TouchableOpacity>

            <Text style = {styles.monthStyle}>{getCurrentMonth()}</Text>

            <TouchableOpacity style = {styles.iconContainer} onPress = {onNotificationPress}>
                <Ionicons name="notifications" size={35} color="#7F3DFF" />
                {hasNotification? 
                    <View style = {styles.notificationIndicator}>
                        <Text style = {styles.notificationTxt}>1</Text>
                    </View>: null}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        paddingVertical: 8,
    },

    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    profileContainerStyle: {
        borderWidth: 2,
        borderColor: "#7F3DFF",
        backgroundColor: "#7F3DFF",
    },

    monthStyle: {
        fontSize: 16,
        fontWeight: "500",
    },

    notificationIndicator:{
        position: "absolute", 
        top: 0, 
        right: 0, 
        width: 20, 
        height: 20, 
        borderRadius: 50, 
        backgroundColor: "#7F3DFF",
        justifyContent: "center",
        alignItems: "center",
    },

    notificationTxt:{
        fontSize: 12,
        fontWeight: "600",
        color: "white",
    }
})

