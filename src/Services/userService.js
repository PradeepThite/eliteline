import axios from 'axios';
import {getFromStorage, setToStorage} from '../utils/Storage';
import {BASE_URL} from './config';
import messaging from '@react-native-firebase/messaging';

export const getUserDetails = async ({email, auth_id}) => {
  const response = await axios.get(`${BASE_URL}/api/getUser/`, {
    params: {email, uid: auth_id},
  });
  return response;
};

export const getUserDetailsById = async id => {
  const response = await axios.get(`${BASE_URL}/api/user/${id}`);
  return response;
};

export const loginUser = async user => {
  const response = await axios.post(`${BASE_URL}/api/login/`, user);
  return await response.data;
};

export const uploadProfile = async body => {
  const url = BASE_URL + '/api/updateProfile';
  const response = await axios.post(url, body);
  if (response.data.errorCode == '00') {
    return response.data.data;
  }
  return null;
};

export const updateNotificationToken = async user => {
  let {token, notificationToken} = user;
  const localFCMToken = await getFromStorage('fcmToken');
  const phoneFCMToken = await messaging().getToken();
  if (localFCMToken == phoneFCMToken) {
    console.log('Token is already updated');
  } else {
    console.log('new token updating');
    notificationToken = phoneFCMToken;
    await axios.post(`${BASE_URL}/api/updateNotificationToken`, {
      token,
      notificationToken,
    });
    setToStorage('fcmToken', notificationToken);
  }
};
