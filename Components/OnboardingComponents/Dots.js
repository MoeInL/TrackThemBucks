import{View, StyleSheet} from "react-native";

export default function Dots({active}){

    return(
        <View style = {styles.container}>
            <View style = {active ? styles.activeDot : styles.dot}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },

    dot: {
        width: 11,
        height: 11,
        borderRadius: 10,
        backgroundColor: "#EEE5FF",
        marginHorizontal: 5,
    },

    activeDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#7F3DFF",
        marginHorizontal: 5,
    }
})