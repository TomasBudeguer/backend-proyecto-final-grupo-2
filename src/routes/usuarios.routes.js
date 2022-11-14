import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, login } from "../controllers/usuarios.controllers";

const router = Router();

//agregar las validaciones con express-validator
router
  .route("/")
  .post(
    [ 
      check("email", "El email es obligatorio").isEmail().notEmpty(),
      check(
        "password",
        "El password debe contener 8 caracteres como mínimo"
      ).isLength({ min: 8, max: 50 }),
    ],
    login
  );
router
  .route("/nuevo")
  .post(
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      check("password", "El password debe de ser de 8 caracteres").isLength({
        min: 8,
      }),
    ],
    crearUsuario
  );

export default router;