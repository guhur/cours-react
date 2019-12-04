import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Accueil from '../views/Accueil';
import About from '../views/About';
import Product from '../views/Product';


class Router extends React.Component {

  render () {
    return (
      <Switch>
        <Route exact path='/' component={ Accueil } />
        <Route path='/about' component={ About } />
        <Route exact path='/product' component={ Product } />
      </Switch>
    );
  };


};


export default Router;
