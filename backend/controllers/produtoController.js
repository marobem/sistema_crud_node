var service = require('../services/service');
var mongoose = require('mongoose');
var Produto = mongoose.model('Produto');

module.exports.findAll = function (request, response) {
    Produto.find({}, function (error, result) {
        if (error) {
            service.sendJSON(response, 500, error);
        } else {
            service.sendJSON(response, 200, result);
        }
    });
}

