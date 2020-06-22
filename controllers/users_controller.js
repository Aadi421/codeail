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
module.exports.createUser = (req, res) => {
    //todo later
};
//get the signIn data
module.exports.createSession = (req, res) => {
    //todo later
};