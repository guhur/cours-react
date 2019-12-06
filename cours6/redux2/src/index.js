import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore } from 'redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    case 'RM_TODO':
      return state.filter( item => {
        return(item !== action.text);
      });
    default:
      return state
  }
}

const store = createStore(todos, ['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})


function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}


function select(state) {
  return state
}

let currentValue
function handleChange() {
  let previousValue = currentValue
  currentValue = select(store.getState())
  console.log("foo")

  if (previousValue !== currentValue) {
    console.log(
      'Some deep nested property changed from',
      previousValue,
      'to',
      currentValue
    )
  }
}

const unsubscribe = store.subscribe(handleChange)

store.dispatch(addTodo('To remove'))

store.dispatch({
  type: "RM_TODO",
  text: "To remove"
});

store.dispatch(addTodo('Read about the middleware'))

unsubscribe()

store.dispatch(addTodo('Read the docs'))


console.log(store.getState())

// [ 'Use Redux', 'Read the docs' ]
//
//
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
