import { validationResult } from "express-validator";
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
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
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
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
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

// pedidos pendientes
export const listarPedidosPendientes = async (req, res) => {
  try {
    const pedidosPendientes = await Pedido.find({estado: "Pendiente"});
    res.status(200).json(pedidosPendientes);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los producto",
    });
  }
};

// pedidos pendientes
export const listarPedidosElaboracion = async (req, res) => {
  try {
    const pedidosPendientes = await Pedido.find({estado: "En elaboracion"});
    res.status(200).json(pedidosPendientes);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los producto",
    });
  }
}

// pedidos listos
export const listarPedidosListos = async (req, res) => {
  try {
    const pedidosListos = await Pedido.find({estado: "Listo para retirar"});
    res.status(200).json(pedidosListos);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los producto",
    });
  }
}

// pedidos cancelados
export const listarPedidosCancelados = async (req, res) => {
  try {
    const pedidosCancelados = await Pedido.find({estado: "Cancelado"});
    res.status(200).json(pedidosCancelados);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los producto",
    });
  }
}

// Pedidos personales
export const listarPedidosPersonales = async (req, res) => {
  try {
    const pedidosPersonales = await Pedido.find({nombreUsuario: req.body.nombreUsuario});
    res.status(200).json(pedidosPersonales);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los producto",
    });
  }
};