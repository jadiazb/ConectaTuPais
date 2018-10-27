import React from 'react';
import {Tracker} from 'meteor/tracker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {Municipios} from '../api/Municipios';

export default class MinisterioForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stayOpen: false,
      disabled: false,
      Nombre:'',
      Funcion:'',
      Mision:'',
      Vision:'',
      Url:'',
      NumSucursaler:'1',
      Longitudes:[],
      Latitudes:[],
      Direcciones:[],
      IDMunicipios:[],
      SelectOp:[],
      selected:'',
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
    this.MiniTracker = Tracker.autorun(()=>{
      let MuniSub = Meteor.subscribe('MuniPublish');
      if(MuniSub.ready()){
        let MuniInfo = Municipios.find({}).fetch();
        let MuniOp = this.getFiltersArray(MuniInfo);
        this.setState({SelectOp:MuniOp});
      }
    })
  }
  onNombreChange(e){
    this.setState({Nombre:e.target.value});
  }
  onFuncionChange(e){
    this.setState({Funcion:e.target.value});
  }
  onMisionChange(e){
    this.setState({Mision:e.target.value});
  }
  onVisionChange(e){
    this.setState({Vision:e.target.value});
  }
  onUrlChange(e){
    this.setState({Url:e.target.value});
  }
  onLogitudChange(op,e){
    let Longitudes = this.state.Longitudes;
    Longitudes[op] = e.target.value;
    this.setState({Longitudes});
  }
  onLatitudChange(op,e){
    let Latitudes = this.state.Latitudes;
    Latitudes[op] = e.target.value;
    this.setState({Latitudes});
  }
  onOpMuniChange(op,value){
    let Municipios = this.state.IDMunicipios;
    Municipios[op] = value;
    this.setState({IDMunicipios:Municipios});
  }
  onDireccionChange(op,e){
    let Direcciones = this.state.Direcciones;
    Direcciones[op] = e.target.value;
    this.setState({Direcciones});
  }
  onNumSucursalerChange(e){
    this.setState({NumSucursaler:e.target.value});
  }
  onSave(e){
    e.preventDefault();
    let Municipios = {};
    let cont = 0;
    this.state.IDMunicipios.map((mun)=>{
      console.log(mun);
      let Sedes = {};
      let Op = {};
      for (var i = 0; i < this.state.NumSucursaler; i++) {
        let op = {};
        op['longitud'] = this.state.Longitudes[i];
        op['latitud'] = this.state.Latitudes[i];
        op['direccion'] = this.state.Direcciones[i];
        Sedes[i] = op;
      }
      Op['municipioId'] = mun;
      Op['sedes'] = Sedes;
      Municipios[cont] = Op;
      cont++;
    });
    Meteor.call('ministerio.insert',this.state.Nombre,this.state.Funcion,this.state.Mision,this.state.Vision,this.state.Url,Municipios);
    this.setState({Nombre:'',Funcion:'',Mision:'',Vision:'',Url:'',NumSucursaler:'1',Longitudes:[],Latitudes:[],Direcciones:[],IDMunicipios:[],selected:''});
    alert("Guardado!!!");
    // this.props.history.push('/principal/registros/data');
  }
  renderSucursalesField(){
    let fields=[];
    for (var i = 0; i < this.state.NumSucursaler; i++) {
      fields[i] =  (
        <div key={i}>
          <h3>{'Sede '+(i+1)}</h3>
          <div className="row" style={{marginBottom:'25px'}}>
              <label className="col-md-12">Municipio</label>
              <div className="col-md-6">
                <Select ref={'min'+i} closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.SelectOp} onChange={this.onOpMuniChange.bind(this,i)} simpleValue value={this.state.IDMunicipios[i]}/>
              </div>
          </div>
          <div className="form-group">
              <label className="col-md-12">{'Longitud '}</label>
              <div className="col-md-12">
                  <input type="text" ref={'lon'+i} className="form-control form-control-line" value={this.state.Longitudes[i]} onChange={this.onLogitudChange.bind(this,i)}/>
              </div>
          </div>
          <div className="form-group">
              <label className="col-md-12">{'Latitud '}</label>
              <div className="col-md-12">
                  <input type="text" ref={'lati'+i} className="form-control form-control-line" value={this.state.Latitudes[i]} onChange={this.onLatitudChange.bind(this,i)}/>
              </div>
          </div>
          <div className="form-group">
              <label className="col-md-12">{'Dirreción '}</label>
              <div className="col-md-12">
                  <input type="text" ref={'direc'+i} className="form-control form-control-line" value={this.state.Direcciones[i]} onChange={this.onDireccionChange.bind(this,i)}/>
              </div>
          </div>
        </div>
      );
    }
    return fields;
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
                <label className="col-md-12">Funcion</label>
                <div className="col-md-12">
                  <textarea rows="5" className="form-control form-control-line" value={this.state.Funcion} onChange={this.onFuncionChange.bind(this)}></textarea>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Mision</label>
                <div className="col-md-12">
                  <textarea rows="5" className="form-control form-control-line" value={this.state.Mision} onChange={this.onMisionChange.bind(this)}></textarea>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Vision</label>
                <div className="col-md-12">
                  <textarea rows="5" className="form-control form-control-line" value={this.state.Vision} onChange={this.onVisionChange.bind(this)}></textarea>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Url</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Url} onChange={this.onUrlChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Cantidad de Sedes a ingresar:</label>
                <div className="col-md-12">
                    <input type="number" className="form-control form-control-line" value={this.state.NumSucursaler} onChange={this.onNumSucursalerChange.bind(this)}/>
                </div>
            </div>
            {this.renderSucursalesField()}
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
