import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native'

import OnBoarding from "./Screens/Onboarding/OnBoarding";
import SignUp from "./Screens/Onboarding/SignUp";
import Login from "./Screens/Onboarding/Login";
import ForgotPassword from "./Screens/Onboarding/ForgotPassword";
import ResetPassword from "./Screens/Onboarding/ResetPassword";

import SetupAccount from './Screens/Setup/SetupAccount';

const Stack = createNativeStackNavigator();

export default function App() {

  function OnBoardingNavigation() {
    return (
      <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword}/>
          <Stack.Screen name="SetupNavigation" component={SetupNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
  }

  function SetupNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="SetupAccount" component={SetupAccount} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>

        <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
          <Stack.Screen name="OnBoardingNavigation" component={OnBoardingNavigation} options={{headerShown:false}}/>
          <Stack.Screen name="SetupNavigation" component={SetupNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>

      </NavigationContainer>
      
    </>
  );
}
