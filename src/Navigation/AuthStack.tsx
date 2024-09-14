import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Components/Auth/LoginScreen';
import {Routes} from './Routes/Route';
import SignUpScreen from '../Components/Auth/SignUpScreen';
import HomeScreen from '../Components/Home/HomeScreen';
import Onboarding from '../Components/onboarding/Onboarding';
import SplashScreen from '../Components/Splash Screen/SplashScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({initialScreen}: {initialScreen: string}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        component={LoginScreen}
        name={Routes.LoginScreen}></Stack.Screen>
      <Stack.Screen
        component={SignUpScreen}
        name={Routes.SignUpScreen}></Stack.Screen>
      <Stack.Screen
        component={HomeScreen}
        name={Routes.HomeScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        component={Onboarding}
        name={Routes.OnboardingScreen}></Stack.Screen>
      <Stack.Screen
        name={Routes.SplashScreen}
        component={SplashScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
