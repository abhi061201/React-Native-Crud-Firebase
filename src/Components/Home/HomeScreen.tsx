import {
  Alert,
  BackHandler,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackActions, useFocusEffect} from '@react-navigation/native';
import {
  UploadImageToStore,
  getFirebaseAuth,
  getUser,
} from '../../Service/Firebase Service/usefirebase';
import {getAuth} from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../Navigation/Routes/Route';
import {heightDim, pickItems, widthDim} from '../../utils/Helper';
import {DocumentPickerResponse} from 'react-native-document-picker';

export function backHandling() {
  Alert.alert('Hold on!', 'Are you sure you want to exit?', [
    {text: 'Cancel'},
    {text: 'Yes', onPress: () => BackHandler.exitApp()},
  ]);
  return true;
}
type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.HomeScreen
>;
const HomeScreen: React.FC<HomeScreenProps> = ({route, navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backHandling,
      );
      return () => backHandler.remove();
    }, []),
  );
  const [pickImage, setPickImage] = useState<DocumentPickerResponse>();
  return (
    <View>
      <Text style={{fontSize: 40, color: 'black'}}>HomeScreen</Text>
      <Button
        title="Logout"
        onPress={() => {
          getFirebaseAuth().signOut();
          navigation.dispatch(StackActions.replace(Routes.LoginScreen));
        }}></Button>

      <Text style={{fontSize: 40, color: 'black'}}>{getUser()?.email}</Text>
      {
        <View>
          {pickImage != undefined ? (
            // <FlatList
            //   data={pickImage}
            //   renderItem={item => (
            //     <Image
            //       key={item.index}
            //       source={{uri: item.item.uri}}
            //       style={{height: heightDim / 5, width: widthDim / 5}}></Image>
            //   )}></FlatList>
            <Image
              key={pickImage.uri}
              source={{uri: pickImage.uri}}
              style={{height: heightDim / 5, width: widthDim / 5}}></Image>
          ) : (
            <Text>please select any image</Text>
          )}
        </View>
      }
      <Button
        title="Pick Image"
        onPress={() => {
          pickItems().then(item => {
            setPickImage(item);
          });
        }}></Button>

      <Button
        title="UploadImageToStore"
        onPress={() => {
          if (pickImage !== undefined) {
            console.log('pick image response', pickImage);
            UploadImageToStore(pickImage);
          }
        }}></Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
