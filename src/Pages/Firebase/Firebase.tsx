import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {List} from 'react-native-paper';

const FirebaseComponent = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <List.Section title="Features">
        <List.Accordion
          title="Data Base"
          left={props => <List.Icon {...props} icon="folder" />}>
          <Text>
            Collections of data base where you can create/update/delete tables
            and its records
          </Text>
        </List.Accordion>

        <List.Accordion
          title="Notifications"
          left={props => <List.Icon {...props} icon="folder" />}>
          <Text>On user actions you can notify the user with firebase Notifications</Text>
        </List.Accordion>
        <List.Accordion
          title="Authentications"
          left={props => <List.Icon {...props} icon="folder" />}>
          <Text>You can login with google credentails on single click</Text>
        </List.Accordion>
      </List.Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export const FirebaseFeature = FirebaseComponent;
