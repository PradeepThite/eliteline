import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Login } from '../Pages/Login/Login';
import { CounterComponent } from 'component/Counter/Counter';
import { Register } from 'Pages/Register/Register';


const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
