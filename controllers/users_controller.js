const User = require('../models/user');
module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: '/profile',
    })
};
//render the sign in page
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: '/signIn',
    })
};
//render the sign up page
module.exports.signUp = (req, res) => {
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
};