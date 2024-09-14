import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppNavigation from './src/Navigation/NavigationContainer';
import {Routes} from './src/Navigation/Routes/Route';
import Auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {getFCMToken} from './src/Service/Firebase Service/usefirebase';
const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
    getFCMToken();
  }, []);

  return <AppNavigation></AppNavigation>;
};

export default App;

const styles = StyleSheet.create({});
