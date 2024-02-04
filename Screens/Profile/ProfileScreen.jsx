import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { updateBackend } from "../../Requests/https";

import HeaderComponent from "../../Components/ProfileComponents/HeaderComponent";
import LogoutBttn from "../../Components/ProfileComponents/LogoutBttn";

export default function ProfileScreen({navigation}) {
    const userInformationInRedux = useSelector(state => state.userInfo);
    const transactionsInRedux = useSelector(state => state.transactions);
    const notificationsInRedux = useSelector(state => state.notifications);
    const hasProfilePicInRedux = useSelector(state => state.userInfo.hasProfilePic);

    const tempObject = {
        transactionList: transactionsInRedux,
        notificationList: notificationsInRedux,
        userInformation: {...userInformationInRedux,
            token: ""
        }
    }

    function handleLogout() {
        navigation.navigate("OnBoardingNavigations");
        updateBackend(userInformationInRedux.id, tempObject);
    }

    return (
        <View style = {styles.screenStyle}>
            <HeaderComponent 
                userName={userInformationInRedux.name} 
                hasProfilePic={hasProfilePicInRedux? true: false}
                onPress={() => navigation.navigate("EditProfile")}
            />

            <View style = {styles.profileInfo}>
                <LogoutBttn onPress = {handleLogout}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 20,
        backgroundColor: "#F6F6F6"
    },

    profileInfo: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 16,
    },
});

