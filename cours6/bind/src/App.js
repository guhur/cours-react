import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {toggle1: false, toggle: false};
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle1() {
    this.setState(previousState => ({
      toggle1: !previousState.toggle1
    }));
  }

  toggle2() {
    this.setState(previousState => ({
      toggle2: !previousState.toggle2
    }));
  }

  render() {
   return (
      <div className="App">
        <button type="button" onClick={this.toggle1}>Toggle 1</button>
        {
          this.state.toggle1 ? <h1>Ici !</h1> : ""
        }
          <hr />
          <button type="button" onClick={() => {this.toggle2()}}>Toggle 2</button>
        {
          this.state.toggle2 ? <h1>Ici !</h1> : ""
        }

      </div>
    );
  }

}

export default App;
