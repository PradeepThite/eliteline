import React, {useContext, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';

const HomeComponent = ({navigation}: any) => {
  const {logout, user} = useContext(AuthContext);

  return (
    <ScrollView>
      <Text >
        Home 
      </Text>
      
    </ScrollView>
  );
};

export const Home = HomeComponent;
