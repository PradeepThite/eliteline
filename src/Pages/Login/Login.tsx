import React, {useContext, useEffect, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import {showToast, isValidEmail} from 'utils/CommonUtil';
import {FormItem} from 'component/FormItem';
import {SocialFooter} from 'component/Common/SocialFooter';

const initialState = {
  isValid: false,
  email: '',
  password: '',
  forgetemail: '',
};

interface Ilogin {
  type: string;
  value: string;
  cb?: Function;
  rCb?: Function;
}
const reducer = (state: any, action: Ilogin) => {
  const {type, value, cb = () => false, rCb = () => false} = action;
  let s = state;
  if (type === 'email') {
    s.email = isValidEmail(value) ? value : '';
  } else if (type === 'password') {
    s.password = value;
  }
  switch (type) {
    case 'forgetemail':
      const isValidForgotEmail = isValidEmail(value);
      s.forgetemail = isValidForgotEmail ? value : '';
      console.log(isValidForgotEmail);
      cb(isValidForgotEmail ? 'forgetemail' : '');
      break;
    case 'reset':
      s = initialState;
      cb('');
      rCb();
    default:
      if (s.email && s.password) {
        cb('login');
      } else {
        cb('');
      }
  }
  return s;
};

const LoginForm = [
  {label: 'Email', key: 'email'},
  {label: 'Password', key: 'password', extraOptions: {secureTextEntry: true}},
];

const forgetPasswordInputOptions = {
  label: 'Email',
  key: 'forgetemail',
  extraOptions: {
    style: {width: '100%', color: 'red'},
  },
};

const LoginComponent = ({navigation}: any) => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [validStatement, setValidStatement] = useState<string>('');
  const {login, forgetPassword} = useContext(AuthContext);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formItems, setFormItems] = useState<any>(LoginForm);

  const forgetPasswordAPI = async () => {
    setIsLoading(true);
    await forgetPassword(state.forgetemail);
    setShowForgetModal(prev => !prev);
    showToast('Verification email sent. Please check email');
    setIsLoading(false);
  };

  const loginWithPassword = () => {
    setIsLoading(true);
    login(state.email, state.password, loginCB);
  };

  const loginCB = ({status, message}: any) => {
    setIsLoading(false);

    if (status === 'success') {
      showToast('Success');
    } else {
      showToast(message || 'Error');
    }
  };

  useEffect(() => {
    const rCb = () => {
      setFormItems(showForgetModal ? [forgetPasswordInputOptions] : LoginForm);
    };
    const op: any = {
      type: 'reset',
      value: initialState,
      cb: setValidStatement,
      rCb,
    };
    dispatchState(op);
  }, [showForgetModal]);

  return (
    <ScrollView>
      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          <Text style={{textAlign: 'center', marginVertical: 15}}>
            {showForgetModal ? 'Forget password email' : 'Login'}
          </Text>

          {formItems.map((formItem: any, index: number) => (
            <View style={{marginVertical: 5}}>
              <FormItem
                key={index + 'login-form' + formItem.key}
                options={{...formItem, dispatchState, cb: setValidStatement}}
              />
            </View>
          ))}
        </View>
        <Button
          mode="outlined"
          loading={isLoading}
          disabled={!['login', 'forgetemail'].includes(validStatement)}
          onPress={() => {
            showForgetModal ? forgetPasswordAPI() : loginWithPassword();
          }}>
          {showForgetModal ? 'Reset password' : 'Sign In'}
        </Button>

        <Button
          mode="text"
          onPress={() => {
            setShowForgetModal(preVal => !preVal);
          }}
          style={{alignItems: 'flex-end', marginVertical: 5}}>
          {showForgetModal ? 'Sign in with password' : 'Forgot password'}
        </Button>

        <Text style={{textAlign: 'center', marginVertical: 15}}>OR</Text>
        {/* Social sign in  */}
        <SocialFooter
          navigation={navigation}
          loginCB={loginCB}
          redirectOptions={{page: 'Register', text: 'Sign Up with Email'}}
        />
      </View>
    </ScrollView>
  );
};

export const Login = LoginComponent;
