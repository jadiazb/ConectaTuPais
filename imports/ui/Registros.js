import React from 'react';
import { Route, Link } from 'react-router-dom';

import Data from './Data';
import DepartamentoForm from './DepartamentosForm';
import MunicipioForm from './MunicipioForm';
import MinisterioForm from './MinisterioForm';
import SistemaDeInformacionForm from './SistemaDeInformacionForm';
import { Alert } from 'react-bootstrap';

export default class Registros extends React.Component{
  componentDidMount(){
    // Session.set({link_home:'',link_adops:'',link_profile:'',link_users:'',link_credentials:'',link_tracking:'active',link_campaignForm:'',link_examplesGallery:''});
  }
  render(){
    return (
      <div>
        <div className="row page-titles">
            <div className="col-md-5 col-8 align-self-center">
                <div className="nav toggle">
                  <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                </div>
                <h3 className="text-themecolor">Registros</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="">Home</a></li>
                  <li className="breadcrumb-item active">Registros</li>
                </ol>
            </div>
            <div className="col-md-7 col-4 align-self-center">
            </div>
        </div>
        <Route path='/principal/registros/data' component={Data}/>
        <Route path='/principal/registros/Departamentos' component={DepartamentoForm}/>
        <Route path='/principal/registros/Municipios' component={MunicipioForm}/>
        <Route path='/principal/registros/Ministerios' component={MinisterioForm}/>
        <Route path='/principal/registros/Sistemas De Informacion' component={SistemaDeInformacionForm}/>
      </div>
    );
  }
}
