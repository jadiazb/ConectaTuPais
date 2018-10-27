import React from 'react';
import { Route, Link } from 'react-router-dom';

import UsersList from './UsersList';
import EditUser from './EditUser';

export default class Users extends React.Component{
  render(){
    return (
      <div>
        <div className="row page-titles">
            <div className="col-md-5 col-8 align-self-center">
                <h3 className="text-themecolor">Users</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Users</li>
                </ol>
            </div>
            <div className="col-md-7 col-4 align-self-center">
            </div>
        </div>
        <div className="row">
          <Route path='/principal/usuarios/list' component={UsersList}/>
          <Route path='/principal/usuarios/editar_usuario/:id' component={EditUser}/>
        </div>
      </div>
    );
  }
}
