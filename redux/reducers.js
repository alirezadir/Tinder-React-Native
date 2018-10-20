export default reducers = (state = {
    loggedIn: false,
    user: {
		  id: '',
		  photoUrl: '',
		  name: '',
		  aboutMe: ' ',
		  chats: ' ',
		  geocode: ' ',
		  images: [],
		  notification: false,
		  show: false,
		  report: false,
		  swipes: [],
		  token: ' ',
    }
  }, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, user: action.user, loggedIn: action.loggedIn }
      }
      case 'LOGOUT': {
        return { ...state, loggedIn: action.loggedIn }
      }
      case 'UPLOAD_IMAGES': {
        return { ...state, user: {...state.user, images: action.payload } }
      }
      case 'UPDATE_ABOUT':      
        return { ...state, user: { ...state.user, aboutMe : action.payload } 
      }
    }
    return state;
} 