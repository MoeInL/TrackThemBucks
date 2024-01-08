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
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center", 
        gap: 10,
        minWidth:"48%",
    },

    imgContainer: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    titleStyle: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },

    moneyStyle: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
})