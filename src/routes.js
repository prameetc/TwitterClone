import React from 'react';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import FollowScreen from './screens/follow';
import SignUpScreen from './screens/signup';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen},
    HomeScreen: { screen: HomeScreen },
    ProfileScreen: { screen: ProfileScreen },
    FollowScreen: { screen: FollowScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  {
    initialRouteName: 'LoginScreen', // "Welcome",
    headerMode: 'none',
  }
);

export default AppNavigator;
