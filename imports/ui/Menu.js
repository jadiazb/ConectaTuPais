import React from 'react';
import { Route,Link } from 'react-router-dom';
import { Session } from 'meteor/session';

import MenuItems from './MenuItems';
// import Profile from './Profile';
import Users from './Users';
import Registros from './Registros';
import Mapa from './Mapa';
import Authenticated from './Authenticated';
import '../js/custom';
// import 'bootstrap/dist/css/bootstrap.css';

export default class Menu extends React.Component{
  constructor(props){
    super(props);
  }
  onLogout(e){
    e.preventDefault();
    Accounts.logout((err)=>{
      if(err){
        console.log(err);
      }
      else{
        this.props.history.push('/');
      }
    });
  }
  componentDidMount(){
  }
  render(){
    return(
      <div className="nav-md" id="DashContent">
        <div className='container body'>
          <div id="main_container">
              <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                  <div className="navbar nav_title" style={{border: '0'}}>
                    <a href="/" className="site_title"><i className="fa fa-connectdevelop"></i> <span>ConectaTuPaís!</span></a>
                  </div>

                  <div className="clearfix"></div>

                  <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                    <div className="menu_section">
                      <h3>General</h3>
                      <ul className="nav side-menu">
                        <MenuItems/>
                      </ul>
                    </div>

                  </div>

                  <div className="sidebar-footer hidden-small">
                    <a data-toggle="tooltip" data-placement="top" title="Settings">
                      <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                    </a>
                    <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                      <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                    </a>
                    <a data-toggle="tooltip" data-placement="top" title="Lock">
                      <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                    </a>
                    <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                      <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="page-wrapper right_col">
                  <div className="container-fluid">
                    <Route path='/principal/mapa' component={Mapa}/>
                    <Authenticated path='/principal/registros' component={Registros}/>
                    <Authenticated path='/principal/usuarios' component={Users}/>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
