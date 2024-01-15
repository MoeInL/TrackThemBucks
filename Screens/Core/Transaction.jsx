import {View, StyleSheet, Text, FlatList} from "react-native";

export default function Transaction() {
    return (
        <View style={styles.container}>
            <Text>Transaction</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        paddingTop: 50,
        gap: 30,
    },
});
