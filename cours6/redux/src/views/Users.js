import React from 'react';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = { users: [] }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then( res => res.json() )
    .then( json => this.setState({users: json}) )
  }

  render() {
    return (
      <div className="Users">
        {
          this.state.users.map( post => (
            <div>
              <h1>{ post.title }</h1>
              <div>{ post.body }</div>
            </div>
          ) )
        }
      </div>
    );
  }
}

export default Users;
