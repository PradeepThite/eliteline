import React from 'react';
import {Appbar, Divider, Text} from 'react-native-paper';
import {$dark02, $dark06, $white} from 'utils/globalStyles';

const ProHeader = ({
  showDivider = true,
  title,
  onPress,
  backgroundColor = '',
  endAction,
}: any) => {
  return (
    <>
      <Appbar.Header style={{backgroundColor: backgroundColor || 'white'}}>
        {onPress && <Appbar.BackAction onPress={onPress} />}
        {title && (
          <Appbar.Content
            title={<Text style={{color: $dark02}}>{title}</Text>}
          />
        )}

        {endAction && endAction.title && (
          <Text style={{color: $dark02}}>{endAction.title}</Text>
        )}
        {endAction && <Appbar.Action {...endAction} />}
      </Appbar.Header>
      {showDivider && <Divider />}
    </>
  );
};

export default ProHeader;
