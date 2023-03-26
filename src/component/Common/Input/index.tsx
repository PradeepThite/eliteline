import React from 'react';
import {TextInput} from 'react-native-paper';
import {commonStyles} from '../config';

const InputComponent = (props: any) => {
  const style = props.style ? {...props.style, ...commonStyles} : commonStyles;

  return <TextInput {...props} style={style} />;
};
export const Input = InputComponent;
