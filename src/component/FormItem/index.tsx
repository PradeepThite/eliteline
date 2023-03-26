import React from 'react';
import {Input} from 'component/Common/Input';

const FormItemComponent = (props: any) => {
  const {label, key, dispatchState, cb, extraOptions = {}} = props.options;
  return (
    <Input
      {...extraOptions}
      label={label}
      // selectionColor={'red'}
      onChangeText={(value: string) => {
        dispatchState({type: key, value, cb});
      }}
    />
  );
};

export const FormItem = FormItemComponent;
