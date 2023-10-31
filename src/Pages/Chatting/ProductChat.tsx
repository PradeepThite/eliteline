import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';

const ChatComponent = () => (
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const ProductChat = ChatComponent;
