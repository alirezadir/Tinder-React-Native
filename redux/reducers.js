export default reducers = (state = {
    loggedIn: false,
  }, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, loggedIn: action.payload }
      }
    }
    return state;
}