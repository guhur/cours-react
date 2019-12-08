import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';

let lastId = 0;

function reducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      const todo = {
        completed: false,
        id: lastId++,
        text: action.text
      }
      return state.concat(todo);
    case 'SET_COMPLETED':
      state.map( todo => {
        if (todo.id === action.id) {
          todo.completed = true;
        }
      } );
      return state;
    default:
      return state;
  }
}

const store = createStore(reducer);

console.log("Initial", store.getState());

store.dispatch({
  type: 'ADD_TODO',
  text: "Premier TODO"
});

console.log("Après le dispatch", store.getState());

function addTodo(text) {
  store.dispatch({
    type: 'ADD_TODO',
    text
    // text: text
  });
}

addTodo("Second TODO");
console.log("Après addTodo", store.getState());

function setCompleted(id) {
  store.dispatch({
    type: 'SET_COMPLETED',
    id
  });
}

setCompleted(1);
console.log("Après setCompleted", store.getState());

function handleChange() {
  const todos = store.getState();
  const ids = todos.map( todo => todo.id );
  console.log(ids);
}
const unsubscribe = store.subscribe(handleChange);


addTodo("Troisieme TODO");

unsubscribe();
addTodo("Quatrieme TODO");



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
