import {GoogleSignin} from '@react-native-community/google-signin';
const config = {
  offlineAccess: false,
  webClientId:
    '638342952659-ft8jap4emtop4i94khu8dbv9l7j55au9.apps.googleusercontent.com',
  databaseURL: 'https://elite-line-default-rtdb.firebaseio.com'
};

console.log(
  '------------------------ Setting config of  G-Auth ------------------------',
);
GoogleSignin.configure(config);
