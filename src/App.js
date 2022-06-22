import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import {Routes} from './navigarion';
import configureStore from './redux-store/store';

const store = configureStore();
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <FlashMessage position="top" />
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
