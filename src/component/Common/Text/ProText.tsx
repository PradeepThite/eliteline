import React from 'react';
import {Text} from 'react-native-paper';
import { commonStyles } from '../config';


export const ProText = (props: any) => {
  const style = props.style ? {...props.style, ...commonStyles} : commonStyles;
  return (
    <Text {...props} style={style}>
      {props.children}
    </Text>
  );
};
