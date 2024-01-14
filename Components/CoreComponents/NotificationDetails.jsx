import {View, StyleSheet, Text, Platform} from "react-native";

export default function NotificationDetails({title, message, time}){
    return(
        <View style = {Platform === "android"? styles.componentStyle: [styles.componentStyle, styles.iosShadow]}>
            <View style = {styles.txtContainer}>
                <Text style = {styles.titleStyle}>{title}</Text>
                <Text style = {styles.messageStyle}>{message}</Text>
            </View>

            <View style = {styles.timeContainer}>
                <Text style = {styles.messageStyle}>{time}</Text>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    componentStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        elevation: 1,
    },

    iosShadow: {
        backgroundColor: 'white',
        shadowOpacity: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
		shadowRadius: 6,
    },

    txtContainer: {
        width: "85%",
        gap: 7,
    },

    titleStyle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#292B2D",
    },

    messageStyle: {
        fontSize: 13,
        fontWeight: "500",
        color: "#91919F",
    },

    timeContainer: {
        alignItems: "flex-end",
    },
})