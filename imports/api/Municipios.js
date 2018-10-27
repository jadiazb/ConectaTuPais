import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Municipios = new Mongo.Collection('municipios');

if(Meteor.isServer){
  Meteor.publish('MuniPublish', function(){
    return Municipios.find({});
  });
}

Meteor.methods({
  'municipio.insert'(nombre,codigo_dane,longitud,latitud,departamentoId){
    if(this.userId){
      Municipios.insert({nombre,codigo_dane,longitud,latitud,departamentoId});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  },
  'municipio.update'(_id,nombre,codigo_dane,longitud,latitud,departamentoId){
    if(this.userId){
      Municipios.update({_id},{$set:{nombre,codigo_dane,longitud,latitud,departamentoId}});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  }
});
