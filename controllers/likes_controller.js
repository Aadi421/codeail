const Like=require('../models/like')
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike=async (req,res) => {
    try{

        //like/toggle/?id=ads&type=Post
        let likeable;
        let deleted=false;
        if(req.query.type== 'Post')
        {
            likeable=await Post.findById(req.query.id).populate('likes');

        }else{
            likeable=await Comment.findById(req.query.id).populate('likes');

        }


        // check if like already  exit
        let existingLike= await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id,

        })
        //  if like already  exist then deleted
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted=true;
        }else{
            //make a new like
            let newLike= await Like.create({
                
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type,
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            messsage:'Like Request successfull',
            data:{
                deleted:deleted
            }
        })
    }catch(err){
        req.flash('error in like the object', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');

    }
}