import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {widthDim} from '../../utils/Helper';
import CustomTextInput from '../../utils/CustomTextInput';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {Routes} from '../../Navigation/Routes/Route';
import {
  createUser,
  storeUserData,
  verifyUserEmail,
} from '../../Service/Firebase Service/usefirebase';
import {CommonActions, StackActions} from '@react-navigation/native';

type SignUpProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.SignUpScreen
>;

const SignUpScreen: React.FC<SignUpProps> = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function handleCreateAccount() {
    setLoading(true);
    if (password === confirmPassword) {
      createUser(email, password).then(() => {
        storeUserData({
          userEmail: email,
          userName: name,
          otherData: {
            otherData: 'this can be anything',
          },
        });
        Alert.alert('Alert', 'Please verify your email', [
          {text: 'cancel', onPress: () => {}},
          {
            text: 'Verify',
            onPress: () => {
              verifyUserEmail();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: Routes.LoginScreen}],
                }),
              );
            },
          },
        ]);
        setLoading(false);
      });
    } else {
      console.warn('password not matches with confirm password');
      setLoading(false);
    }
  }
  return (
    <ScrollView style={{width: widthDim, paddingHorizontal: 40}}>
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
          Create Account
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            paddingHorizontal: 20,
            marginBottom: 50,
          }}>
          Create an account so you can explore all the existing jobs
        </Text>

        <CustomTextInput
          placeholder={'Name'}
          placeholderTextColor={'#626262'}
          value={name}
          onChangeText={val => {
            setName(val);
          }}
        />
        <CustomTextInput
          placeholder={'Email'}
          placeholderTextColor={'#626262'}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
        <CustomTextInput
          placeholder={'Password'}
          placeholderTextColor={'#626262'}
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
        />
        <CustomTextInput
          placeholder={'Confirm Password'}
          placeholderTextColor={'#626262'}
          value={confirmPassword}
          onChangeText={val => {
            setConfirmPassword(val);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            handleCreateAccount();
          }}>
          <View
            style={{
              marginTop: 30,
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
                Sign Up
              </Text>
            ) : (
              <ActivityIndicator size={'large'}></ActivityIndicator>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 30}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#494949',
              alignSelf: 'center',
            }}>
            Already have an Account?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 40}}>
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
          }}>
          {/* <CustomButton buttonName={'google'} callback={() => { console.warn("1") }} />
            <CustomButton buttonName={'facebook'} callback={() => { console.warn("2") }} />
            <CustomButton buttonName={'apple'} callback={() => { console.warn("3") }} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
