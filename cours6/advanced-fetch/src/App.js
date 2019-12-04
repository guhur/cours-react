import React from 'react';
import Posts from './views/Posts'
import Todos from './views/Todos'
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Posts />
        <Todos />
      </div>
    );
  }
}

export default App;
