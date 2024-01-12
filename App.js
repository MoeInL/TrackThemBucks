import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import SplashScreen from './Screens/SplashScreen';

import OnBoarding from "./Screens/Onboarding/OnBoarding";
import SignUp from "./Screens/Onboarding/SignUp";
import Login from "./Screens/Onboarding/Login";
import ForgotPassword from "./Screens/Onboarding/ForgotPassword";
import ResetPassword from "./Screens/Onboarding/ResetPassword";

import SetupWallet from './Screens/Setup/SetupWallet';
import AddWallet from './Screens/Setup/AddWallet';
import SetupSuccess from './Screens/Setup/SetupSuccess';

import Home from './Screens/Core/Home';
import AddTransaction from './Screens/Core/AddTransaction';

import {store} from './States/Store';
import { Ionicons } from '@expo/vector-icons';
import { pullFromBackend } from './Requests/https';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  const [token, setToken] = useState("")
  const [walletCreated, setWalletCreated] = useState(false)
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const response = await pullFromBackend()

      if(response !== null) {  
        const userIdFromDatabase = Object.keys(response)[0] // Eventually, we need to traverse Object.keys(response) and get the data of the key saved on the user device

        setToken(response[userIdFromDatabase].userInfo.token)
        setWalletCreated(response[userIdFromDatabase].userInfo.walletCreated)
      }
    }

    fetchData()
    
    setTimeout(() => {
      setAppLoading(false)
    }, 3000)
  }, [])

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
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={Home} options={{
          headerShown:false,
          tabBarIcon: () => <Ionicons name="home" size = {24} color={"#7F3DFF"}/>,
        }}/>

        
      </BottomTab.Navigator>
    )
  }

  return (
    <>
      <StatusBar style="auto" />

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SpashScreen' screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
            {appLoading?<Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>: null}
            {token === ""?<Stack.Screen name="OnBoardingNavigation" component={OnBoardingNavigation} options={{headerShown:false}}/>: null}
            {!walletCreated?<Stack.Screen name="SetupNavigation" component={SetupNavigation} options={{headerShown:false}}/>: null}
            <Stack.Screen name="CoreNavigation" component={CoreNavigation} options={{headerShown:false}}/>
            <Stack.Screen 
              name="AddTransaction" 
              component={AddTransaction} 
              options ={{
                contentStyle: {backgroundColor: '#FD3C4A'}, 
                headerStyle: {backgroundColor: '#FD3C4A'},
                headerTintColor: 'white',
                title: "Add Transaction",
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
