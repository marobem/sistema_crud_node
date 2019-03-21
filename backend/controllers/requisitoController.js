var service = require('../services/service');
var mongoose = require('mongoose');
var Requisito = mongoose.model('Requisito');
var Disciplina = mongoose.model('Disciplina');


module.exports.findByCodCred = function (request, response) {
    Requisito.find({ codCred: request.params.codCred }, function (error, requisitos) {
        var promises = requisitos.map(function (requisito) {
            return Disciplina.findOne({codCred: requisito.codCredRequisito}).then(function (disciplinas) {
                return disciplinas;
            })
        });        
        Promise.all(promises).then(function (results){
            service.sendJSON(response, 200, results);
        })    
    });    
}