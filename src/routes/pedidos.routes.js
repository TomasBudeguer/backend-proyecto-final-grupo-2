import { Router } from "express";
import {
  borrarPedido,
  crearPedido,
  editarPedido,
  listarPedidos,
  obtenerPedido,
  listarPedidosPendientes,
  listarPedidosElaboracion,
  listarPedidosListos,
  listarPedidosCancelados,
  listarPedidosPersonales
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
        .isLength({ min: 8, max: 50 })
        .withMessage(
          "El nombre del usuario debe contener entre 8 y 50 caracteres"
        ),
      check("pedido")
        .notEmpty()
        .withMessage("El pedido es un dato obligatorio")
        .isLength({ min: 3 })
        .withMessage("El pedido debe contener por lo menos 3 caracteres"),
      check("estado")
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isIn([
          "Pendiente",
          "En elaboracion",
          "Listo para retirar",
          "Cancelado",
        ])
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
        .isLength({ min: 8, max: 50 })
        .withMessage(
          "El nombre del usuario debe contener entre 8 y 50 caracteres"
        ),
      check("pedido")
        .notEmpty()
        .withMessage("El pedido es un dato obligatorio")
        .isLength({ min: 3 })
        .withMessage("El pedido debe contener por lo menos 3 caracteres"),
      check("estado")
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isIn([
          "Pendiente",
          "En elaboracion",
          "Listo para retirar",
          "Cancelado",
        ])
        .withMessage("La categoria debe ser correcta"),
    ],
    editarPedido
  )
  .delete(borrarPedido);

router.route("/pedidos-pendientes").get(listarPedidosPendientes);
router.route("/pedidos-elaboracion").get(listarPedidosElaboracion);
router.route("/pedidos-listos").get(listarPedidosListos);
router.route("/pedidos-cancelados").get(listarPedidosCancelados);
router.route("/pedidos-personales").post(listarPedidosPersonales);

export default router;
