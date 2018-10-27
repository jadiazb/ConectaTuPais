import React from 'react';
import {Tracker} from 'meteor/tracker';
import { Route,Link } from 'react-router-dom';

import Select from 'react-select';
import DataList from './DataList';
import {Departamentos} from '../api/Departamentos';
import {Municipios} from '../api/Municipios';
import {Ministerios} from '../api/Ministerios';
import {SistemasDeInformacion} from '../api/SistemasDeInformacion';
import 'react-select/dist/react-select.css';

export default class Data extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stayOpen: false,
      disabled: false,
      OpFil:'Departamentos',
      DepaOp:[],
      MunOp:[],
      MinOp:[],
      SisOp:[]
    }
  }
  componentDidMount(){
    this.dataTracker = Tracker.autorun(()=>{
      Meteor.subscribe('DepaPublish');
      Meteor.subscribe('MuniPublish');
      Meteor.subscribe('MiniPublish');
      Meteor.subscribe('SisInPublish');
      let DepaOp = Departamentos.find({}).fetch();
      let MunOp = Municipios.find({}).fetch();
      let MinOp = Ministerios.find({}).fetch();
      let SisOp = SistemasDeInformacion.find({}).fetch();
      this.setState({DepaOp});
      this.setState({MunOp});
      this.setState({MinOp});
      this.setState({SisOp});
    });
  }
  onOpFilChange(value){
    this.setState({OpFil:value});
  }
  renderDataItems(){
    let Op=[];
    let num = 0;
    if(this.state.OpFil == 'Departamentos'){
      Op = this.state.DepaOp;
      num = 0;
    }else if(this.state.OpFil == 'Municipios'){
      Op = this.state.MunOp;
      num = 1;
    }
    else if(this.state.OpFil == 'Ministerios'){
      Op = this.state.MinOp;
      num = 2;
    }
    else if(this.state.OpFil == 'Sistemas de Informacion'){
      Op = this.state.SisOp;
      num = 3;
    }
    return Op.map((data)=>{
      let row;
      switch (num) {
        case 0:
          row =(
            <tr key={data._id}>
              <td><center>{data.codigo_dane}</center></td>
              <td><center>{data.nombre}</center></td>
              <td><center>{data.longitud}</center></td>
              <td><center>{data.latitud}</center></td>
            </tr>
          );
          break;
        case 1:
          let depaNombre = '';
          this.state.DepaOp.map((depa)=>{
            if(depa._id == data.departamentoId){
              depaNombre = depa.nombre;
            }
          });
          row =(
            <tr key={data._id}>
              <td><center>{data.codigo_dane}</center></td>
              <td><center>{data.nombre}</center></td>
              <td><center>{data.longitud}</center></td>
              <td><center>{data.latitud}</center></td>
              <td><center>{depaNombre}</center></td>
            </tr>
          );
          break;
          case 2:
            row =(
              <tr key={data._id}>
                <td><center>{data.nombre}</center></td>
                <td><center>{data.url}</center></td>
                {/* <td><center>{data.funcion}</center></td> */}
              </tr>
            );
            break;
          case 3:
            let MiniNombre = '';
            this.state.MinOp.map((min)=>{
              if(min._id == data.ministerioId){
                MiniNombre = min.nombre;
              }
            });
            row =(
              <tr key={data._id}>
                <td><center>{data.nombre}</center></td>
                <td><center>{data.siglas}</center></td>
                <td><center>{data.url}</center></td>
                <td><center>{MiniNombre}</center></td>
              </tr>
            );
            break;
          default:
            row = (<tr></tr>);
      }
      return row;
    });
  }
  render(){
    let options = [
      {value:'Departamentos',label:'Departamentos',selected:false},
      {value:'Municipios',label:'Municipios',selected:false},
      {value:'Ministerios',label:'Ministerios',selected:false},
      {value:'Sistemas de Informacion',label:'Sistemas de Informacion',selected:false},
    ]
    let tHead = [];
    if(this.state.OpFil == 'Departamentos'){
      tHead[0] = (<th><center>Codigo Dane</center></th>);
      tHead[1] = (<th><center>Nombre</center></th>);
      tHead[2] = (<th><center>Longitud</center></th>);
      tHead[3] = (<th><center>Latitud</center></th>);
      tHead[4] = [];
    }else if(this.state.OpFil == 'Municipios'){
      tHead[0] = (<th><center>Codigo Dane</center></th>);
      tHead[1] = (<th><center>Nombre</center></th>);
      tHead[2] = (<th><center>Longitud</center></th>);
      tHead[3] = (<th><center>Latitud</center></th>);
      tHead[4] = (<th><center>Departamento</center></th>);
    }else if(this.state.OpFil == 'Ministerios'){
      tHead[0] = (<th><center>Nombre</center></th>);
      tHead[1] = (<th><center>url</center></th>);
      tHead[2] = [];
      tHead[3] = [];
      tHead[4] = [];
    }else if(this.state.OpFil == 'Sistemas de Informacion'){
      tHead[0] = (<th><center>Nombre</center></th>);
      tHead[1] = (<th><center>Siglas</center></th>);
      tHead[2] = (<th><center>Url</center></th>);
      tHead[3] = (<th><center>Ministerio</center></th>);
      tHead[4] = [];
    }
    return(
      <div>
        <div className="row">
            <div className="col-lg-12">
            <div className="card">
              <div className='row'>
                <div className="col-lg-3 input_space">
                  <div className="row row-without-margin">
                    <label className="">Registros</label>
                  </div>
                  <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={options} onChange={this.onOpFilChange.bind(this)} simpleValue value={this.state.OpFil}/>
                </div>
                <div className="col-lg-3 input_space">
                  {/* <div className="row row-without-margin">
                    <label className="">Department</label>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 input_submit input_space">
                  <input type="text" className="form-control filter-search" placeholder="Search"/>
                </div>
                <div className="col-md-1 input_submit input_space">
                  <input type="submit" className="btn btn-info filter-btn" name="btn_submit" value="Search"/>
                </div>
              </div>
            </div>
            {/* <DataList option={this.state.OpFil}/> */}
            <div className="card">
                <div className="card-block">
                    <div className="row">
                        <div className="col-md-1">
                            <span className="round">A</span> <span className="profile-status away pull-right"></span>
                        </div>
                        <div className="col-md-2" style={{marginLeft:'-4.5%'}}>
                            <h4 className="card-title">{this.state.OpFil}</h4>
                        </div>
                        <div className="col-md-1" style={{marginLeft:'-3%',top:'5px'}}>
                            <Link className={'btn btn-primary'} to={{ pathname: '/principal/registros/'+this.state.OpFil }} >
                              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            </Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              {tHead[0]}
                              {tHead[1]}
                              {tHead[2]}
                              {tHead[3]}
                              {tHead[4]}
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderDataItems()}
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    );
  }
}
