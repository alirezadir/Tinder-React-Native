export function login(input){
    return function(dispatch){
      dispatch({ type: 'LOGIN', payload: input });
    }
  }