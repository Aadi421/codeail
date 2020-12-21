const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/codeail_development');
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/codeail_development',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
                        
      
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting mongoDB'));
db.once('open', () => {
    console.log('connected to database::mongoDB');

});
module.exports = db;

// TopologyDescription {
//  type: 'Single',
// setName: null,
//  maxSetVersion: null,
//  maxElectionId: null,
//  servers: Map { 'localhost:27017' => [ServerDescription] },
//  stale: false,
//  compatible: true,
// compatibilityError: null,
// logicalSessionTimeoutMinutes: null,
//  heartbeatFrequencyMS: 10000,
//  localThresholdMS: 15,
//  commonWireVersion: null
//  }
//  }
