import React, {useContext, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import {isValidEmail, showToast} from 'utils/CommonUtil';
import {FormItem} from 'component/FormItem';
import {SocialFooter} from 'component/Common/SocialFooter';

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

  const registerAPI = async () => {
    if (state.password !== state.confirmPassword) {
      return showToast('Please enter a correct password and confirm password');
    }
    // showLoading({title: 'Creating user...'});
    let response = await register(state.email, state.password);
    console.log(response);
    // hideLoading();
    if (response.status) {
      return showToast('Register success..');
    }
    showToast(response.data.split(']').pop());
  };

  return (
    <ScrollView>
      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          <Text style={{textAlign: 'center', marginVertical: 15}}>
            Register
          </Text>

          {LoginForm.map((formItem: any, index: number) => (
            <View style={{marginVertical: 5}}>
              <FormItem
                key={index + 'register-form'}
                options={{...formItem, dispatchState, cb: setIsValid}}
              />
            </View>
          ))}
        </View>

        <Button disabled={isValid} mode="outlined" onPress={registerAPI}>
          Register
        </Button>
        <Text style={{textAlign: 'center', marginVertical: 15}}>OR</Text>

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
