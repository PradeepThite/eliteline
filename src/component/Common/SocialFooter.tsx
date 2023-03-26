import React, {useContext} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import {ProText} from './Text/ProText';

export const SocialFooter = ({
  navigation,
  loginCB,
  redirectOptions = {page: 'Login', text: ''},
}: any) => {
  const {googleLogin} = useContext(AuthContext);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <Button
        icon="google"
        mode="outlined"
        onPress={() => {
          googleLogin({loginCB});
        }}>
        <ProText>Google</ProText>
      </Button>
      <Button
        icon="email"
        mode="outlined"
        onPress={() => navigation.navigate(redirectOptions.page)}>
        <ProText>{redirectOptions.text}</ProText>
      </Button>
    </View>
  );
};
