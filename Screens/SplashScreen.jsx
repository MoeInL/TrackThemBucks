import {View, StyleSheet, Image} from 'react-native'; 

export default function SplashScreen() {
    return(
        <View style = {styles.container}>
            <Image source = {require('../assets/Images/LaunchScreen.png')} style = {styles.imgStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgStyle:{
        flex: 1,
        width: "100%",
    }
})