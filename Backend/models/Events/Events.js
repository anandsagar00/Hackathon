import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    maxlength:[10,'The title cannot exceed 40 characters']
},
status:{
type:String,
required:true,
},
bannerimg:{
    type:String,
    required:true
},
photos:[
 {
    type:String
 }
],
description:{
    type:String,
    required:true,
},
datefrom:{
    type:Date,
    required:true
},
dateto:{
    type:Date,
    required:true
},
collegeid:{
    type:Number,
    required:true
},
publisheddate:{
    type:Date,
    required:true
}
});
const Event=mongoose.model("Event",eventSchema);
export default Event;