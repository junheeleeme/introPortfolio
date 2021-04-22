
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
const MONGODB_URL = process.env.MONGODB_URL;


mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err=>{
  if(err){
    console.log(err)
  }
  else{
    console.log('success!');
  }
});