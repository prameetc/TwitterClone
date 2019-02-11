import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator, Platform } from 'react-native';
import { Root, StyleProvider } from 'native-base';
import { PersistGate } from 'redux-persist/es/integration/react';
import getTheme from '../native-base-theme/components';
import defaultTheme from './defaultTheme';
import Routes from './routes';
import reducer from './reducers';

function oncomplete() { }

const { persistor, store } = reducer(oncomplete(store));

export default class App extends Component {

  render() {
    return (
      <StyleProvider style={getTheme(defaultTheme)}>
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <Root>
              <Routes />
            </Root>
          </PersistGate>
        </Provider>
      </StyleProvider>
    );
  }
}
