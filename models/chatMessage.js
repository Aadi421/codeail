const mongoose=require('mongoose');

const chatmessageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // chat belong to a user
    userName:{
        type:String,
        ref:'user'
    }
    
},{
        timestamps:true
   });
const Chatmessage=mongoose.model('Chatmessage',chatmessageSchema);
module.exports=Chatmessage;