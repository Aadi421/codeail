const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash=require('connect-flash')
const customMware=require('./config/middleware')


app.use(sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'


}));
//By default 'layout.ejs' is used. If you want to specify your custom layout (e.g. 'layouts/layout.ejs'), just set layout property in express app settings.
// app.set('layout', 'layouts/layout');
// where is url encode in this file in this file index.js show urlencoded  
app.use(express.urlencoded());
app.use(cookieParser());



app.use(express.static('assests'));
// make the uploads path available to yhe browser
app.use('/uploads',express.static(__dirname +'/uploads'))
app.use(expressLayouts);
//extract style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeail',
    //TODO  change the secret before deployment in production mode
    secret: 'aadi',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 80 * 100),
        // secure: true
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }),
    function(err) {
        console.log(err || 'connect-mongodb setup ok');

    }

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express route
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`error in starting server:${err}`);
    }
    console.log(`server is up and running at port:${port}`);

});