import { StyleSheet, Text, View, Image } from 'react-native';

export default function SetupSuccess({navigation}) {
  function moveToNextScreen() {
    setTimeout(() => navigation.navigate("CoreNavigation"), 2000)
  }

  return (
    <View style={styles.rootContainer}>
        <Image source={require('../../assets/Images/success.png')} />
        <Text style={styles.message}>You are set!</Text>
        {moveToNextScreen()}
    </View>

  );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },

    message: {
        fontSize: 24,
        fontWeight: '500',
    },
});
