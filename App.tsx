import 'react-native-gesture-handler';
import './firebase';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {Routes} from './src/Routes/routes';
import {AuthProvider} from 'Providers/AuthProvider';
import {LoaderProvider} from 'Providers/LoaderProvider';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LoaderProvider>
          <Routes />
        </LoaderProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
