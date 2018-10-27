import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const SistemasDeInformacion = new Mongo.Collection('sistemas_de_informacion');

if(Meteor.isServer){
  Meteor.publish('SisInPublish', function(){
    return SistemasDeInformacion.find({});
  });
}

Meteor.methods({
  'sistema.insert'(nombre,siglas,objetivo,servicios,url,resolucion,url_resolucion,ministerioId){
    if(this.userId){
      SistemasDeInformacion.insert({nombre,siglas,objetivo,servicios,url,resolucion,url_resolucion,ministerioId});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  },
  'sistema.update'(_id,nombre,siglas,objetivo,servicios,url,resolucion,url_resolucion,ministerioId){
    if(this.userId){
      SistemasDeInformacion.update({_id},{$set:{nombre,siglas,objetivo,servicios,url,resolucion,url_resolucion,ministerioId}});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  }
});
