import React, {createContext, useState} from 'react';

import {showToast} from '../utils/CommonUtil';
import {setToStorage} from '../utils/Storage';
import auth from '@react-native-firebase/auth';
import {jwtInterceptor} from '../Services/Interceptor';
import {GoogleSignin} from '@react-native-community/google-signin';
import {loginUser, updateNotificationToken} from '../Services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  console.log('----------- AUTH Provider rendered ----------------');
  const [user, setUser] = useState(null);

  const validateUserOnServerAndLogIn = async (userDetails, loginCB) => {
    const {email, uid, emailVerified, photoURL, displayName} = userDetails;
    var start = Date.now();
    const response = {status: 'success'};
    const loginResponse = await loginUser({
      email,
      uid,
      displayName,
      emailVerified,
      photoURL,
    });
    var end = Date.now();
    console.log(`Get user from server time ${end - start} ms`);
    
    console.log('--- Login response',loginResponse);
    if (loginResponse.status) {
      response.data = loginResponse.data;
      await setToStorage('user', loginResponse.data);
      setUser(loginResponse.data);
      jwtInterceptor(loginResponse.data);
      updateNotificationToken(loginResponse.data);
    } else {
      response.status = false;
      response.message = 'Something went wrong !';
      console.log('Something went wrong');
    }
    loginCB && loginCB(response);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, cb) => {
          const response = {status: 'true'};
          try {
            const firebaseAuthResponse =
              await auth().signInWithEmailAndPassword(email.trim(), password);

            console.log('firebaseAuthResponse', firebaseAuthResponse);

            validateUserOnServerAndLogIn(firebaseAuthResponse.user, cb);
          } catch (e) {
            response.status = false;
            response.message = e.message;
            cb(response);
          } finally {
            return response;
          }
        },

        googleLogin: async ({loginCB}) => {
          try {
            console.log('----------- googleLogin -----------');
            console.log(await GoogleSignin.hasPlayServices());
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();
            console.log('idToken');
            console.log(idToken);

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            // console.log('googleCredential')
            // console.log(googleCredential)

            // Sign-in the user with the credential
            const response = await auth().signInWithCredential(
              googleCredential,
            );
            // console.log(response);
            const userInfo = auth().currentUser; 
            console.log(loginCB);
            validateUserOnServerAndLogIn(userInfo, loginCB);
            // setToStorage('user',auth().currentUser);
            // Use it only when user Sign's up,
            // so create different social signup function
            // .then(() => {
            //   //Once the user creation has happened successfully, we can add the currentUser into firestore
            //   //with the appropriate details.
            //   // console.log('current User', auth().currentUser);
            //   firestore().collection('users').doc(auth().currentUser.uid)
            //   .set({
            //       fname: '',
            //       lname: '',
            //       email: auth().currentUser.email,
            //       createdAt: firestore.Timestamp.fromDate(new Date()),
            //       userImg: null,
            //   })
            //   //ensure we catch any errors at this stage to advise us if something does go wrong
            //   .catch(error => {
            //       console.log('Something went wrong with added user to firestore: ', error);
            //   })
            // })
            //we need to catch the whole sign up process if it fails too.
            // .catch(error => {
            //     console.log('Something went wrong with sign up: ', error);
            // });
          } catch (error) {
            loginCB && loginCB({status: 'failed'});
            console.log('Error occured');
            console.log(error);
          }
        },
        register: async (email, password) => {
          const response = {status: true};
          try {
            const userResponse = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            response.data = userResponse;
            validateUserOnServerAndLogIn(userResponse.user);
          } catch (e) {
            response.status = false;
            response.data = e.message;
          } finally {
            return response;
          }
          // try {

          //   const res = await auth().createUserWithEmailAndPassword(
          //     email,
          //     password,
          //   );
          //   console.log('res');
          //   console.log(res);
          // .then((res) => {
          //   //Once the user creation has happened successfully, we can add the currentUser into firestore
          //   //with the appropriate details.
          //   firestore()
          //     .collection('users')
          //     .doc(auth().currentUser.uid)
          //     .set({
          //       fname: '',
          //       lname: '',
          //       email: email,
          //       createdAt: firestore.Timestamp.fromDate(new Date()),
          //       userImg: null,
          //     })
          //     //ensure we catch any errors at this stage to advise us if something does go wrong
          //     .catch(error => {
          //       console.log(
          //         'Something went wrong with added user to firestore: ',
          //         error,
          //       );
          //     });
          // })
          // //we need to catch the whole sign up process if it fails too.
          // .catch(error => {
          //   console.log('Something went wrong with sign up: ', error);
          // });
          // } catch (e) {
          //   console.log('111')
          //   console.log(e);
          // }
        },
        logout: async () => {
          try {
            console.log('Loggin out from provider');
            setToStorage('user', '');
            setUser(null);
            const authResponse = await auth().signOut();
            console.log('authResponse');
            console.log(authResponse);
          } catch (e) {
            console.log('logout error');
            console.log(e);
          }
        },
        forgetPassword: async email => {
          try {
            const forgetResponse = await auth().sendPasswordResetEmail(email);
            console.log('forgetResponse');
            console.log(forgetResponse);
          } catch (err) {
            console.log(err);
            showToast(
              'Verification email not sent, Please enter correct email address..',
            );
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
