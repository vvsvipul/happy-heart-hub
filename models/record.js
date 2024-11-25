const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender:{
    type:Number,
    require:true,
  },
  weight:{
    type:Number,
    require:true
  },
  height:{
    type:Number,
    require:true
  },
  ap_hi:{
    type:Number,
    require:true
  },
  ap_lo:{
    type:Number,
    require:true
  },
  cholesterol:{
    type:Number,
    require:true
  },gluc:{
    type:Number,
    require:true
  },
  prediction:{
    type:Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  
});


const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
