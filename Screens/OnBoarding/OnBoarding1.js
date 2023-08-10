import { View, Text, StyleSheet } from 'react-native';

function OnBoarding1() {
  return (
    <View style = {styles.Screen}>
        <Text>OnBoarding1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        padding: 50,
    },
});
export default OnBoarding1;