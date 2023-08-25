import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {isValidValue} from 'utils/CommonUtil';

interface IProAvatar {
  uri: string;
  size?: number;
  style?: object;
}

const ProAvatar = (props: IProAvatar) => {
  const [uri, setUri] = useState<string>(props.uri);
  return (
    <>
      {isValidValue(uri) ? (
        <Avatar.Image
          size={props.size}
          style={[props.style]}
          source={{uri: uri}}
          onError={e => {
            console.log('Proavatar image error');
            setUri('');
          }}
        />
      ) : (
        <Avatar.Image source={require('assets/Default-avatar.jpg')} />
      )}
    </>
  );
};

export default ProAvatar;
