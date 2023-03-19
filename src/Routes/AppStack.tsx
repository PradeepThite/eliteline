import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

const MyComponent = () => (
  <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Routing works
  </Button>
);


const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={MyComponent}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Register"
        component={MyComponent}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
