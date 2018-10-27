import {Tracker} from 'meteor/tracker';
import { Roles } from 'meteor/alanning:roles';
import { Route,Link } from 'react-router-dom';
import React from 'react';


export default class MenuItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menuItems:[]
    }
  }
  componentDidMount(){
    this.menuItemsTracker = Tracker.autorun(()=>{
      let menu = [];
      let userId = Meteor.userId();
      menu.push(this.menuOptions(0));
      if(Roles.userIsInRole(userId, 'Administrator')){
        menu.push(this.menuOptions(1));
        // menu.push(this.menuOptions(2));
      }
      // menu.push(this.menuOptions(3));
      this.setState({menuItems:menu});
    });
  }
  menuOptions(op){
    let menu;
    switch (op) {
      case 0:
       menu = (
        <li key='0' className=''>
          <Link className={''} to={{ pathname: '/principal/mapa' }} >
            <i className="fa fa-map"></i>
            Mapa
          </Link>
        </li>
      );
        break;
      case 1:
        menu  = (
          <li key='1' className=''>
            <Link className={''} to={{ pathname: '/principal/registros/data' }} >
              <i className="fa fa-plus"></i>
              Registros
            </Link>
          </li>
         );
        break;
      case 2:
        break;
      case 3:
        break;
    }
    return menu;
  }
  render(){
    return this.state.menuItems;
  }
}
