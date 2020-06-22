const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeail_development');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting mongoDB'));
db.once('open', () => {
    console.log('connected to database::mongoDB');

});
module.exports = db;