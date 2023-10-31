import React, {useContext} from 'react';
import {Appbar, Button, Divider, Text} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackActions} from '@react-navigation/native';
import Waves from '../../assets/waves.svg';
import {AuthContext} from 'Providers/AuthProvider';

interface Imenu {
  icon: string;
  name: string;
  description: string;
  click: () => void;
  path: string;
}

const OLXSideBar = ({navigation}: any) => {
  const menus: Imenu[] = [
    {
      icon: 'user',
      name: 'My Account',
      description: 'Edit your details, account settings',
      click: () => {
        navigation?.navigate('Profile');
      },
      path: 'Profile',
    },
    {
      icon: 'shoppingcart',
      name: 'My Orders',
      description: 'View all your orders',
      path: 'Profile',
      click: () => {
        navigation?.navigate('Profile');
      },
    },
    {
      icon: 'bars',
      name: 'My Listings',
      description: 'View your product listing for sale',
      path: 'Profile',
      click: () => {
        navigation?.navigate('Profile');
      },
    },
    {
      icon: 'hearto',
      name: 'Liked items',
      description: 'See the product which you have wishlisted',
      path: 'Profile',
      click: () => {
        navigation?.navigate('Profile');
      },
    },
  ];
  const Item = (m: any) => {
    const {menu} = m;
    return (
      <TouchableOpacity
        onPress={menu.click}
        style={{
          backgroundColor: '#D4E4E6',
          marginVertical: 10,
          marginHorizontal: 25,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
          borderRadius: 20,
          paddingLeft: 20,
        }}>
        <View style={{}}>
          <AntDesign name={menu.icon} size={35} />
        </View>
        <View style={{paddingLeft: 10}}>
          <Text style={{fontSize: 16}}>{menu.name}</Text>
          <Text style={{fontSize: 12}}>{menu.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const AppOptions = () => (
    <View>
      {menus.map((m: Imenu) => (
        <Item key={m.name} menu={m} />
      ))}
    </View>
  );
  let {logout} = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: '900', fontSize: 25}}>OLX</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
          }}>
          <AntDesign name="close" size={40} />
        </TouchableOpacity>
      </View>
      <AppOptions />
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          marginTop: '15%',
        }}>
        <Button style={{width: '40%'}} textColor="#3C3C3C" mode="outlined">
          Feedback
        </Button>
        <Button
          onPress={logout}
          style={{width: '40%'}}
          buttonColor="#3C3C3C"
          textColor="#fff">
          Sign out
        </Button>
      </View>

      <View style={{position: 'absolute', bottom: 0}}>
        <Waves />
      </View>
    </View>
  );
};

export default OLXSideBar;
