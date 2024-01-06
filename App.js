import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native'
import {Provider} from 'react-redux';

import OnBoarding from "./Screens/Onboarding/OnBoarding";
import SignUp from "./Screens/Onboarding/SignUp";
import Login from "./Screens/Onboarding/Login";
import ForgotPassword from "./Screens/Onboarding/ForgotPassword";
import ResetPassword from "./Screens/Onboarding/ResetPassword";

import SetupWallet from './Screens/Setup/SetupWallet';
import AddWallet from './Screens/Setup/AddWallet';
import SetupSuccess from './Screens/Setup/SetupSuccess';

import Home from './Screens/Core/Home';

import {store} from './newStore/reducers/index';

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
          <Stack.Screen name="SetupSuccess" component={SetupSuccess} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
  }

  function CoreNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  let testing = true
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>

          <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
            {!testing?<Stack.Screen name="OnBoardingNavigation" component={OnBoardingNavigation} options={{headerShown:false}}/>: null}
            {testing?<Stack.Screen name="SetupNavigation" component={SetupNavigation} options={{headerShown:false}}/>: null}
            <Stack.Screen name="CoreNavigation" component={CoreNavigation} options={{headerShown:false}}/>
          </Stack.Navigator>

        </NavigationContainer>
      </Provider>
      
    </>
  );
}
