import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Ministerios = new Mongo.Collection('ministerios');

if(Meteor.isServer){
  Meteor.publish('MiniPublish', function(){
    return Ministerios.find({});
  });
}

Meteor.methods({
  'ministerio.insert'(nombre,funcion,mision,vision,url,municipios){
    if(this.userId){
      console.log(municipios);
      Ministerios.insert({nombre,funcion,mision,vision,url,municipios});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  },
  'ministerio.update'(_id,nombre,funcion,mision,vision,url,municipios){
    if(this.userId){
      Ministerios.update({_id},{$set:{nombre,funcion,mision,vision,url,municipios}});
    }else{
      throw new Meteor.Error('not-authorized');
    }
  }
});
