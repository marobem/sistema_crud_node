var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;
var dbname = 'sistema_matriculas';
var url = 'mongodb://localhost:27017/' + dbname;

mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Connected to Database!");
    // print database name
    console.log("db object points to the database : "+ db.databaseName);
    // delete the database
    db.dropDatabase(function(err, result){        
        if (err) throw err;
        console.log("Drop complete");        
        db.close();
    });    
});
