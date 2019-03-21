const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HistoricoSchema = Schema({
    matriculaAluno: {type: String, required: true},
    codCred: {type: String, required: true},
    situacao: {type: String, required: true},
    numeroTurma: {type: Number, required: true}
});
module.exports = mongoose.model('Historico', HistoricoSchema, 'Historicos');
