import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
  },
  pedido: {
    type: String,
    required: true,
    minLength: 3,
  },
  estado: {
    type: String,
    required: true,
  },
});

const Pedido = mongoose.model("pedido", pedidoSchema);

export default Pedido;
