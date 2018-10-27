import React, {PureComponent} from 'react';
import {Tracker} from 'meteor/tracker';
import {Panel} from 'react-bootstrap';

import {Ministerios} from '../api/Ministerios';

export default class PinInfo extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      Min:''
    };
  }
  componentDidMount(){
    this.infoTracker = Tracker.autorun(()=>{
      Meteor.subscribe('MiniPublish');
      let Min = Ministerios.findOne({_id:this.props.info});
      this.setState({Min});
    });
  }
  render() {
    const {info} = this.props;
    console.log(this.props);
    let funcion = String(this.state.Min.funcion);
    // funcion = funcion.split(' ', 100);
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{this.state.Min.nombre}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <h4>Función</h4>
            <div className='' style={{'maxWidth':'650px'}}>
              <div style={{'padding': '10px','wordWrap': 'break-word',textAlign:'justify'}} className=''>{funcion+'...'}</div>
            </div>
            <h4>Mision</h4>
            <div className='' style={{'maxWidth':'650px'}}>
              <div style={{'padding': '10px','wordWrap': 'break-word',textAlign:'justify'}} className=''>{this.state.Min.mision}</div>
            </div>
            <h4>Vision</h4>
            <div className='' style={{'maxWidth':'650px'}}>
              <div style={{'padding': '10px','wordWrap': 'break-word',textAlign:'justify'}} className=''>{this.state.Min.vision}</div>
            </div>
            <h4>Sitio</h4>
            <a href={this.state.Min.url} target="_blank">Link</a>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
