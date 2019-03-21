var service = require('../services/service');
var mongoose = require('mongoose');
var Aluno = mongoose.model('Aluno');

module.exports.find = function(request, response) {        
    Aluno.findById(request.user._id).populate('turmasMatriculadas').exec(function (error, aluno){
        if (error) {
            service.sendJSON(response, 500, error);
        } else {            
            var result = {alunoId: aluno._id, turmasMatriculadas: aluno.turmasMatriculadas}            
            service.sendJSON(response, 200, result);
        }
    });
}
