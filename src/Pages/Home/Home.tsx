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
import {Avatar, Button, Card, Divider, Text} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {FBApi} from 'Services/fcm';
import {FormItem} from 'component/FormItem';
import {ProText} from 'component/Common/Text/ProText';
import {showAlert} from 'utils/CommonUtil';
import {$heading_font_size} from 'utils/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LeftContent = (props: any) => (
  <Avatar.Image
    style={{backgroundColor: 'inherit'}}
    {...props}
    source={require('assets/firebase_logo_shot.png')}
  />
);

const FEATURES_I_OFFER = [
  {
    id: 1,
    title: 'Firebase',
    icon: LeftContent,
    desc: 'Database, Notification, Authentication and more',
    path: 'Firebase',
  },
  {
    id: 2,
    title: 'Camera',
    icon: () => <AntDesign name="camera" size={24} color='blue' />,
    desc: 'Capture photo, Record video, Upload, Save to phone storage and more',
    path: 'Camera',
  },
  {
    id: 3,
    title: 'GPS',
    icon: () => <AntDesign name="fork" size={24} />,
    desc: 'Get current location, Send current location, calculate distance and more',
    path: 'GPS',
  },
  {
    id: 4,
    title: 'MAP',
    icon: () => <AntDesign name="earth" size={24} />,
    desc: 'Show multiple address with icon and distance, Show shortest path on map and more',
    path: 'MAP',
  },
  {
    id: 5,
    title: 'In App Browser',
    icon: () => <AntDesign name="link" size={24} />,
    desc: 'Third party or your personal link or website to show',
    path: 'InAppBrowser',
  },
];

const HomeComponent = ({navigation}: any) => {
  const {logout, user} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [displayName, setDisplayName] = useState('');

  const addUser1 = async () => {
    try {
      const isUserExist: any = await firestore()
        .collection('users')
        .where('uid', '==', user.uid)
        .get();
      if (isUserExist && isUserExist.docs && isUserExist.docs.length) {
        FBApi.update('users', isUserExist.docs[0].id, {
          phoneNumber: 7276206838,
        });
      } else {
        FBApi.create('users', {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          uid: user.uid,
        }).then((r: any) => {
          console.log('user:add', r);
        });
      }
    } catch (r) {
      console.log(r);
    }
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('users')
      .onSnapshot((res: any) => {
        if (res?._docs[0]?._data?.uid) {
          setUsers(res._docs);
        } else {
          setUsers([]);
        }
      });
    return subscribe;
  }, []);

  const Item = ({title}: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const addUser = () => {
    navigation.navigate('test', {name: 'Jane'});
    // if (displayName) {
    //   FBApi.create('users', {displayName, uid: new Date().valueOf()});
    //   setDisplayName('');
    // }
  };

  const dispatchState = ({type: key, value, cb}: any) => {
    setDisplayName(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 20}}>
        <ProText
          style={{
            marginBottom: 10,
            textAlign: 'center',
            fontSize: $heading_font_size,
          }}>
          Features I offer
        </ProText>
        <Divider />
      </View>
      <ScrollView>
        {FEATURES_I_OFFER.map((feature: any) => {
          return (
            <Card key={feature.id} style={{margin: 10}}>
              <Card.Title
                title={feature.title}
                subtitle=""
                left={feature.icon}
              />
              <Card.Content>
                <Text variant="bodyMedium"> {feature.desc}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="text"
                  onPress={() => {
                    // showAlert('', 'Coming soon...', [{text: 'ok'}]);
                    navigation.navigate(feature.path, {name: 'Jane'});
                  }}>
                  more
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
      {/* <FormItem
        options={{
          label: <ProText>Email</ProText>,
          dispatchState,
          extraOptions: {key: 'username', value: displayName},
        }}
      />
      <Button onPress={addUser}>Add user</Button>

      <FlatList
        data={users}
        renderItem={({item}: any) => (
          <Item key={item._data.uid} title={item?._data?.displayName}></Item>
        )}
        keyExtractor={(item: any) => item._data.uid}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export const Home = HomeComponent;
