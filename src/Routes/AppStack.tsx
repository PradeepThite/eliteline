import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Home} from 'Pages/Home/Home';
import {$dark01, $white} from 'utils/colors';
import {Profile} from 'Pages/Profile/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  console.log('------------- APP Stack Rendered -----------------');

  const TabNavigation = () => (
    <Tab.Navigator
      screenOptions={{tabBarStyle: {backgroundColor: $white}}}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => (
            <AntDesign name="bells" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator initialRouteName="AppStack">
      <Stack.Screen
        name="AppStack"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PostPreview"
        options={{
          headerShown: false,
        }}
        component={PostPreview}
      />
      <Stack.Screen
        name="UserPreview"
        options={{
          headerShown: false,
        }}
        component={UserProfile}
      />
      <Stack.Screen
        name="PostList"
        options={{
          headerShown: false,
        }}
        component={PostList}
      /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
