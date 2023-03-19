import React, {useContext, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const HomeComponent = ({navigation}: any) => {
  return (
    <ScrollView>
      <Button mode="outlined" onPress={() => false}>
        Home
      </Button>
    </ScrollView>
  );
};

export const Home = HomeComponent;
