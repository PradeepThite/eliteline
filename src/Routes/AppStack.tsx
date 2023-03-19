import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from 'Pages/Home/Home';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
