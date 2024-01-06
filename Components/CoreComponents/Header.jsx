import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 

export default function Header({navigation}) {
    function getCurrentMonth(){
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const date = new Date()
        return month[date.getMonth()]
    }

    return(
        <View style = {styles.componentStyle}>
            <TouchableOpacity style = {[styles.iconContainer, styles.profileContainerStyle]}>
                <SimpleLineIcons name="user" size={24}/>
            </TouchableOpacity>

            <Text style = {styles.monthStyle}>{getCurrentMonth()}</Text>

            <TouchableOpacity style = {styles.iconContainer}>
                <Ionicons name="notifications" size={35} color="#7F3DFF" />
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
    },

    monthStyle: {
        fontSize: 16,
        fontWeight: "500",
    }
})

