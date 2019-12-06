import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Footer from './components/Footer.js';
import VisibleTodoList from './containers/VisibleTodoList';
import LoadTodo from './containers/LoadTodo';
import reducers from './reducers';
import './App.css';

const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <LoadTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
