import React, {useContext} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';

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
        Google
      </Button>
      <Button
        icon="email"
        mode="outlined"
        onPress={() => navigation.navigate(redirectOptions.page)}>
        {redirectOptions.text}
      </Button>
    </View>
  );
};
