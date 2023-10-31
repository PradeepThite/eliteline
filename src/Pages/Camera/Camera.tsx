import React, {PureComponent, useRef} from 'react';
import {RNCamera, FaceDetector} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';

const CameraComponentclass = () => {
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        {/* <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );

  const takePicture = async () => {
    // if (this.camera) {
    // const options = {quality: 0.5, base64: true};
    // // const data = await this.camera.takePictureAsync(options);
    // console.log(data.uri);
    // }
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const CameraFeature = CameraComponentclass;
