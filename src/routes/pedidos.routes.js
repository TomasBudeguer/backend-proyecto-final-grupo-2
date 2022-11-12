import { Router } from "express";
import {
  borrarPedido,
  crearPedido,
  editarPedido,
  listarPedidos,
  obtenerPedido,
} from "../controllers/pedidos.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/pedidos")
  .get(listarPedidos)
  .post(
    [
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre del usuario es un dato obligatorio")
        .isLength({ min: 6, max: 20 })
        .withMessage(
          "El nombre del usuario debe contener entre 6 y 20 caracteres"
        ),
      check("pedido")
        .notEmpty()
        .withMessage("El pedido es un dato obligatorio")
        .isLength({ min: 3 })
        .withMessage("El pedido debe contener por lo menos 3 caracteres"),
      check("estado")
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isIn(["Pendiente", "En elaboracion", "Listo para retirar", "Cancelado"])
        .withMessage("La categoria debe ser correcta"),
    ],
    crearPedido
  );

router
  .route("/pedidos/:id")
  .get(obtenerPedido)
  .put(
    [
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre del usuario es un dato obligatorio")
        .isLength({ min: 6, max: 20 })
        .withMessage(
          "El nombre del usuario debe contener entre 6 y 20 caracteres"
        ),
      check("pedido")
        .notEmpty()
        .withMessage("El pedido es un dato obligatorio")
        .isLength({ min: 3 })
        .withMessage("El pedido debe contener por lo menos 3 caracteres"),
      check("estado")
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isIn(["Pendiente", "En elaboracion", "Listo para retirar", "Cancelado"])
        .withMessage("La categoria debe ser correcta"),
    ],
    editarPedido
  )
  .delete(borrarPedido);

export default router;
