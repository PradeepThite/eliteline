import React from 'react';
import { Input } from 'component/Input';

const FormItemComponent = (props: any) => {
    const {
      label,
      key,
      dispatchState,
      setIsValid,
      extraOptions = {},
    } = props.options;
    return (
      <Input
        {...extraOptions}
        label={label}
        onChangeText={(value: string) => {
          dispatchState({type: key, value, cb: setIsValid});
        }}
      />
    );
  };

  export const FormItem = FormItemComponent;