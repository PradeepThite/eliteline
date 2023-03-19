/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

import { Provider as PaperProvider } from 'react-native-paper';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RoutesComponent = ({}) => {

  const user:any = false;
  
    return (
    <NavigationContainer>
      <PaperProvider>
        {user ? <AppStack /> : <AuthStack />}
      </PaperProvider>
    </NavigationContainer>
  );
};

const mapStateToPRops = (_state:any) => {
  return { };
};

const mapDispachToPRops  = () => {
  return {  
  };
};

export const Routes = connect(mapStateToPRops, mapDispachToPRops)(RoutesComponent);
