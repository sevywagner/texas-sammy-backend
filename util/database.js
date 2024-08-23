const mongo = require('mongodb');

let _db;

exports.mongoConnect = (cb) => {
    const client = new mongo.MongoClient(process.env.MONGO_URI);
    client.connect().then((client) => {
        _db = client.db();
        console.log('Connected to mongo');
        cb();
    }).catch((err) => {
        console.log(err);
    });
}

exports.getDb = () => {
    if (_db) {
        return _db;
    }
}