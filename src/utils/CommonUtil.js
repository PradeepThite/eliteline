import { ToastAndroid, Alert, Keyboard } from "react-native";
import { Video, getVideoMetaData, getRealPath, Image } from 'react-native-compressor';

export const showToast = (message = "", duration = 'SHORT', position = 'TOP') => {
    ToastAndroid.showWithGravity(message, ToastAndroid[duration], ToastAndroid[position]);
}

export const showAlert = (title, message, buttons = [], options = {}) => {
    Alert.alert(title, message, buttons, options);
}

export const hideKeyboard = ()=>{
    Keyboard.dismiss()
}

export const compressVideo = async (uri,setCompressFileProgress)=>{
    let compressedURL = await Video.compress(uri, {
        compressionMethod: 'auto',
        minimumFileSizeForCompress: 10
      },
        (progress) => {
          console.log('Compression video progress: ', progress);
          setCompressFileProgress && setCompressFileProgress(progress)
        }
      );
      compressedURL = compressedURL.replace('file://data','file:///data')
      return compressedURL
}

export const compressImage = async (uri)=>{
  let compressedURL = await Image.compress(uri, {
    compressionMethod: 'auto',
    minimumFileSizeForCompress: 10
  },
    (progress) => {
      console.log('Compression image progress: ', progress);
    }
  );
  compressedURL = compressedURL.replace('file://data','file:///data')
  return compressedURL
}

export const getVideoProperties = async(uri)=>{
    const realPathOfCompressedFile = await getRealPath(uri, 'video'); 
      const compressedFileMEtaDatametaData = await getVideoMetaData(realPathOfCompressedFile);
      return compressedFileMEtaDatametaData;
}

export const getFormattedErrorMessageOfFirebase = (messsage,defaultMessage)=>{
  if(messsage){
    return messsage.split(']').pop()
  }
  return defaultMessage || 'Something went wrong please try again !!! '
}