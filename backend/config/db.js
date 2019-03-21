var mongoose = require('mongoose');
const URL_DB = 'mongodb://localhost:27017/sistema_crud';
mongoose.Promise = global.Promise;
mongoose.connect(URL_DB, {useMongoClient: true});
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected ' + URL_DB);
});
mongoose.connection.on('error', function(error){
    console.log('Mongoose connection error ' + error);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconneted');
});
require('../models/disciplina');
require('../models/historico');
require('../models/requisito');
require('../models/turma');
require('../models/aluno');
require('../models/pedido');
require('../models/cliente');
require('../models/produto');