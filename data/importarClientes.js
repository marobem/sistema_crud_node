var mongoDb         = require('mongodb');
var mongoClient     = mongoDb.MongoClient;
var dbname          = 'sistema_matriculas';
var collectionName  = 'Alunos';
var url             = 'mongodb://localhost:27017/'+dbname;
var filename        = 'psa_alunos.csv';
var Aluno = require('../backend/models/aluno');
console.log('***************Process started');

mongoClient.connect(url,function(err,db){
    if(err){
        console.log('error on connection '+err);
    }
    else{
        console.log('***************Successfully connected to mongodb');
        var collection  = db.collection(collectionName);
        var fs          = require('fs');
        var readline    = require('readline');
        var stream      = require('stream');
        var instream    = fs.createReadStream(filename);
        var outstream   = new stream;
        var rl          = readline.createInterface(instream,outstream);

        console.log('***************Parsing, please wait ...');
        
        rl.on('line',function(line){
            try{
                var arr         = line.split(',');
                var object   = {};
                //Parse them here
                //Example
                object['matricula'] = arr[0]; //Just an example
                object['email'] = arr[1]; //Just an example
                var aluno = new Aluno();
                object['password'] = aluno.generateHash(arr[2]); //Just an example
                object['isCoordenador'] = arr[3] == 1 ? true : false;
                var res = collection.insert(object);
            }
            catch (err){
                console.log(err);
            }
        });

        rl.on('close',function(){
            db.close();
            console.log('***************completed');
        });
    }
});