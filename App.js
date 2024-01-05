import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native'

import OnBoarding from "./Screens/Onboarding/OnBoarding";
import SignUp from "./Screens/Onboarding/SignUp";
import Login from "./Screens/Onboarding/Login";
import ForgotPassword from "./Screens/Onboarding/ForgotPassword";
import ResetPassword from "./Screens/Onboarding/ResetPassword";

import SetupWallet from './Screens/Setup/SetupWallet';
import AddWallet from './Screens/Setup/AddAccount';

const Stack = createNativeStackNavigator();

export default function App() {

  function OnBoardingNavigation() {
    return (
      <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{title: "Sign Up"}}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{title: "Forgot Password"}}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title: "Reset Password"}}/>
          <Stack.Screen name="SetupNavigation" component={SetupNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
  }

  function SetupNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Setup Account" component={SetupWallet} options={{headerShown:false}}/>
        <Stack.Screen name="AddAccount" component={AddWallet} options={{
          title: "Add Wallet",
          headerStyle: {backgroundColor:'#7F3DFF'},
          headerTintColor: 'white',
          headerShadowVisible: false,
          contentStyle: {backgroundColor: '#7F3DFF'},
        }}
        />
      </Stack.Navigator>
    )
  }
  let testing = true
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>

        <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
          {!testing?<Stack.Screen name="OnBoardingNavigation" component={OnBoardingNavigation} options={{headerShown:false}}/>: null}
          <Stack.Screen name="SetupNavigation" component={SetupNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>

      </NavigationContainer>
      
    </>
  );
}
