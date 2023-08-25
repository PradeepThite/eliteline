import React, {useContext, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import {isValidEmail, showToast} from 'utils/CommonUtil';
import {FormItem} from 'component/FormItem';
import {SocialFooter} from 'component/Common/SocialFooter';
import {ProText} from 'component/Common/Text/ProText';
import {LoaderContext} from 'Providers/LoaderProvider';

const initialState = {
  isValid: false,
};

interface Ilogin {
  type: string;
  value: string;
  cb?: Function;
}
const reducer = (state: any, action: Ilogin) => {
  const {type, value, cb = () => false} = action;
  const s = state;
  if (type === 'email') {
    s.email = isValidEmail(value) ? value : '';
  } else if (type === 'password') {
    s.password = value;
  } else if (type === 'confirmPassword') {
    s.confirmPassword = value;
  }
  if (s.email && s.password === s.confirmPassword) {
    cb(false);
  } else {
    cb(true);
  }
  return s;
};

const loginCB = ({status, message}: any) => {
  if (status === 'success') {
    showToast('Success');
  } else {
    showToast(message || 'Error');
  }
};

const LoginForm = [
  {label: 'Email', key: 'email'},
  {label: 'Password', key: 'password', extraOptions: {secureTextEntry: true}},
  {
    label: 'Confirm password',
    key: 'confirmPassword',
    extraOptions: {secureTextEntry: true},
  },
];

const RegisterComponent = ({navigation}: any) => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [isValid, setIsValid] = useState<boolean>(true);
  const {register} = useContext(AuthContext);
  const {setLoader: setIsLoading, isLoading} = useContext(LoaderContext);

  const registerAPI = async () => {
    if (state.password !== state.confirmPassword) {
      return showToast('Please enter a correct password and confirm password');
    }
    setIsLoading(true);
    let response = await register(state.email, state.password);
    console.log(response);
    setIsLoading(false);
    if (response.status) {
      return showToast('Register success..');
    }
    showToast(response.data.split(']').pop());
  };

  return (
    <ScrollView>
      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Avatar.Image source={require('assets/logo.png')} />
          </View>
          <ProText style={{textAlign: 'center', marginVertical: 15}}>
            Register
          </ProText>

          {LoginForm.map((formItem: any, index: number) => (
            <View style={{marginVertical: 5}} key={index + 'register-form'}>
              <FormItem
                options={{...formItem, dispatchState, cb: setIsValid}}
              />
            </View>
          ))}
        </View>

        <Button disabled={isValid} mode="outlined" onPress={registerAPI}>
          <ProText>Register</ProText>
        </Button>
        <ProText style={{textAlign: 'center', marginVertical: 15}}>OR</ProText>

        {/* Social sign in  */}
        <SocialFooter
          navigation={navigation}
          loginCB={loginCB}
          redirectOptions={{page: 'Login', text: 'Sign in with Email'}}
        />
      </View>
    </ScrollView>
  );
};

export const Register = RegisterComponent;
