import {createStore} from 'redux';

function reducer(oldState = [], action) {
  switch (action.type) {
    case 'ADD_USER':
      const newUser = {
        name: action.name,
        gender: action.gender,
        picture: action.picture,
        id: action.id,
      };
      //      const newState = oldState.concat(newUser);
      const newState = [...oldState, newUser];
      return newState;

    default:
      return oldState;
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
