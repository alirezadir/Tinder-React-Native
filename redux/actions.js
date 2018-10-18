import * as firebase from 'firebase';
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
        //   firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
        //     if(snapshot.val() !== null){
        //       dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
        //     } else {
        //       firebase.database().ref('cards/' + user.uid ).update(params);
        //       dispatch({ type: 'LOGIN', user: params, loggedIn: true });
        //     }
        //   })
    }
  }


//   import * as firebase from 'firebase';

// export function login(user){
//   return function(dispatch){
// 		let params = {
// 		  id: user.uid,
// 		  photoUrl: user.photoURL,
// 		  name: user.displayName,
// 		  aboutMe: ' ',
// 		  chats: ' ',
// 		  geocode: ' ',
// 		  images: [user.photoURL],
// 		  notification: false,
// 		  show: false,
// 		  report: false,
// 		  swipes: {
// 		    [user.uid]: false
// 		  },
// 		  token: ' ',
// 		}

		// firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
		//   if(snapshot.val() !== null){
		//     dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
		//   } else {
		//     firebase.database().ref('cards/' + user.uid ).update(params);
		//     dispatch({ type: 'LOGIN', user: params, loggedIn: true });
		//   }
		// })
//   }
// }