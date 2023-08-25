import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Home} from 'Pages/Home/Home';
import {$dark01, $white} from 'utils/globalStyles';
import {Profile} from 'Pages/Profile/Profile';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {FirebaseFeature} from 'Pages/Firebase/Firebase';
import {InAppBrowserFeature} from 'Pages/InAppBrowser/InAppBrowser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

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
          ...MyTransition,
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
          ...MyTransition,
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
      <Stack.Screen
        name="Firebase"
        options={{
          headerShown: true,
        }}
        component={FirebaseFeature}
      />
      <Stack.Screen
        name="InAppBrowser"
        options={{
          headerShown: true,
        }}
        component={InAppBrowserFeature}
      />
      {/*
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
