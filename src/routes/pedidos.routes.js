import { Router } from "express";
import { listarPedidos } from "../controllers/pedidos.controllers";

const router = Router();

router.route("/pedidos").get(listarPedidos);

export default router
