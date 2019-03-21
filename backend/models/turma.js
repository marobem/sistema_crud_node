const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TurmaSchema = Schema({
    codCred: {type: String, required: true},
    nomeDisciplina: {type: String, required: true},
    numeroTurma: {type: Number, required: true},
    vagas: {type: Number, required: true},
    vagasDisponiveis: {type: Number, required: true},
    horario: {type: String, required: true},
    alunos: [{type: Schema.Types.ObjectId, ref: 'Aluno'}],
    totalMatriculados: {type: Number, default: 1, required: true},
});
module.exports = mongoose.model('Turma', TurmaSchema, 'Turmas');
