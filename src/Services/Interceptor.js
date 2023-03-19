import axios from 'axios';
import {getFromStorage} from '../utils/Storage';

export const jwtInterceptor = () => {
  axios.interceptors.request.use(async request => {
    let user = await getFromStorage('user');
    try {
      user = JSON.parse(user);
    } catch (e) {
      user = '';
      console.log(e);
    }
    if (user && user.token) {
      request.headers.common.Authorization = `Bearer ${user.token}`;
    }
    return request;
  });
};
