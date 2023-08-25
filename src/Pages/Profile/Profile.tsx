import React, {useContext, useState, useEffect, createRef, useRef} from 'react';
import {
  TouchableOpacity,
  Keyboard,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Text, TextInput} from 'react-native-paper';
import {AuthContext} from 'Providers/AuthProvider';
import {$dark02, $white} from 'utils/globalStyles';
import ProHeader from 'component/ProHeader/ProHeader';
import ProAvatar from 'component/ProAvatar/ProAvatar';
import {LoaderContext} from 'Providers/LoaderProvider';

const ProfileComponent = ({navigation}: any) => {
  let {logout, user, setUser} = useContext(AuthContext);
  const [bio, setBio] = useState('Enter about your self');
  const [userDetails, setUserDetails] = useState<any>(user);
  const [userPost, setUserPost] = useState([]);
  let actionSheetRef = createRef<any>();
  const {isLoading, setLoader} = useContext(LoaderContext);
  const [nameEditMode, setNameEditMode] = useState(false);
  const [bioEditMode, setBioEditMode] = useState(false);
  const [userName, setUserName] = useState('');
  const userNameReferance = useRef<any>(null);
  const bioReferance = useRef<any>(null);
  const containerStyle = {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  };

  console.log('---------- Profile rendered =---------------');
  useFocusEffect(
    React.useCallback(() => {
      console.log(user);
      getPost();
      getUserDetails();
    }, []),
  );

  const getUserDetails = async () => {
    // const response = await getUserDetailsById(user.id);
    // if (response?.data) {
    //   setUserDetails(response.data);
    //   response.data.bio && setBio(response.data.bio);
    // }
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('hidden : ' + userName);
        setNameEditMode(false);
        setBioEditMode(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [userName]);

  useEffect(() => {
    userNameReferance?.current?.focus();
  }, [nameEditMode]);

  useEffect(() => {
    bioReferance?.current?.focus();
  }, [bioEditMode]);

  const toggleBioEditMode = () => {
    setBioEditMode(!bioEditMode);
  };

  const onPress = () => {
    // actionSheetRef.show();
  };
  const openCamera = async () => {
    // try {
    //   const result = await launchCamera({mediaType: 'photo'});
    //   console.log(result);
    //   // uploadProfileToServer(result);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const updateProfile = async (key: string, value: any) => {
    // if (value) {
    //   const serverResponse = await uploadProfile({[key]: value});
    //   setUser(serverResponse);
    // }
  };

  const uploadProfileToServer = async (gallaryPhoto: any) => {
    // try {
    //   if (!gallaryPhoto) {
    //     return;
    //   }
    //   setLoader(true);
    //   const photoURL = await uploadFileAndGetUrl(gallaryPhoto);
    //   const serverResponse = await uploadProfile({photoURL: photoURL});
    //   if (serverResponse) {
    //     setUser(serverResponse);
    //     showToast('Profile updated successfully.', undefined, 'CENTER');
    //   } else if (photoURL) {
    //     showToast('Something went wrong');
    //   }
    // } catch (e) {
    //   console.log(e);
    //   showToast('Something went wrong');
    // } finally {
    //   setLoader(false);
    // }
  };
  const openGallery = async () => {
    // const result = await launchImageLibrary({mediaType: 'photo'});
    // if (result.didCancel) {
    //   return;
    // }
    // let gallaryPhoto = result.assets[0];
    // PhotoEditor.Edit({
    //   path: gallaryPhoto.uri.replace('file://', ''),
    //   onDone: () => {
    //     uploadProfileToServer(gallaryPhoto);
    //   },
    //   onCancel: e => {
    //     console.log(e);
    //   },
    // });
  };

  const getPost = async () => {
    // const response = await getUserPost();
    // if (response?.length) {
    //   setUserPost(response);
    // } else {
    //   setUserPost([]);
    // }
  };

  interface userDetails {
    photoURL: string;
    displayName: string;
  }

  const renderContactHeader = () => {
    let {photoURL, displayName}: userDetails = userDetails;
    console.log('--------- Profile header -------rendered');
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onPress}>
          <ProAvatar uri={photoURL} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNameEditMode(!nameEditMode);
          }}
          style={{marginLeft: 5}}>
          <View style={styles.userNameRow}>
            {nameEditMode ? (
              <TextInput
                value={userName}
                ref={userNameReferance}
                placeholder={'Enter your name'}
                style={{height: 30, marginTop: 10, width: 200}}
                onChangeText={text => {
                  setUserName(text);
                }}
                onBlur={text => {
                  if (userName != text) {
                    updateProfile('displayName', userName);
                  }
                  setNameEditMode(false);
                }}
              />
            ) : (
              <Text style={styles.userNameText}>{displayName}</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBioEditMode} style={styles.userBioRow}>
          <Text style={styles.userBioText}>
            <Text style={{fontWeight: '900'}}> Email : </Text> {user.email}
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>Pune, Maharashtra India.</Text>
          </View> */}
        {/* </View> */}
      </View>
    );
  };

  const postClick = (post: any, index: number) => {
    console.log(post, index);
    navigation.navigate('PostList', {data: userPost});
  };

  return (
    <>
      <ScrollView style={styles.profile_page_container} horizontal={false}>
        <ProHeader
          title={'Profile'}
          backgroundColor={$white}
          endAction={{icon: 'logout', onPress: logout, color: $dark02}}
        />
        <View style={styles.user_profile_container}>
          {renderContactHeader()}
        </View>

        {/* <View style={styles.action_container}>
  
          </View> */}
      </ScrollView>
      {/* <ActionSheet
        ref={o => (actionSheetRef = o)}
        title={'Which one do you like ?'}
        options={['Gallery', 'Cancel']}
        cancelButtonIndex={1}
        destructiveButtonIndex={1}
        onPress={index => {
          if (index == 0) {
            openGallery();
            // openCamera()
          } else if (index == 1) {
          }
          console.log(index);
        }}
      /> */}
      {/* <Modal
        visible={bioEditMode}
        onDismiss={() => {
          console.log('modal closed');
          updateProfile('bio', bio);
          toggleBioEditMode();
        }}
        contentContainerStyle={containerStyle}>
        <Text style={{fontWeight: '900', fontSize: 20}}>Bio</Text>
        <TextInput
          activeOutlineColor={$dark06}
          mode="outlined"
          ref={bioReferance}
          height={120}
          multiline
          numberOfLines={3}
          placeholder="Enter short info about you..."
          onChangeText={text => setBio(text)}
          value={bio}
          style={{
            paddingLeft: 5,
            fontSize: 18,
            borderColor: 'red',
            borderWidth: 0,
          }}
          editable
          maxLength={250}
        />
        <Button
          mode="contained"
          color={$white}
          style={{marginTop: 10, borderColor: $dark04, borderWidth: 2}}
          onPress={() => {
            updateProfile('bio', bio);
          }}>
          SAVE
        </Button>
      </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  profile_page_container: {flex: 1, backgroundColor: $white},
  user_profile_container: {
    flex: 4,
  },
  post_container: {
    marginTop: 5,
    borderTopColor: '#d9d7d2',
    // borderTopWidth: 1,
    flex: 8,
  },
  post_list_container: {
    flex: 1,
    // height: 500
  },
  action_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action_buttons: {
    flex: 1,
    height: 50,
    backgroundColor: $dark02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout_button: {
    flex: 1,
  },
  save_button: {
    flex: 1,
  },

  action_button_text: {
    textAlign: 'center',
    fontSize: 25,
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingRight: 60,
    paddingLeft: 60,
  },
  user_social_status_container: {
    flexDirection: 'row',
    backgroundColor: $dark02,
    borderBottomColor: '#C8C8C8',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  my_post_title: {
    backgroundColor: $dark02,
    padding: 10,
    margin: 10,
    marginTop: 20,
  },
  headerContainer: {
    alignItems: 'center',

    marginTop: 16,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {},
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    // marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 15,
  },
  userBioText: {
    color: $dark02,
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 90,
    marginBottom: 10,
    width: 90,
  },
  userNameRow: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  userNameText: {
    color: $dark02,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomColor: 'grey',
  },
});

export const Profile = ProfileComponent;

// <View style={styles.post_container}>
// <View style={styles.user_social_status_container}>
//   <View style={{flex: 1, marginBottom: 3}}>
//     <Text style={{textAlign: 'center', color: $white}}>Post</Text>
//     <Text
//       style={{textAlign: 'center', color: $white, fontWeight: '700'}}>
//       {userPost?.length}
//     </Text>
//   </View>
//   <View style={{flex: 1}}>
//     <Text style={{textAlign: 'center', color: $white}}>
//       Followers
//       {/* There are following me */}
//     </Text>
//     <Text
//       style={{textAlign: 'center', color: $white, fontWeight: '700'}}>
//       {userDetails?.followers?.length}
//     </Text>
//   </View>
//   <View style={{flex: 1}}>
//     <Text style={{textAlign: 'center', color: $white}}>
//       Follows
//       {/* There are I followes */}
//     </Text>
//     <Text
//       style={{textAlign: 'center', color: $white, fontWeight: '700'}}>
//       {userDetails?.following?.length}
//     </Text>
//   </View>
// </View>

// {/* {userPost.length == 0 ? null : ()} */}
// <View style={styles.my_post_title}>
//   <Text style={{marginLeft: '3%', fontSize: 25, color: $white}}>
//     My Posts
//   </Text>
// </View>
// {userPost.length == 0 ? (
//   <Text
//     style={{
//       color: $white,
//       marginVertical: '20%',
//       textAlign: 'center',
//     }}>
//     No posts
//   </Text>
// ) : (
//   <ScrollView style={styles.post_list_container} horizontal={false}>
//     {userPost.map((i, index) => (
//       <></>
//       // <PostListItem
//       //   index={index}
//       //   onPostClick={postClick}
//       //   deletePostCB={getPost}
//       //   key={i.id}
//       //   data={i}
//       // />
//     ))}
//   </ScrollView>
// )}
// </View>
