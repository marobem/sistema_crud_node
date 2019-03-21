const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClienteSchema = Schema({
    nome : {type: String, maxlength: 100, minlength: 0},
    email: {type: String, required: true},
    password: {type: String, require: true},
	pedidos: [{type: Schema.Types.ObjectId, ref: 'Pedido'}]
});

ClienteSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

ClienteSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Cliente', ClienteSchema, 'Clientes');
