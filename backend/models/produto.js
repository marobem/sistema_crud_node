const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProdutoSchema = Schema({
    codProduto: {type: String, required: true},
    nomeProduto: {type: String, required: true},
    quantidadeProduto: {type: Number, required: true},
	precoProduto: {type: Number, required: true}
});
module.exports = mongoose.model('Produto', ProdutoSchema, 'Produtos');