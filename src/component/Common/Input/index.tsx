import React from 'react';
import {TextInput} from 'react-native-paper';
import {TextInput as RNinput, StyleProp, TextStyle, View} from 'react-native';
import {commonStyles} from '../config';

const InputComponent = (props: any) => {
  const style = props.style ? {...props.style, ...commonStyles} : commonStyles;
  return <TextInput {...props} style={style} />;
};
export const Input = InputComponent;

interface IRNInput {
  style: StyleProp<TextStyle>;
  placeholder: string;
}

export const RNInput = (props: IRNInput) => {
  const style = Object.assign(props.style || {}, commonStyles);

  return (
    <View>
      <RNinput {...props} style={style} />
    </View>
  );
};
