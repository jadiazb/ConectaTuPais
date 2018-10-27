import React from 'react';

export default class DepartamentoForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Nombre:'',
      Codigo:'',
      Longitud:'',
      Latitud:''
    }
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
  onSave(e){
    e.preventDefault();
    Meteor.call('departamento.insert',this.state.Nombre,this.state.Codigo,this.state.Longitud,this.state.Latitud);
    this.setState({Nombre:'',Codigo:'',Longitud:'',Latitud:''});
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
