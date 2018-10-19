import * as firebase from 'firebase';
import aws from '../config/aws';
import { ImagePicker, Permissions} from 'expo';
import { RNS3 } from 'react-native-aws3';
import React from 'react';

import { 
    Button
  } from 'react-native';

export function login(user){
    return function(dispatch){
        let params = {
            id: user.uid,
            photoUrl: user.photoURL,
            name: user.displayName,
            aboutMe: ' ',
            chats: ' ',
            geocode: ' ',
            images: [user.photoURL],
            notification: false,
            show: false,
            report: false,
            swipes: {
              [user.uid]: false
            },
            token: ' ',
          }
          
          firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
            if(snapshot.val() !== null){
              dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
            } else {
              firebase.database().ref('cards/' + user.uid ).update(params);
              dispatch({ type: 'LOGIN', user: params, loggedIn: true });
            }
          })
    }
  }


askPermissionsAsync = async () => {
	await Permissions.askAsync(Permissions.CAMERA);
	await Permissions.askAsync(Permissions.CAMERA_ROLL);
};


export function uploadImages(images){
	return async function(dispatch){
        await this.askPermissionsAsync();
		await ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(function(result){

		  var array = images
		  if(result.uri != undefined){
		    const file = {
		      uri: result.uri,
		      name: result.uri,
		      type: "image/png"
		    }

		    const options = {
		      keyPrefix: "uploads/",
		      bucket: "test-tinder",
		      region: "us-west-2",
		      accessKey: aws.accessKey,
		      secretKey: aws.secretKey,
		      successActionStatus: 201
		    }

		    RNS3.put(file, options).then(function(response){
		      if (response.status === 201){
		        array.push(response.body.postResponse.location)
		        firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
		        dispatch({ type: 'UPLOAD_IMAGES', payload: array });
		      }
		    })
		  }

		})
	}
}