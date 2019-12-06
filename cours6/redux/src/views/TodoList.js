import React from 'react'
import Todo from '../components/Todo'

class TodoList extends React.Component {
  static defaultProps = {todos: []};

  render () {
    return (
  <ul>
    {this.props.todos.map(todo => (
      <Todo key={todo.id} completed={todo.completed} title={todo.title} onClick={() => this.props.toggleTodo(todo.id)} />
    ))}
  </ul>
    )

  }
}

export default TodoList;
