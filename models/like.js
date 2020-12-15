const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
   
    user:{
        type:  mongoose.Schema.Types.ObjectId,
    },

    // this define the obejct id of the like element 
    likeable:{
        type:  mongoose.Schema.Types.ObjectId,
        required:true,
        refpath:'onModel'

    },
    // this field is used for defining the type of the liked object since this is dynamic reference 
    onModel:{
        type: String,
        required:true,
        enum:['Post','Comment']
    }
},{
        timestamps:true
   });
const Like=mongoose.model('Like',likeSchema);
module.exports=Like;