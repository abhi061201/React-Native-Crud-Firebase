import {StyleSheet, Text, View, useAnimatedValue} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../Navigation/Routes/Route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type SplashScreenTypes = NativeStackScreenProps<
  RootStackParamList,
  Routes.SplashScreen
>;
const SplashScreen: React.FC<SplashScreenTypes> = ({route, navigation}) => {
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    const timeoutid = setTimeout(() => {
      const subscribe = Auth().onAuthStateChanged(user => {
        console.log('user', JSON.stringify(user));
        const rootPath = user !== null ? Routes.HomeScreen : Routes.LoginScreen;
        subscribe();
        navigation.navigate(rootPath, {});
      });
      return () => {};
    }, 3000);
  }, []);

  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text style={{color: 'black'}}>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
