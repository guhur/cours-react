import {combineReducers} from 'redux';
import {createStore} from 'redux';

const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          id: action.id,
          picture: action.picture,
          name: action.name,
          gender: action.gender,
        },
      ];
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_MEN', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const reducer = combineReducers({
  users,
  visibilityFilter,
});

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
