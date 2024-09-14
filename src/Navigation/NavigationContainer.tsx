import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {Routes} from './Routes/Route';
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack initialScreen={Routes.SplashScreen}></AuthStack>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
