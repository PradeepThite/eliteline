import messaging from '@react-native-firebase/messaging';
import { getFromStorage, setToStorage } from '../utils/Storage';
import firestore from '@react-native-firebase/firestore';

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


const create = async (collection, payload) => {
  const res = await firestore()
    .collection(collection)
    .add(payload)
  return res;
}

const update = async (collection, docId, payload) => {
  const res = await firestore()
    .collection(collection)
    .doc(docId)
    .update(payload);
  return res;
}


const get = async (collection, docId, payload) => {
  const res = await firestore()
    .collection(collection)
    .get();
  return res;
}

export const FBApi = {
  create, update, get
}



export const updateUserFcmToken = async () => { };
