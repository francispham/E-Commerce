const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://francispham:Heroman1989@nodebasic-4blxc.mongodb.net/test?retryWrites=true',
        {
            useNewUrlParser: true
        })
        .then(result => {
            console.log('Connected!');
            callback(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = mongoConnect;