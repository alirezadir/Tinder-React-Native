import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { login } from '../redux/actions'

import { 
  Text, 
  View, 
  Alert
} from 'react-native';

class Home extends React.Component {
  state = {}

  componentWillMount() {

  }


  render() {
    return (
     <View>
      <Text>Home</Text>
     </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Home);
