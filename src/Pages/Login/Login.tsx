import React, {useContext, useReducer, useState} from 'react';
import {ScrollView} from 'react-native';
// import {Input} from 'component/Input';
import {
  Button,
  IconButton,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';

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

const LoginComponent = (props: any) => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [isValid, setIsValid] = useState<boolean>(true);
  const {login, googleLogin, forgetPassword, fbLogin} = useContext(AuthContext);
  const loginCB = (RES: any) => {
    alert(JSON.stringify(RES));
  };
  return (
    <ScrollView>
      <TextInput
        label="Email"
        onChangeText={(value: string) => {
          dispatchState({type: 'email', value, cb: setIsValid});
        }}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={(value: string) => {
          dispatchState({type: 'password', value, cb: setIsValid});
        }}
      />
      <Button
        mode="elevated"
        onPress={() => {
          googleLogin({loginCB});
        }}>
        Sign In
      </Button>
    </ScrollView>
  );
};

export const Login = LoginComponent;
