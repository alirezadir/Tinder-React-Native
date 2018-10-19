import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import {uploadImages} from '../redux/actions'

import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';

class Profile extends React.Component {
  state = {}

  componentWillMount() {
    this.props.dispatch(uploadImages(this.props.user.images))
  }

  render() {
    return (
      <View>
        <Text>{this.props.user.id}</Text>
        <Text>{this.props.user.name}</Text>
        <Image style={{ width: 75, height: 75}} source={{uri: this.props.user.photoUrl}}/>
        {this.props.user.images.map((uri, key)=>{
          return (
            // <TouchableOpacity onPress={this.login.bind(this)}>
            // <Text>Login</Text>
            // </TouchableOpacity>   

            <TouchableOpacity key={{key}} >
              <Text>Image</Text>
              <Image style={{width: 75, height: 75}} source={{uri: uri}} />
            </TouchableOpacity>
          );
        })}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
      user: state.user
  };
}

export default connect(mapStateToProps)(Profile);