import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Home} from 'Pages/Home/Home';
import {$white} from 'utils/globalStyles';
import {Profile} from 'Pages/Profile/Profile';
import {FirebaseFeature} from 'Pages/Firebase/Firebase';
import {InAppBrowserFeature} from 'Pages/InAppBrowser/InAppBrowser';
import {MapFeature} from 'Pages/Map/Map';
import {CameraFeature} from 'Pages/Camera/Camera';
import {StyleSheet, View} from 'react-native';
import OLXSideBar from 'component/SideBar/OLXSideBar';
import {ProductChat} from 'Pages/Chatting/ProductChat';

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
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderWidth: 0,
          borderRadius: 20,
          backgroundColor: '#3C3C3C',
          margin: 5,
          padding: 5,
          paddingBottom: 5,
          height: 60,
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                ...styles.icon_container,
                ...{
                  backgroundColor: focused ? '#087E8B' : '',
                },
              }}>
              <AntDesign
                name="home"
                size={24}
                color={focused ? 'white' : color}
              />
            </View>
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
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                ...styles.icon_container,
                ...{
                  backgroundColor: focused ? '#087E8B' : '',
                },
              }}>
              <AntDesign
                name="search1"
                size={24}
                color={focused ? 'white' : color}
              />
            </View>
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
          tabBarIcon: ({color, focused}) => (
            <View style={{backgroundColor: 'white', borderRadius: 25}}>
              <AntDesign
                name="camera"
                size={30}
                style={{padding: 10}}
                color={focused ? '#087E8B' : color}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                ...styles.icon_container,
                ...{
                  backgroundColor: focused ? '#087E8B' : '',
                },
              }}>
              <AntDesign
                name="bells"
                size={24}
                color={focused ? 'white' : color}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ProductChat}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                ...styles.icon_container,
                ...{
                  backgroundColor: focused ? '#087E8B' : '',
                },
              }}>
              <AntDesign
                name="message1"
                size={24}
                color={focused ? 'white' : color}
              />
            </View>
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
        options={{
          cardStyle: {backgroundColor: 'white'},
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Firebase"
        options={{
          headerShown: true,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="InAppBrowser"
        options={{
          headerShown: true,
        }}
        component={InAppBrowserFeature}
      />
      <Stack.Screen
        name="Map"
        options={{
          headerShown: true,
        }}
        component={MapFeature}
      />
      <Stack.Screen
        name="Camera"
        options={{
          headerShown: true,
        }}
        component={CameraFeature}
      />
      <Stack.Screen
        name="SideBar"
        options={{
          headerShown: false,
          cardStyle: {},
        }}
        component={OLXSideBar}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon_container: {
    padding: 8,
    borderRadius: 20,
  },
});

export default AppStack;
