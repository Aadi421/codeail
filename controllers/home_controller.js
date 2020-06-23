module.exports.home = (req, res) => {
    console.log(req.cookies);
    res.cookie('user_id ', 11)
    return res.render('home', {
        title: '/home',
    })
}