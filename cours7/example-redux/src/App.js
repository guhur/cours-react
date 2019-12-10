import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AllUsers from './components/AllUsers';
import User from './components/User';
import {addUser} from './actions';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=50")
    .then(res => res.json())
    .then(json => {
      const users = json.results;
      users.forEach( user => {
        this.props.addUserFromAPI({
           //name: `${user.name.first} ${user.name.last}`,
           name: user.name.first + " " + user.name.last,
           picture: user.picture.large,
           gender: user.gender
        })
      } )
    } );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Learn Redux</header>
        <Switch>
          <Route exact path="/">
            <AllUsers />
          </Route>

          <Route path="/user/:id">
            <User />
          </Route>
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const props = {
    addUserFromAPI: user => dispatch(addUser(user)),
  };
  return props;
  // this.props.addUserFromAPI
}

export default connect(null, mapDispatchToProps)(App);
