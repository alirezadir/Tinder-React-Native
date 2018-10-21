import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator.js';
import Chat from '../screens/Chat.js';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: TabNavigator,
    },
    Chat: {
      screen: Chat,
    }
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator/>;
  }
}