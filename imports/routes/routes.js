import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Authenticated from './../ui/Authenticated';
import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Menu from './../ui/Menu';
import Home from './../ui/Home';

export default class Routes extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/principal' component={Menu}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
