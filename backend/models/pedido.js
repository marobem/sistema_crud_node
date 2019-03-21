const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PedidoSchema = Schema({
    codPedido: {type: String, required: true},
    dataPedido: {type: String, required: true},
    produtos: [{type: Schema.Types.ObjectId, ref: 'Produto'}]
});
module.exports = mongoose.model('Pedido', PedidoSchema, 'Pedidos');
