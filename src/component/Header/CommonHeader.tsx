import React from 'react';
import {Text} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {OLX_TextColor} from 'utils/globalStyles';
import UserAvatar from '../../assets/user_image.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CommonHeader = ({closeIcon, navigation, redirectPath = 'home'}: any) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 100,
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <UserAvatar />
      </View>
      <View>
        <Text style={{color: OLX_TextColor, fontWeight: '900', fontSize: 20}}>
          Hey Alice{' '}
        </Text>
        <Text style={{color: 'red'}}>Welcome back! </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate(redirectPath);
          }}>
          <AntDesign name={closeIcon ? closeIcon : 'menu-fold'} size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonHeader;
