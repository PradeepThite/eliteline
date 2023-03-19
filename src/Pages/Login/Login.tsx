import React, {useContext, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import {showToast} from 'utils/CommonUtil';
import {FormItem} from 'component/FormItem';

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
    s.email = value;
  } else if (type === 'password') {
    s.password = value;
  }
  if (s.email && s.password) {
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
];

const LoginComponent = ({navigation}: any) => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [isValid, setIsValid] = useState<boolean>(true);
  const {login, googleLogin, forgetPassword, fbLogin} = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          {LoginForm.map((formItem: any, index: number) => (
            <FormItem
              key={index + 'login-form'}
              options={{...formItem, dispatchState, setIsValid}}
            />
          ))}
        </View>
        <Button
          mode="outlined"
          disabled={isValid}
          onPress={() => {
            login(state.email, state.password, loginCB);
          }}>
          Sign In
        </Button>

        <Text style={{textAlign: 'center'}}>OR</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            icon="google"
            mode="outlined"
            onPress={() => {
              googleLogin({loginCB});
            }}>
            Google
          </Button>
          <Button
            icon="email"
            mode="outlined"
            onPress={() => navigation.navigate('Register')}>
            Sign Up with Email
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export const Login = LoginComponent;
