import React from 'react';
import {Switch, Route} from 'react-router-dom';
import User from './components/User';
import AllUsers from './components/AllUsers';
import Search from './components/Search';
import {connect} from 'react-redux';
import { addUser, fetchUsers } from './actions';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    fetchUsers(json => {
      json.results.forEach(user =>{
        this.props.addUser({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large,
          gender: user.gender
        });}
      );
    });
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p>Cours React 7</p>
          </header>
          <Switch>
            <Route path="/user/:id">
              <User />
            </Route>
            <Route exact path="/">
              <Search />
              <AllUsers />
            </Route>
          </Switch>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: id => dispatch(addUser(id)),
});

export default connect(null, mapDispatchToProps)(App);
