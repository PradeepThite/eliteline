import axios from 'axios';

export const jwtInterceptor = (user) => {
  axios.interceptors.request.use(async request => {
    if (user && user.token) {
      request.headers.Authorization = `Bearer ${user.token}`;
    } else {
      console.log('---- Wrong user stored..')
    }
    return request;
  });
};
