import React from 'react';
import { EJSON } from 'meteor/ejson'
import {Tracker} from 'meteor/tracker';
import { Link } from 'react-router-dom';
import ReactMapGL, {Marker, Popup, NavigationControl,FlyToInterpolator } from 'react-map-gl';
import Select from 'react-select';
import { Button,Modal,Glyphicon,Panel } from 'react-bootstrap';
import 'react-select/dist/react-select.css';

import Pin from './Pin';
import PinInfo from './PinInfo';
// import MinisteriosP from './ministerios.json';
import {Departamentos} from '../api/Departamentos';
import {Municipios} from '../api/Municipios';
import {Ministerios} from '../api/Ministerios';
import {SistemasDeInformacion} from '../api/SistemasDeInformacion';

const navStyle = {
  position: 'absolute',
  top: '10%',
  right: 0,
  padding: '10px'
};
//window.innerWidth
//window.innerHeight
export default class Mapa extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      viewport:{
        width: 880,
        height: 680,
        latitude: 4.5709,
        longitude: -72.2973,
        zoom: 4.5
      },
      stayOpen: false,
      disabled: false,
      MinFil:'',
      MunFil:'',
      SisInfo:'',
      DeparFil:'',
      BtnMessagesStyle:'primary',
      popupInfo: null,
      Ministerios:[],
      DepaFil:[],
      MuniFil:[],
      MiniFil:[],
      SisFil:[],
      Depa:[],
      Mun:[],
      Min:[],
      Sis:[],
      MunicipioLatitud: '',
      MunicipioLongitud: '',
      MarKetPink:[],
      show: false,
    }
  }
  getFiltersArray(mg){
    let MagArray=[];
    let cont=0;
    if(mg){
      mg.map((data)=> {
        if(data.nombre!='Ministerio de Agricultura y Desarrollo Rural' && data.nombre!='Ministerio de Agricultura y Desarrollo Rural' && data.nombre!='Departamento Administrativo de la Presidencia de la República' && data.nombre!='Presidencia de la República'){
          MagArray[cont] = {value:data._id,label:data.nombre,selected:false};
          cont++;
        }
      });
    }
    return MagArray;
  }
  componentDidMount(){
    this.mapaTracker = Tracker.autorun(()=>{
      Meteor.subscribe('DepaPublish');
      Meteor.subscribe('MuniPublish');
      Meteor.subscribe('MiniPublish');
      Meteor.subscribe('SisInPublish');
      let Depa = Departamentos.find({}).fetch();
      let DepaFil = this.getFiltersArray(Depa);
      this.setState({DepaFil});
      this.setState({Depa});
    });
  }
  onViewportChange(viewport){
    this.setState({viewport});
  }

  onDeparFilChange(value){
    this.setState({DeparFil:value});
    let position;
    position = this.state.viewport;
    this.state.Depa.map((depa)=>{
      if(depa._id == value){
        position.latitude = Number(depa.latitud);
        position.longitude = Number(depa.longitud);
        position.zoom = 8.5;
        position.transitionInterpolator = new FlyToInterpolator();
        position.transitionDuration = 2000;
        this.setState({viewport:position});
        let Mun = Municipios.find({departamentoId:value}).fetch();
        let MuniFil = this.getFiltersArray(Mun);
        this.setState({MuniFil});
        this.setState({Mun});
      }
    });
    if(value == null){
      position.latitude = 4.5709;
      position.longitude = -72.2973;
      position.zoom = 4.5;
      position.transitionInterpolator = new FlyToInterpolator();
      position.transitionDuration = 2000;
      this.setState({viewport:position});
    }
  }

  onMuniChange(value){
    this.setState({MunFil:value});
    let position;
    position = this.state.viewport;
    this.state.Mun.map((mun)=>{
      if(mun._id == value){
        position.latitude = Number(mun.latitud);
        position.longitude = Number(mun.longitud);
        position.zoom = 10.5;
        position.transitionInterpolator = new FlyToInterpolator();
        position.transitionDuration = 2000;
        this.setState({viewport:position});
        let Min = Ministerios.find({}).fetch();
        let ids = [];
        let cont = 0;
        let pinks = [];
        Min.map((min)=>{
          let MuniSedes = min.municipios;
          for(let info in MuniSedes){
            if(MuniSedes[info]['municipioId']==value){
              ids[cont] = min._id;
              cont++;
              pinks[min._id] = [];
              for(let sedes in MuniSedes[info]['sedes']){
                pinks[min._id][sedes] = MuniSedes[info]['sedes'][sedes];
                pinks[min._id][sedes]['_id'] = MuniSedes[info]['municipioId'];
              }
            }
          }
        });
        this.setState({MarKetPink:pinks});
        Min = Ministerios.find({_id:{$in:ids}}).fetch();
        let MiniFil = this.getFiltersArray(Min);
        this.setState({MiniFil});
      }
    });
    if(value == null){
      this.state.Depa.map((depa)=>{
        if(depa._id == this.state.DeparFil){
          position.latitude = Number(depa.latitud);
          position.longitude = Number(depa.longitud);
          position.zoom = 8.5;
          position.transitionInterpolator = new FlyToInterpolator();
          position.transitionDuration = 2000;
          this.setState({viewport:position});
        }
      });
    }
  }

  onMinChange(value){
    this.setState({MinFil:value});
    let Sis = SistemasDeInformacion.find({ministerioId:value}).fetch();
    let SisFil = this.getFiltersArray(Sis);
    this.setState({SisFil});
    this.setState({Sis});
  }

  onSisInfoChange(value){
    this.setState({SisInfo:value});
    if(value!=null){
      this.setState({ show: true });
    }else{
      this.setState({ show: false });
    }
  }

  renderInfoPanel(){
    if(this.state.SisInfo!=null){
      return this.state.Sis.map((sis)=>{
        if(this.state.SisInfo == sis._id){
          let panel = (
            <Panel style={{marginTop:'2%'}} key={sis._id}>
              {/* <Panel.Heading>
                <Panel.Title componentClass="h3"></Panel.Title>
              </Panel.Heading> */}
              <Panel.Body style={{height:'400px','overflow':'scroll'}}>
                <h4>{sis.nombre+' '+sis.siglas}</h4>
                <h4>Objetivo</h4>
                <div style={{textAlign:'justify'}}>
                  {sis.objetivo}
                </div>
                <h4>Servicion al Ciudadano</h4>
                <div style={{textAlign:'justify'}}>
                  {sis.servicios}
                </div>
                <h4>Sitio</h4>
                <a href={sis.url} target="_blank">{sis.url}</a>
                <h4>Resolución</h4>
                <div style={{textAlign:'justify'}}>
                  {sis.resolucion}
                </div>
                {/* <h4>Link de la Resolución</h4>
                <a href={sis.url_resolucion} target="_blank">Link</a> */}
              </Panel.Body>
            </Panel>
          );
          return panel;
        }
      })
    }
  }

  renderCityMarker(){
    let pinks = this.state.MarKetPink[this.state.MinFil];
    let cont = 0;
    if(pinks){
      return pinks.map((min)=>{
          let data = (
              <Marker key={cont}
                longitude={Number(min.longitud)}
                latitude={Number(min.latitud)} >
                <Pin size={20} onClick={() => this.setState({popupInfo: min})} />
              </Marker>
            );
          cont++;
          return data;
      });
    }
  }

  renderPopup() {
    const {popupInfo} = this.state;
    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={Number(popupInfo.longitud)}
        latitude={Number(popupInfo.latitud)}
        onClose={() => this.setState({popupInfo: null})} >
        <PinInfo info={this.state.MinFil} />
      </Popup>
    );
  }

  handleShow(){

  }

  handleClose() {
    this.setState({ show: false });
    this.setState({SisInfo:null});
  }

  render(){
    let linkText = 'Iniciar Sesión';
    if(!!Meteor.userId()){
      linkText = 'Dashboard';
    }
    let token = 'pk.eyJ1Ijoic2VyZ2lvMTI1ZyIsImEiOiJjamdwaXVjNGowNmViMzNubDB1ZDFpNW50In0.7U27cCItWZF45GrJV_HDVQ';
    return (
      <div>
        <div className="row page-titles">
            <div className="col-md-5 col-8 align-self-center">
                <div className="nav toggle">
                  <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                </div>
                <h3 className="text-themecolor">Mapa</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="">Home</a></li>
                  <li className="breadcrumb-item active">Mapa</li>
                </ol>
            </div>
            <div className="col-md-7 col-4 align-self-center">
            </div>
        </div>
        {/* style={{marginLeft: '-1.9%', marginTop: '-29px'}} */}
        <div className='row' >
          <div className="col-lg-4 col-xlg-3 col-md-5">
              <div className="card">
                  <div className="card-block">
                    <div className=''>
                      <h3 className="card-title" style={{color:'#337ab7'}}>Departamento:</h3>
                      <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.DepaFil} onChange={this.onDeparFilChange.bind(this)} simpleValue value={this.state.DeparFil}/>
                      <h3 className="card-title" style={{color:'#337ab7'}}>Municipios:</h3>
                      <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.MuniFil} onChange={this.onMuniChange.bind(this)} simpleValue value={this.state.MunFil}/>
                      <h3 className="card-title" style={{color:'#337ab7'}}>Ministerio:</h3>
                      <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.MiniFil} onChange={this.onMinChange.bind(this)} simpleValue value={this.state.MinFil}/>
                      <h3 className="card-title" style={{color:'#337ab7'}}>Sistemas de Información:</h3>
                      <Select closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.SisFil} onChange={this.onSisInfoChange.bind(this)} simpleValue value={this.state.SisInfo}/>
                    </div>
                  </div>
              </div>
          </div>
          <div className="col-lg-8 col-xlg-9 col-md-7">
            <div className="card">
                <div className="card-block">
                  <ReactMapGL {...this.state.viewport} mapboxApiAccessToken={token} mapStyle="mapbox://styles/mapbox/streets-v9" onViewportChange={this.onViewportChange.bind(this)}>
                    {this.renderCityMarker()}
                    {this.renderPopup()}
                    <div className="nav" style={navStyle}>
                      <NavigationControl onViewportChange={this.onViewportChange.bind(this)} />
                    </div>
                  </ReactMapGL>
                </div>
            </div>
          </div>
          {/* <div className='col-md-8' style={{marginLeft:'-10%'}}>
            <Link className='link-login' to={{ pathname: '/login' }} >
              <h4 className="card-title" style={{color:'#337ab7'}}>{linkText}</h4>
            </Link>

          </div> */}

          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Sistemas de Información</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.renderInfoPanel()}
            </Modal.Body>
          </Modal>


        </div>
      </div>
   );
  }
}
