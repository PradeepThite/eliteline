import messaging from '@react-native-firebase/messaging';
import {getFromStorage, setToStorage} from '../utils/Storage';

export const getFcmToken = async () => {
  let fcmToken = await getFromStorage('fcmToken');
  try {
    if (!fcmToken || fcmToken == 'null') {
      fcmToken = await messaging().getToken();
    }
    setToStorage('fcmToken', fcmToken);
    console.log('fcmToken : ' + fcmToken);
  } catch (e) {
    console.log(e);
  }
  return fcmToken;
};

export const updateUserFcmToken = async () => {};
