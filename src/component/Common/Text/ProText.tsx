import React from 'react';
import {Text} from 'react-native-paper';
import {commonStyles} from '../config';

export const ProText = (props: any) => {
  const style = props.style ? {...commonStyles, ...props.style} : commonStyles;
  return (
    <Text {...props} style={style}>
      {props.children}
    </Text>
  );
};
