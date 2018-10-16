import React from 'react';
import RootNavigator from './navigation/RootNavigator.js'
import { 
  Text, 
  View 
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator/>
    );
  }
}