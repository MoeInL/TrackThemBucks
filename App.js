import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native'

import OnBoarding1 from './Screens/OnBoarding/OnBoarding1';
import OnBoarding2 from './Screens/OnBoarding/OnBoarding2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>

        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OB1" component={OnBoarding1} />
          <Stack.Screen name="OB2" component={OnBoarding2} />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}
