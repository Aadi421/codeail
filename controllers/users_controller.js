const User = require('../models/user');
module.exports.profile = (req, res) => {

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: '/profile',
            profile_user:user,
    });
    
    });
};


module.exports.update=(req,res)=>{
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
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

                return res.redirect('/users/sign-in');
            })
        } else {
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