import { Image, View, Pressable, StyleSheet } from "react-native";

export default function ImageSlideShow({path, onSwitch}){
    return(
        <View style = {styles.container}>
            <Pressable onPress={onSwitch}>
                <Image source={path} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
})