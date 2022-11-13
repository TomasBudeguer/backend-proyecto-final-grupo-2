import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  filtroBusqueda,
  listarProductos,
  listarProductosBebidaCaliente,
  listarProductosSalados,
  obtenerProducto,
} from "../controllers/productos.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post(
    [
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe contener entre 2 y 50 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un numero")
        .custom((value) => {
          if (value >= 1 && value <= 10000) {
            return true;
          } else {
            throw new Error("El precio debe estar entre 1 y 10000");
          }
        }),
      check("imagen")
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage("Debe enviar una URL valida"),
      check("categoria")
        .notEmpty()
        .withMessage("La categoria es un dato obligatorio")
        .isIn([
          "Bebida caliente",
          "Bebida fria",
          "Dulce",
          "Ensaldas",
          "Postres",
          "Salado",
          "Tortas",
          "Tartas",
        ])
        .withMessage("La categoria debe ser correcta"),
      check("descripcion")
        .notEmpty()
        .withMessage("La descripcion del producto es un dato obligatorio")
        .isLength({ min: 10, max: 500 })
        .withMessage(
          "La descripcion del producto debe contener entre 10 y 500 caracteres"
        ),
    ],
    crearProducto
  );

router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put(
    [
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe contener entre 2 y 50 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un numero")
        .custom((value) => {
          if (value >= 1 && value <= 10000) {
            return true;
          } else {
            throw new Error("El precio debe estar entre 1 y 10000");
          }
        }),
      check("imagen")
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage("Debe enviar una URL valida"),
      check("categoria")
        .notEmpty()
        .withMessage("La categoria es un dato obligatorio")
        .isIn([
          "Bebida caliente",
          "Bebida fria",
          "Dulce",
          "Ensaldas",
          "Postres",
          "Salado",
          "Tortas",
          "Tartas",
        ])
        .withMessage("La categoria debe ser correcta"),
      check("descripcion")
        .notEmpty()
        .withMessage("La descripcion del producto es un dato obligatorio")
        .isLength({ min: 10, max: 500 })
        .withMessage(
          "La descripcion del producto debe contener entre 10 y 500 caracteres"
        ),
    ],
    editarProducto
  )
  .delete(borrarProducto);

  router.route("/productos/filtro").post(filtroBusqueda);
  router.route("/productos-salados").get(listarProductosSalados);
  router.route("/productos-bebida-caliente").get(listarProductosBebidaCaliente);

export default router;
