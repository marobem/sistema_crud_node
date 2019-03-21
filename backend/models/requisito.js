const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequisitoSchema = Schema({    
    codCred: {type: String, required: true},
    codCredRequisito: {type: String, required: true}
});
module.exports = mongoose.model('Requisito', RequisitoSchema, 'Requisitos');
