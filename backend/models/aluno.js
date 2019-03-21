const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlunoSchema = Schema({
    matricula : {type: String, maxlength: 9, minlength: 9},
    email: {type: String, required: true},
    password: {type: String, require: true},
    turmasMatriculadas: [{type: Schema.Types.ObjectId, ref: 'Turma'}],  
    isCoordenador: {type: Boolean}
});

AlunoSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

AlunoSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Aluno', AlunoSchema, 'Alunos');
