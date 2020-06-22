const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
    //By default 'layout.ejs' is used. If you want to specify your custom layout (e.g. 'layouts/layout.ejs'), just set layout property in express app settings.
    // app.set('layout', 'layouts/layout');
app.use(expressLayouts);


app.use(express.static('assests'));
//extract style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express route
app.use('/', require('./routes/index.js'));
//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');




app.listen(port, (err) => {
    if (err) {
        console.log(`error in starting server:${err}`);
    }
    console.log(`server is up and running at port:${port}`);

});