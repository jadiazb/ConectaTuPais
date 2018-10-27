import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

export default class UsersList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users:[]
    }
  }
  componentDidMount(){
    this.userslistTracker = Tracker.autorun(()=>{
      let userId = Meteor.userId();
      // setTimeout(()=>{
      //   if(Roles.userIsInRole(userId, 'Administrator')){
      //   }else{
      //     // alert("You don't have access to this page. Please contact with the Administrator.");
      //     this.props.history.push('/principal/mapa');
      //   }
      // },1000);
      Meteor.subscribe('usersList');
      let users = Meteor.users.find({}).fetch();
      if(Roles.userIsInRole( Meteor.userId(), 'Adops')){
        users = Meteor.users.find({'roles.0':{$in:['Adops',null]}}).fetch();
      }else if(Roles.userIsInRole( Meteor.userId(), 'Sales')){
        users = Meteor.users.find({'roles.0':{$in:['Sales',null]}}).fetch();
      }
      this.setState({users});
      // Session.set({link_home:'',link_adops:'',link_profile:'',link_users:'active',link_credentials:'',link_tracking:'',link_campaignForm:'',link_examplesGallery:''});
    });
  }
  componentWillUnmount(){
    this.userslistTracker.stop();
  }
  usersTable(){
    return this.state.users.map((user)=>{
      let username = user.username?user.username:'--';
      let roles;
      let email;
      if(user.roles){
         roles = user.roles[0];
      }else{ roles = ' -- '}
      if(email = user.emails){
        email = user.emails[0]['address'];
      }else{ email = ' -- ';}
      let row = (
        <tr key={user._id}>
            <td><center><img src="https://ejemplos.impaktu.com/sites/default/files/styles/thumbnail/public/pictures/unknown.jpg" alt="user" className="img-circle" style={{width:'40px'}}/></center></td>
            <td><center>{username}</center></td>
            <td><center>{email}</center></td>
            <td><center>{roles}</center></td>
            <td>
              <center>
                <Link ref='lHome' className={'btn btn-primary'} to={{ pathname: `/principal/usuarios/editar_usuario/${user._id}` }}>
                  <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </Link>
              </center>
            </td>
        </tr>
      );
      return row;
    });
  }
  render(){
    return(
      <div className="col-lg-12">
          <div className="card">
              <div className="card-block">
                  <div className="row">
                      <div className="col-xs-1">
                          <span className="round">U</span> <span className="profile-status away pull-right"></span>
                      </div>
                      <div className="col-xs-2" style={{marginLeft:'-4%'}}>
                          <h4 className="card-title">Users List.</h4>
                      </div>
                      {/* <div className="col-md-1" style={{marginLeft:'-150px',top:'5px'}}>
                        <Link className={'btn btn-primary'} to={{ pathname: `/menu/users/edit_user/0` }}>
                          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </Link>
                      </div> */}
                  </div>
                  <div className="table-responsive">
                      <table className="table">
                          <thead>
                              <tr>
                                  <th><center>Photo</center></th>
                                  <th><center>Full Name</center></th>
                                  <th><center>Email</center></th>
                                  <th><center>Rol</center></th>
                                  <th><center>View</center></th>
                              </tr>
                          </thead>
                          <tbody>
                            {this.usersTable()}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
