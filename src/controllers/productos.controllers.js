import Producto from "../models/producto";
import { validationResult } from "express-validator";

export const listarProductos = async (req, res) => {
  try {
    const listaProductos = await Producto.find();
    res.status(200).json(listaProductos);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los producto",
    });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    res.status(201).json({
      mensaje: "El producto fue correctamente creado",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al intentar agregar un producto",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findById(req.params.id);
    res.status(200).json(productoBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo encontrar el producto solicitado",
    });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "El producto fue editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el producto solicitado no pudo ser modificado",
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El producto fue correctamente eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el producto solicitado no pudo ser eliminado",
    });
  }
};

// filtro de busqueda

export const filtroBusqueda = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { nombreProducto } = req.body;

    let productoBuscado = await Producto.find({ nombreProducto }); //devulve un null
    if (!productoBuscado) {
      return res.status(400).json({
        mensaje: "No se encontraron resultados",
      });
    }

    res.status(200).json(
      productoBuscado
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se ecnotraron resultados",
    });
  }
};


export const listarProductosSalados = async (req, res) => {
  try {
    const productosSalados = await Producto.find({categoria: "Salado"});
    res.status(200).json(productosSalados);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los productos salados",
    });
  }
};

export const listarProductosBebidaCaliente = async (req, res) => {
  try {
    const productosBebidaCaliente = await Producto.find({categoria: "Bebida caliente"});
    res.status(200).json(productosBebidaCaliente);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar las bebidas calientes",
    });
  }
};


export const listarProductosBebidaFria = async (req, res) => {
  try {
    const productosBebidaFria = await Producto.find({categoria: "Bebida fria"});
    res.status(200).json(productosBebidaFria);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar las bebidas frias",
    });
  }
};

export const listarProductosDulce = async (req, res) => {
  try {
    const productosDulce = await Producto.find({categoria: "Dulce"});
    res.status(200).json(productosDulce);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los productos dulces",
    });
  }
};

export const listarProductosEnsaladas = async (req, res) => {
  try {
    const productosEnsaladas = await Producto.find({categoria: "Ensaladas"});
    res.status(200).json(productosEnsaladas);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar las ensaladas",
    });
  }
};

export const listarProductosPostres = async (req, res) => {
  try {
    const productosPostres = await Producto.find({categoria: "Postres"});
    res.status(200).json(productosPostres);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los Postres",
    });
  }
};

export const listarProductosTortas = async (req, res) => {
  try {
    const productosTortas = await Producto.find({categoria: "Tortas"});
    res.status(200).json(productosTortas);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar las Tortas",
    });
  }
};

export const listarProductosTartas = async (req, res) => {
  try {
    const productosTartas = await Producto.find({categoria: "Tartas"});
    res.status(200).json(productosTartas);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar las tartas",
    });
  }
};



