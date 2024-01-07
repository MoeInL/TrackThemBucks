import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

export default function MoneyPreview({title, money, icon, color}) {
    return (
        <TouchableOpacity style = {[styles.containerStyle, {backgroundColor: color}]}>
            <View style = {styles.imgContainer}>
                <Image source = {icon}/>
            </View>

            <View>
                <Text style = {styles.titleStyle}>{title}</Text>
                <Text style = {styles.moneyStyle}>${money}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
        borderRadius: 35,
        padding: 20,
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "space-around",
    },

    imgContainer: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    titleStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: "white",
    },

    moneyStyle: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
})