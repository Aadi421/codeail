const Post=require('../../../models/post')
const Comment=require('../../../models/comment')

module.exports.index= async (req,res)=>{
    let posts=await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
       path:'comments',
       populate:{
           path:'user'
       }
   });


    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.json(200,{
                message:"post and associated comment deleted successfully"
            });
        }else{
            req.flash('error', 'You cannot delete this post!');
           return res.json(401,{
            message:"You cannot delete the post"
        });
        }

    }catch(err){
        
        console.log('******',err);
        return res.json(500,{
            message:"Internal Server Error!"
        })
    }
    
}