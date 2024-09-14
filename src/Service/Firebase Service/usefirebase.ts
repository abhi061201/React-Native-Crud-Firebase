import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {DocumentPickerResponse} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import FCmessaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const usefirebase = () => {
  const [fbuser, setFbUser] = useState<FirebaseAuthTypes.UserCredential>();
  return {
    fbuser,
    setFbUser,
  };
};
export async function createUser(email: string, password: string) {
  try {
    if (email.length > 0 && password.length > 0) {
      const user = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(item => {
          auth().signOut();
        });
    } else {
      Alert.alert('please put all data');
    }
  } catch (error) {
    console.error(error);
  }
}

export function getUser() {
  return auth().currentUser;
}

export function getFirebaseAuth() {
  return auth();
}

export async function signInUser(
  email: string,
  password: string,
): Promise<boolean> {
  // const {fbuser,setFbUser} = usefirebase();
  try {
    if (email.length > 0 && password.length > 0) {
      const user = await auth()
        .signInWithEmailAndPassword(email, password)
        .then(item => {
          return true;
        });
      return user;
    } else {
      Alert.alert('please verify all data');
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

export async function verifyUserEmail() {
  try {
    const userVerification = await auth().currentUser?.sendEmailVerification();
    console.log('email send success', userVerification);
  } catch (error) {
    console.error(error);
  }
}

export async function checkCurrentUserisVerified() {
  const userVerified = await auth().currentUser?.emailVerified;
  return userVerified;
}

export interface userDataType {
  userEmail?: string;
  userMobileNo?: string;
  userName?: string;
  otherData?: any;
}
export async function storeUserData(userData: userDataType) {
  const currentUser = getUser();
  try {
    var response = await firestore()
      .collection('Users')
      .doc(currentUser?.uid)
      .set(userData)
      .then(() => {
        console.log('user data successfully set');
      });
  } catch (error) {
    console.error(error);
  }
}
export async function sendOTPToVerify(mobileNum: string) {
  const mobileNumber = '+91' + mobileNum;
  try {
    const response = auth()
      .signInWithPhoneNumber(mobileNumber)
      .then(() => {});
  } catch (error) {
    console.error(error);
  }
}

export async function verifyUserWithOTP(OTP: string) {
  try {
  } catch (error) {}
}

export async function UploadImageToStore(params: DocumentPickerResponse) {
  try {
    // await params.forEach(item => {
    //   storage()
    //     .ref(`userProfile/${item.uri}`)
    //     .putFile(item.uri)
    //     .then(() => {
    //       console.log('item saved success');
    //     });
    // });

    if (params === null || params === undefined) {
      console.warn('image is null');
      return;
    }
    console.log(params);
    if (params.fileCopyUri !== null) {
      storage()
        .ref(`userProfile/${params.fileCopyUri}`)
        .putFile(params.fileCopyUri)
        .then(() => {
          console.log('item saved success');
        });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getFCMToken() {
  try {
    const storeToken = await AsyncStorage.getItem('fcmToken');
    if (storeToken === null) {
      const FCMToken = await FCmessaging().getToken();
      console.log('fcm token', FCMToken);
      AsyncStorage.setItem('fcmToken', FCMToken);
    } else {
      return storeToken;
    }
  } catch (error) {
    console.error(error);
  }
}
