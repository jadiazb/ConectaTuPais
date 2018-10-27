import React from 'react';
import {Tracker} from 'meteor/tracker';


export default class DataList extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.datalistTracker = Tracker.autorun(()=>{
      console.log(this.props);

    });
  }
  render(){
    return(
      <div></div>
    );
  }
}
