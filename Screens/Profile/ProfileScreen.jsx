import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import HeaderComponent from "../../Components/ProfileComponents/HeaderComponent";

export default function ProfileScreen({navigation}) {
    const userNameInRedux = useSelector(state => state.userInfo.name);
    const hasProfilePicInRedux = useSelector(state => state.userInfo.hasProfilePic);

    return (
        <View style = {styles.screenStyle}>
            <HeaderComponent 
                userName={userNameInRedux} 
                hasProfilePic={hasProfilePicInRedux? true: false}
                onPress={() => navigation.navigate("EditProfile")}
            />

            
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 20,
    },
});

