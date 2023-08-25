import {ToastAndroid, Alert, Keyboard} from 'react-native';
import {
  Video,
  getVideoMetaData,
  getRealPath,
  Image,
} from 'react-native-compressor';

export const showToast = (
  message = '',
  duration = 'SHORT',
  position = 'TOP',
) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
};

export const showAlert = (
  title: string,
  message: any,
  buttons: any,
  options = {},
) => {
  Alert.alert(title, message, buttons, options);
};

export const hideKeyboard = () => {
  Keyboard.dismiss();
};

export const compressVideo = async (
  uri: string,
  setCompressFileProgress: Function,
) => {
  let compressedURL = await Video.compress(
    uri,
    {
      compressionMethod: 'auto',
      minimumFileSizeForCompress: 10,
    },
    progress => {
      console.log('Compression video progress: ', progress);
      setCompressFileProgress && setCompressFileProgress(progress);
    },
  );
  compressedURL = compressedURL.replace('file://data', 'file:///data');
  return compressedURL;
};

export const compressImage = async (uri: any) => {
  const options: any = {
    compressionMethod: 'auto',
    minimumFileSizeForCompress: 10,
  };
  let compressedURL = await Image.compress(
    uri,
    options,
    // progress => console.log(`Compression image progress: ${progress}`),
  );
  compressedURL = compressedURL.replace('file://data', 'file:///data');
  return compressedURL;
};

export const getVideoProperties = async (uri: string) => {
  const realPathOfCompressedFile = await getRealPath(uri, 'video');
  const compressedFileMEtaDatametaData = await getVideoMetaData(
    realPathOfCompressedFile,
  );
  return compressedFileMEtaDatametaData;
};

export const getFormattedErrorMessageOfFirebase = (
  messsage: string,
  defaultMessage: string,
) => {
  if (messsage) {
    return messsage.split(']').pop();
  }
  return defaultMessage || 'Something went wrong please try again !!! ';
};

export const isValidEmail = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};

export const isValidValue = (value: any) => {
  if (value === null || value === '' || value === undefined) {
    return false;
  }
  return true;
};
