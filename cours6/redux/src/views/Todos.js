import React from 'react';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => this.setState({todos: json.slice(0, 5)}));
  }

  render() {
    return (
      <div className="Todos">
        {this.state.todos.map((post, index) => (
          <div key={ index }>
            <h1
              style={{
                textDecoration: post.completed ? 'line-through' : 'none',
              }}>
              {post.title}
            </h1>
          </div>
        ))}
      </div>
    );
  }
}

export default Todos;
