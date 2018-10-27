import React from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

import Routes from '../imports/routes/routes';

Meteor.startup(() => {
  // let pos = this.location.pathname.split('/');
  // if(pos[2] == 'profile'){
  //   Session.set({link_home:'',link_adops:'',link_other:'',link_profile:'active',link_users:'',link_credentials:'',link_tracking:'',link_campaignForm:'',link_examplesGallery:''});
  // }
  ReactDOM.render(<Routes/>,document.getElementById('App'));
});
