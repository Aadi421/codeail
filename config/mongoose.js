const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/codeail_development');
mongoose.connect('mongodb+srv://Aadi421:Aadi@421@cluster0.tcbwg.mongodb.net/Cluster0?retryWrites=true&w=majority',{
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting mongoDB'));
db.once('open', () => {
    console.log('connected to database::mongoDB');

});
module.exports = db;

