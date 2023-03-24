import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';

const ProAvatar = (props: any) => {
  const [uri, setUri] = useState<any>({uri: props.uri});
  return (
    <>
      {uri ? (
        <Avatar.Image
          size={props.size}
          style={[props.style]}
          source={{uri: props.uri}}
          onError={e => {
            console.log('Proavatar image error');
            setUri(false);
          }}
        />
      ) : (
        <Avatar.Image
          size={props.size}
          source={require('assets/Default-avatar.jpg')}
        />
      )}
    </>
  );
};

export default ProAvatar;
