import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './login';
import HomeScreen from './home';
import NavigationService from '../services/NavigationService';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    HomeScreen: { screen: HomeScreen }
  },
  {
    initialRouteName: 'LoginScreen', // "Welcome",
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default AppNavigator;
