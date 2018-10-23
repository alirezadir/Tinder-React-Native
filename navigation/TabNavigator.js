import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import styles from '../styles'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { TabNavigator } from 'react-navigation';

export default TabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons style={ styles.nav } color={'#df4723'} name={focused ? 'ios-person' : 'ios-person-outline'} size={40}/>
        ),
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Image style={ styles.logo } source={require('../assets/tinder-logo.png')}/>
        ),
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons style={ styles.nav } color={'#df4723'} name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} size={40}/>
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarPosition: 'top',
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        height: 75
      },
    }
  }
);