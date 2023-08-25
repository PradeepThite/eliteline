import React from 'react';
import {WebView} from 'react-native-webview';

const InAppBrowserComponent = () => (
  <WebView source={{uri: 'https://pradeeptech.in'}} />
);

export const InAppBrowserFeature = InAppBrowserComponent;
