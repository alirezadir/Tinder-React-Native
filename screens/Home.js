import React from 'react';
import styles from '../styles'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'
import Cards from '../components/Cards'
import NoCards from '../components/NoCards'

import { 
  Text, 
  View, 
  Alert, 
  Image
} from 'react-native';




class Home extends React.Component {

  componentWillMount(){
    this.props.dispatch(getCards())
  };

  handleYup (card) {
    firebase.database().ref('cards/' + this.props.user.id + '/swipes').update({ [card.id]: true });
    console.log(`Yup for ${card.name}`)
  }
  handleNope (card) {
    firebase.database().ref('cards/' + this.props.user.id + '/swipes').update({ [card.id]: false });
    console.log(`Nope for ${card.name}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.name}`)
  }
  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={(cardData) => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    cards: state.cards, 
    user: state.user
  };
}

export default connect(mapStateToProps)(Home);
