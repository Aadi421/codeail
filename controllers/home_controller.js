const Post=require('../models/post');
const User=require('../models/user');


module.exports.home = async (req, res) => {
    // console.log(req.cookies);
    // res.cookie('user_id ', 11)
try{
    //CHANGE :: populate the user of each post
   let posts=await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
       path:'comments',
       populate:{
           path:'user'
       },
       populate:{
           path:'likes'
       }
   }).populate('likes');
   
   let users=await  User.find({});

        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users
        });
   }catch(err){
       console.log('Error',err);
       return;
   }


}


