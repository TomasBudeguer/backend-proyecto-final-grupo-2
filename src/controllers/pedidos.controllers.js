import Pedido from "../models/pedido";

export const listarPedidos = async (req, res) => {
  try {
    const listaPedidoss = await Pedido.find();
    res.status(200).json(listaPedidoss);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los pedidos",
    });
  }
};

export const crearPedido = async (req, res) => {
  try {
    const pedidoNuevo = new Pedido(req.body);
    await pedidoNuevo.save();
    res.status(201).json({
      mensaje: "El pedido fue correctamente creado",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al intentar agregar un pedido",
    });
  }
};

export const obtenerPedido = async (req, res) => {
  try {
    console.log(req.params.id);
    const pedidoBuscado = await Pedido.findById(req.params.id);
    res.status(200).json(pedidoBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo encontrar el pedido solicitado",
    });
  }
};

export const editarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "El pedido fue editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el pedido solicitado no pudo ser modificado",
    });
  }
};

export const borrarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El pedido fue correctamente eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el pedido solicitado no pudo ser eliminado",
    });
  }
};
