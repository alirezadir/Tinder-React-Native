import * as firebase from 'firebase';
import aws from '../config/aws';
import { ImagePicker, Permissions, Location, Notifications} from 'expo';
import { RNS3 } from 'react-native-aws3';
import React from 'react';
import { Alert } from 'react-native';
import Geohash from 'latlon-geohash';


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
              dispatch(allowNotifications())
            } else {
              firebase.database().ref('cards/' + user.uid ).update(params);
              dispatch({ type: 'LOGIN', user: params, loggedIn: true });
            }
          })
    }
  }

  export function logout(){
	return function(dispatch){
    firebase.auth().signOut()
    dispatch({ type: 'LOGOUT', loggedIn: false });
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

export function deleteImage(images, key){
	return function(dispatch){
    Alert.alert(
      'Are you sure you want to Delete',
      '',
      [
        {text: 'Ok', onPress: () => {
          var array = images
          array.splice(key, 1)
    			dispatch({ type: 'UPLOAD_IMAGES', payload: array });
          firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
      { cancelable: true }
    )
	}
}

export function updateAbout(value){
	return function(dispatch){
		dispatch({ type: 'UPDATE_ABOUT', payload: value });
    setTimeout(function(){  
			firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({ aboutMe: value });
    }, 3000);
  }
}


export function getCards(geocode){
    return function(dispatch){
        firebase.database().ref('cards').orderByChild("geocode").equalTo(geocode).once('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
              item = child.val();
              item.id = child.key;
              items.push(item); 
            });
            dispatch({ type: 'GET_CARDS', payload: items });
          });
    }
}

export function sendNotification(id, name, text){
    return function(dispatch){
      firebase.database().ref('cards/' + id).once('value', (snap) => {
        if(snap.val().token != null){
  
          return fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: snap.val().token,
              title: name,
              body: text,
              //badge: 1,
            }),
          });
  
        }
      });
    }
  }



  export function getLocation(){
	return function(dispatch){
		Permissions.askAsync(Permissions.LOCATION).then(function(result){
		  if(result){
		    Location.getCurrentPositionAsync({}).then(function(location){
		      var geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 4)
		      firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({geocode: geocode});
		      dispatch({ type: 'GET_LOCATION', payload: geocode });
		    })
		  }
		})
	}
}

// #   km      
// 1   ±2500
// 2   ±630
// 3   ±78
// 4   ±20
// 5   ±2.4
// 6   ±0.61
// 7   ±0.076
// 8   ±0.019
// 9   ±0.0024
// 10  ±0.00060
// 11  ±0.000074

export function allowNotifications(){
    return function (dispatch){
        Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result){
            if (result.status === 'granted') {
              Notifications.getExpoPushTokenAsync().then(function(token){
                firebase.database().ref('cards/' + firebase.auth().currentUser.uid ).update({ token: token });
                dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
              })
            }
          })
    }
}