import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

import {pullFromBackend} from "../../Requests/https";

import NotificationDetails from "../../Components/CoreComponents/NotificationDetails";

export default function Notification(){
    const [hasNotification, setNotification] = useState(false)
    const [tempObject, setTempObject] = useState({})

    useEffect(() => {
        async function fetchData() {
            const response = await pullFromBackend()
            const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

            if(response[userIdFromDatabase].notificationList){
                setNotification(true)
                setTempObject(response[userIdFromDatabase].notificationList)
            }else
                setNotification(false)
        }

        fetchData()
    }, [])

    function notifications(){
        return(
            <NotificationDetails title = {tempObject.title} message={tempObject.message} time = {tempObject.time}/>
        )
    }

    return(
        <View style={hasNotification? styles.notificationScreen: styles.noNotificationScreen}>
            {hasNotification? notifications():<Text style = {styles.textStyle}>There is no notification for now</Text>}
        </View>
    ) 
}

const styles = StyleSheet.create({
    noNotificationScreen: {
        flex: 1,
        padding: "5%",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    notificationScreen: {
        flex: 1,
        padding: 10,
        gap: 20,
    },

    textStyle:{
        fontSize: 14,
        fontWeight: "500",
        color: "#91919F",
    }
})