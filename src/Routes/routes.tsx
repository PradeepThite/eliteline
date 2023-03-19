/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {Text, View} from 'react-native';

import {AuthContext} from 'Providers/AuthProvider';
import {getFromStorage} from 'utils/Storage';
import {jwtInterceptor} from 'Services/Interceptor';
import {updateNotificationToken} from 'Services/userService';
import ProLoader from 'component/ProLoader/ProLoader';

const RoutesComponent = ({}) => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  console.log(
    '------------------------ Routes component rendered ---------------------------',
  );

  useEffect(() => {
    async function getUserFromStorage() {
      try {
        let userFromStaorage: any = await getFromStorage('user');
        userFromStaorage = JSON.parse(userFromStaorage);
        // console.log('userFromStaorage' + JSON.stringify(userFromStaorage))
        if (userFromStaorage && Object.keys(userFromStaorage).length) {
          setUser(userFromStaorage);
          jwtInterceptor();
          updateNotificationToken(userFromStaorage);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(()=>{
          setInitializing(false);
        },1000)
      }
    }
    console.log(
      '------------------------ Routes component mounted ---------------------------',
    );
    getUserFromStorage();
  }, [setUser]);

  if (initializing) {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ProLoader visible={true} text={'Starting app...'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <PaperProvider>{user ? <AppStack /> : <AuthStack />}</PaperProvider>
    </NavigationContainer>
  );
};

const mapStateToPRops = (_state: any) => {
  return {};
};

const mapDispachToPRops = () => {
  return {};
};

export const Routes = connect(
  mapStateToPRops,
  mapDispachToPRops,
)(RoutesComponent);
