const User = require('../models/user');
const path=require('path');
const fs=require('fs')
module.exports.profile = (req, res) => {

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: '/profile',
            profile_user:user,
    });
    
    });
};


module.exports.update= async (req,res)=>{
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','User information Get updated');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error','you cannot update User Information');
    //     return res.status(401).send('Unautherised')
    // }
    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log(err,'********multer error')}

                user.name=req.body.name;
                user.email=req.body.email;
                user.city=req.body.city;
                user.address=req.body.address;
                user.dob=req.body.dob;
                user.number=req.body.number;

                
                if(req.file){

                    // this replace the avatar with current uploads avatar(it work only if  atleast one previous avatar is availabe)
                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname ,'..',user.avatar));
                    // }

                    //this is saving the path of the uploaded file into the avatar field the user 
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back')

        }

    }else{
        req.flash('error','you cannot update User Information');
        return res.status(401).send('Unautherised')
    }
}


//render the sign in page
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: '/signIn',
    })
};
//render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }



    return res.render('user_sign_up', {
        title: '/signUp',
    })
};
//get the signUp data
module.exports.create = (req, res) => {

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) { console.log('error in creating user while signing up'); return }
                req.flash('success','User is successfully Created');
                return res.redirect('/users/sign-in');
            })
        } else {
            req.flash('error','User is already exist with this Username');
            return res.redirect('back');
        }

    });


};
//get the signIn data
module.exports.createSession = (req, res) => {
    //todo later
    req.flash('success','Logged in successfully');
    return res.redirect('/');
};
module.exports.destroySession = (req, res) => {
    //this is give by passport
    req.logout();
    req.flash('success','you have logged out');

    return res.redirect('/');
};