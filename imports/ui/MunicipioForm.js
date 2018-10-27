import React from 'react';
import {Tracker} from 'meteor/tracker';
import Select from 'react-select';
import {Departamentos} from '../api/Departamentos';
import 'react-select/dist/react-select.css';

export default class MunicipioForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stayOpen: false,
      disabled: false,
      Nombre:'',
      Codigo:'',
      Longitud:'',
      Latitud:'',
      IDdepartamento:'',
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
      let DepaSub = Meteor.subscribe('DepaPublish');
      if(DepaSub.ready()){
        let DepaInfo = Departamentos.find({}).fetch();
        let DepaOp = this.getFiltersArray(DepaInfo);
        this.setState({SelectOp:DepaOp});
      }
    })
  }
  onNombreChange(e){
    this.setState({Nombre:e.target.value});
  }
  onCodigoChange(e){
    this.setState({Codigo:e.target.value});
  }
  onLogitudChange(e){
    this.setState({Longitud:e.target.value});
  }
  onLatitudChange(e){
    this.setState({Latitud:e.target.value});
  }
  onOpDepaChange(value){
    this.setState({IDdepartamento:value});
  }
  onSave(e){
    e.preventDefault();
    Meteor.call('municipio.insert',this.state.Nombre,this.state.Codigo,this.state.Longitud,this.state.Latitud,this.state.IDdepartamento);
    this.setState({Nombre:'',Codigo:'',Longitud:'',Latitud:'',IDdepartamento:''});
    alert("Guardado!!!");
    // this.props.history.push('/principal/registros/data');
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
                <label className="col-md-12">Codigo</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Codigo} onChange={this.onCodigoChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Longitud</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Longitud} onChange={this.onLogitudChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Latitud</label>
                <div className="col-md-12">
                    <input type="text" className="form-control form-control-line" value={this.state.Latitud} onChange={this.onLatitudChange.bind(this)}/>
                </div>
            </div>
            <div className="row" style={{marginBottom:'25px'}}>
                <label className="col-md-12">Departamento</label>
                <div className="col-md-6">
                  <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.SelectOp} onChange={this.onOpDepaChange.bind(this)} simpleValue value={this.state.IDdepartamento}/>
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
