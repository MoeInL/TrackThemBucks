import { View, StyleSheet, Text, TextInput } from "react-native";

export default function EditTransaction({ navigation }) {
    return (
        <View style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: "#7F3DFF",
        gap: 20,
        flex: 1,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 24,
        justifyContent: "space-between",
        alignSelf: "flex-end",
    },
});