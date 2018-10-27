import React from 'react';
import {Tracker} from 'meteor/tracker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {Ministerios} from '../api/Ministerios';

export default class SistemaDeInformacionForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stayOpen: false,
      disabled: false,
      Nombre:'',
      Siglas:'',
      Objetivo:'',
      Servicios:'',
      Url:'',
      Resolucion:'',
      UrlResolucion:'',
      IDMinisterio:'',
      SelectOp:[],
    }
  }
  getFiltersArray(mg){
    let MagArray=[];
    let cont=0;
    if(mg){
      mg.map((data)=> {
        MagArray[cont] = {value:data._id,label:data.nombre,selected:false};
        cont++;
      });
    }
    return MagArray;
  }
  componentDidMount(){
    this.MuniTracker = Tracker.autorun(()=>{
      let MiniSub = Meteor.subscribe('MiniPublish');
      if(MiniSub.ready()){
        let MiniInfo = Ministerios.find({}).fetch();
        let MiniOp = this.getFiltersArray(MiniInfo);
        this.setState({SelectOp:MiniOp});
      }
    })
  }
  onNombreChange(e){
    this.setState({Nombre:e.target.value});
  }
  onSiglasChange(e){
    this.setState({Siglas:e.target.value});
  }
  onObjetivoChange(e){
    this.setState({Objetivo:e.target.value});
  }
  onServiciosChange(e){
    this.setState({Servicios:e.target.value});
  }
  onUrlChange(e){
    this.setState({Url:e.target.value});
  }
  onResolucionChange(e){
    this.setState({Resolucion:e.target.value});
  }
  onUrlResolucionChange(e){
    this.setState({UrlResolucion:e.target.value});
  }
  onOpMiniChange(value){
    this.setState({IDMinisterio:value});
  }
  onSave(e){
    e.preventDefault();
    Meteor.call('sistema.insert',this.state.Nombre,this.state.Siglas,this.state.Objetivo,this.state.Servicios,this.state.Url,this.state.Resolucion,this.state.UrlResolucion,this.state.IDMinisterio);
    this.setState({Nombre:'',Siglas:'',Objetivo:'',Servicios:'',Url:'',Resolucion:'',UrlResolucion:'',IDMinisterio:''});
    alert("Guardado!!!");
    //this.props.history.push('/principal/registros/data');
  }
  render(){
    return (
      <div className='card'>
        <div className='card-block input_space_static'>
          <form className='form-horizontal form-material'>
            <div className="form-group">
                <label className="col-md-12">Nombre</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Nombre} onChange={this.onNombreChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Siglas</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Siglas} onChange={this.onSiglasChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Objetivo</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Objetivo} onChange={this.onObjetivoChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Servicios</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Servicios} onChange={this.onServiciosChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Url</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Url} onChange={this.onUrlChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Resolucion</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Resolucion} onChange={this.onResolucionChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Url Resolucion</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.UrlResolucion} onChange={this.onUrlResolucionChange.bind(this)}/>
                </div>
            </div>
            <div className="row" style={{marginBottom:'25px'}}>
                <label className="col-md-12">Ministerio</label>
                <div className="col-md-6">
                  <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.SelectOp} onChange={this.onOpMiniChange.bind(this)} simpleValue value={this.state.IDMinisterio}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <button className="btn btn-info" onClick={this.onSave.bind(this)}>Guardar</button>
                </div>
            </div>
            <br/>
          </form>
        </div>
      </div>
    );
  }
}
