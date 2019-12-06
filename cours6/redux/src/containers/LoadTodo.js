import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions';

class LoadTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => {
        json.slice(0, 5).forEach(todo => {
          this.props.dispatch(addTodo(todo.title));
        });
        this.setState({loaded: true});
      });
  }

  render() {
    if (this.state.loaded) {
      return <div>Loaded</div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default connect()(LoadTodo);
