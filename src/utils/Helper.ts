import {Dimensions} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
const widthDim = Dimensions.get('screen').width;
const heightDim = Dimensions.get('screen').height;

export async function pickItems() {
  try {
    const response = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      copyTo: 'cachesDirectory',
      allowMultiSelection: true,
    });

    console.log('response: ', response);
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export {widthDim, heightDim};
