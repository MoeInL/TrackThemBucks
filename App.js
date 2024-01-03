import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native'

import OnBoarding1 from "./Screens/Onboarding/OnBoarding1";
import SignUp from "./Screens/Onboarding/SignUp";
import Login from "./Screens/Onboarding/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>

        <Stack.Navigator screenOptions={
            { 
              contentStyle: {backgroundColor: 'white'},
            }
          }
        >
          <Stack.Screen name="OnBoarding1" component={OnBoarding1} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>

      </NavigationContainer>
      
    </>
  );
}
