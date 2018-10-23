import React from 'react';
import { StyleSheet } from 'react-native';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  color: {
  	color: '#df4723'
  },
  logo: {
    width: 100, 
    height: 55,
    marginTop: 70
  },
  nav: {
    marginTop: 70
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center'
  },
  img: {
  	width: 90,
  	height: 90,
  	borderRadius: 45,
  	margin: 10,
  	backgroundColor: '#fff',
  },
  imgRow: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		padding: 15,
  },
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#fff',
    height: 100
  },
  bold: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
	  borderRadius: 15,
	  borderWidth: 1,
	  borderColor: '#df4723',
	  textAlign: 'center',
	  color: '#df4723',
	  padding: 15,
	  margin: 15,
	  fontSize: 18,
	  fontWeight: 'bold',
  },
  card:{
    width: deviceWidth*0.9,
    height: deviceHeight*0.6
  }, 
  cardDescription: {
    padding: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  cardInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
})

module.exports = styles