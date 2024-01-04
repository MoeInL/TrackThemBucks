import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native'

import OnBoarding from "./Screens/Onboarding/OnBoarding";
import SignUp from "./Screens/Onboarding/SignUp";
import Login from "./Screens/Onboarding/Login";
import ForgotPassword from "./Screens/Onboarding/ForgotPassword";
import ResetPassword from "./Screens/Onboarding/ResetPassword";

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
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword}/>
        </Stack.Navigator>

      </NavigationContainer>
      
    </>
  );
}
