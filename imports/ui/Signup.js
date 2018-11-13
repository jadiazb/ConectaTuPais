import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }
  onSignup(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason});
        console.log('Error Signup: ',err.reason);
      }
      else{
        this.setState({error: ''});
        this.props.history.push('/principal/mapa');
      }
    });
  }
  render(){
    if(!!Meteor.userId()){
      return <Redirect to="/principal/mapa" />
    }
    else{
      return (
        <div className='login-page'>
          <form id='loginForm' onSubmit={this.onSignup.bind(this)}>
            <div className='login-box'>
              <div className='login-logo'>
                <a href="/"><img src="https://ejemplos.impaktu.com/sites/default/file/conectatupaisLogo.png" width="220"/></a>
              </div>
              <div className='login-parent'>
                <div className='login-form'>
                  <p className="login-box-msg">Nueva Cuenta</p>
                  <div className='form-group has-feedback'>
                    <input type='email' className='form-control' ref='email' name='email' placeholder='Email:' required/>
                  </div>
                  { this.state.error ? <p>{this.state.error}</p> : undefined }
                  <div className='form-group has-feedback'>
                    <input type='password' className='form-control' ref='password' name='password' placeholder='Contraseña:' required/>
                  </div>
                  <div>
                    <Link to="/">Ya tienes una cuenta?</Link>
                  </div>
                  <div className='row'>
                    <input type='submit' className='btn btn-info' name='btn_submit' value='Sign In'/>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

}
