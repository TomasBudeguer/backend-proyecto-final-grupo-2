import { Router } from "express";
import {
  borrarPedido,
  crearPedido,
  editarPedido,
  listarPedidos,
  obtenerPedido,
} from "../controllers/pedidos.controllers";

const router = Router();

router.route("/pedidos").get(listarPedidos).post(crearPedido);

router
  .route("/pedidos/:id")
  .get(obtenerPedido)
  .put(editarPedido)
  .delete(borrarPedido);

export default router;
