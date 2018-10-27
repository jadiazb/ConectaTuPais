import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Departamentos = new Mongo.Collection('departamentos');

if(Meteor.isServer){
  Meteor.publish('DepaPublish', function(){
    return Departamentos.find({});
  });
}

Meteor.methods({
  'departamento.insert'(nombre,codigo_dane,longitud,latitud){
    if(this.userId){
      Departamentos.insert({nombre,codigo_dane,longitud,latitud});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  },
  'departamento.update'(_id,nombre,codigo_dane,longitud,latitud){
    if(this.userId){
      Departamentos.update({_id},{$set:{nombre,codigo_dane,longitud,latitud}});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  }
});
