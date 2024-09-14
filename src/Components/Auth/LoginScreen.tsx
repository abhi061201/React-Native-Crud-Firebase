import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../Navigation/Routes/Route';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../utils/CustomTextInput';
import {
  checkCurrentUserisVerified,
  signInUser,
  verifyUserEmail,
} from '../../Service/Firebase Service/usefirebase';
import {StackActions} from '@react-navigation/native';
import {sendEmailVerification} from '@react-native-firebase/auth';
type LoginScreenProp = NativeStackScreenProps<
  RootStackParamList,
  Routes.LoginScreen
>;

const LoginScreen: React.FC<LoginScreenProp> = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  function handleLogin() {
    setLoading(true);
    const isUserLoggedIn = signInUser(email, password);
    isUserLoggedIn.then(val => {
      if (val == true) {
        const userVerified = checkCurrentUserisVerified();
        userVerified.then(item => {
          if (item == true) {
            console.log('Hello i am here');
            navigation.dispatch(StackActions.replace(Routes.HomeScreen));
          } else {
            Alert.alert('Alert', 'Your Email is not verified ', [
              {
                text: 'Cancel',
                onPress: () => {},
              },
              {
                text: 'Verify Email',
                onPress: () => {
                  verifyUserEmail();
                },
              },
            ]);
          }
        });
      } else {
        Alert.alert('please try again');
      }
      setLoading(false);
    });
  }
  return (
    <SafeAreaView>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#1F41BB',
              alignSelf: 'center',
              paddingBottom: 26,
              marginTop: 80,
            }}>
            Login Here
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: 'black',
              alignSelf: 'center',
              textAlign: 'center',
              paddingHorizontal: 50,
              marginBottom: 50,
            }}>
            Welcome back you’ve been missed!
          </Text>

          <CustomTextInput
            placeholder={'Email'}
            placeholderTextColor={'#626262'}
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder={'Password'}
            placeholderTextColor={'#626262'}
            value={password}
            onChangeText={val => {
              setPassword(val);
            }}
          />

          <TouchableOpacity style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 14,
                color: '#1F41BB',
                alignSelf: 'flex-end',
              }}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}>
            <View
              style={{
                backgroundColor: '#1F41BB',
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                paddingVertical: 10,
                height: 50,
              }}>
              {loading === false ? (
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  Sign in
                </Text>
              ) : (
                <ActivityIndicator size={'large'}></ActivityIndicator>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.SignUpScreen, {});
            }}
            style={{marginVertical: 30}}>
            <Text
              style={{
                fontSize: 14,
                color: '#494949',
                alignSelf: 'center',
              }}>
              Create new Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: 40}}
            onPress={() => {
              // navigation.navigate(Routes.SignUpScreen)
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#1F41BB',
                alignSelf: 'center',
                fontWeight: '700',
              }}>
              Or continue with
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
            }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
