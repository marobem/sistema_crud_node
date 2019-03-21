var service = require('../services/service');
var mongoose = require('mongoose');
var Turma = mongoose.model('Turma');
var Historico = mongoose.model('Historico');
var Requisito = mongoose.model('Requisito');
var Aluno = mongoose.model('Aluno');

module.exports.findAll = function (request, response) {

    var query = { matriculaAluno: request.user.matricula, situacao: "APR" };
    var projection = { codCred: 1, _id: 0 }

    Historico.find(query, projection).then(function (historicos) {
        var codCredAprovadas = historicos.map(function (historico) {
            return historico.codCred;
        });
        Requisito.find({ codCredRequisito: { $in: codCredAprovadas } }).then(function (requisitos) {
            var promises = requisitos.map(function (requisito) {
                var query = { $and: [{ codCred: requisito.codCred }, { codCred: { $nin: codCredAprovadas } }] };
                return Turma.findOne(query).then(function (turma) {
                    return turma;
                })
            });
            Promise.all(promises).then(function (result) {
                result = result.filter(function (value) {
                    return !this[JSON.stringify(value)] && (this[JSON.stringify(value)] = true) && value != null;
                }, Object.create(null))
                service.sendJSON(response, 200, result);
            })
        });
    });
}

module.exports.matricularSe = function (request, response) {
    var codCred = request.body.codCred;
    var numeroTurma = request.body.numeroTurma;
    var query = { codCred: codCred, numeroTurma: numeroTurma, vagasDisponiveis: { $gt: 0 } };
    var set = { $inc: { vagasDisponiveis: -1, totalMatriculados: 1 }, $push: { alunos: request.user._id } };
    Turma.findOneAndUpdate(query, set, function (error, turma) {
        if (error) {
            service.sendJSON(response, 500, error);
        } else {
            var query = { $push: { turmasMatriculadas: turma._id } };
            Aluno.findByIdAndUpdate(request.user._id, query, function (error, aluno) {
                if (error) {
                    service.sendJSON(response, 500, error);
                } else {
                    service.sendJSON(response, 200, turma);
                }
            });
        }
    });
}

module.exports.cancelarMatricula = function (request, response) {
    var codCred = request.body.codCred;
    var numeroTurma = request.body.numeroTurma;
    var query = { codCred: codCred, numeroTurma: numeroTurma };
    var set = { $inc: { vagasDisponiveis: 1, totalMatriculados: -1 }, $pull: { alunos: request.user._id } };
    Turma.findOneAndUpdate(query, set, function (error, turma) {
        if (error) {
            service.sendJSON(response, 500, error);
        } else {
            var query = { $pull: { turmasMatriculadas: turma._id } };
            Aluno.findByIdAndUpdate(request.user._id, query, function (error, aluno) {
                if (error) {
                    service.sendJSON(response, 500, error);
                } else {
                    service.sendJSON(response, 200, turma);
                }
            })
        }
    });
}

module.exports.totalVagasPorDisciplina = function (request, response) {
    var group = { $group: { _id: '$nomeDisciplina', total: { $sum: '$vagasDisponiveis' } } };
    Turma.aggregate(group, function (error, result) {
        if (error) {
            service.sendJSON(response, 500, error);
        } else {
            console.log(result);
            service.sendJSON(response, 200, result);
        }
    });
}

module.exports.alunosPorDisciplina = function (request, response) {
    var group = { '$group': { _id: '$nomeDisciplina', total: { $sum: '$totalMatriculados' } } };
    Turma.aggregate(group, function (error, result) {
        if (error) {
            service.sendJSON(response, 500, error);
        } else {
            service.sendJSON(response, 200, result);
        }
    });
}