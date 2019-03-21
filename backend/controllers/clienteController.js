var service = require('../services/service');
var mongoose = require('mongoose');
var Cliente = mongoose.model('Cliente');

module.exports.find = function(request, response) {        
    Cliente.findById(request.user._id).populate('pedidos').exec(function (error, cliente){
        if (error) {
            service.sendJSON(response, 500, error);
        } else {            
            var result = {clienteId: cliente._id, pedidos: cliente.pedidos}            
            service.sendJSON(response, 200, result);
        }
    });
}
