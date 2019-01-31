var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var googleschema  = new Schema ({  _id:String,  token:String , email:String , name:String, Js1:[{}], })




var gm = module.exports=mongoose.model('googlemodel', googleschema);