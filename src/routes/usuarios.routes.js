import { Router } from "express";
import { check } from "express-validator";
import { borrarUsuario, crearUsuario, editarUsuario, listarUsuarios, login, obtenerUsuario } from "../controllers/usuarios.controllers";

const router = Router();

//agregar las validaciones con express-validator
router.route("/usuario").post(
  [
    check("email")
      .notEmpty()
      .withMessage("el email es obligatorio")
      .isEmail()
      .withMessage("introduzca un mail")
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .withMessage("Debe enviar un mail valido"),
    check("password")
      .notEmpty()
      .withMessage("el password es obligatorio")
      .isLength({ min: 8, max: 16 })
      .withMessage("la contraseña debe tener entre 8 y 16 caracteres"),
  ],
  login
);
router.route("/nuevo").get(listarUsuarios).post(
  [
    check("nombreUsuario")
      .notEmpty()
      .withMessage("ingrese un nombre de usuario")
      .isLength({ min: 8, max: 50 })
      .withMessage(
        "ingrese un mínimo de 8 caracteres y un máximo de 50 caracteres"
      ),
    check("email")
      .notEmpty()
      .withMessage("ingrese un mail")
      .isEmail()
      .withMessage("debe ser un email")
      .isLength({ max: 200 })
      .withMessage(" puede ingresar hasta un máximo de 200 caracteres")
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .withMessage("Debe enviar un mail valido"),
    check("password")
      .notEmpty()
      .withMessage("ingrese una contraseña")
      .isLength({
        min: 8,
        max: 16,
      })
      .withMessage(
        "ingrese un mínimo de 8 caracteres y un máximo de 16 caracteres"
      ),
  ],
  crearUsuario
);

 router.route("/nuevo/:id").get(obtenerUsuario).delete(borrarUsuario)//.put([
//   check("nombreUsuario")
//     .notEmpty()
//     .withMessage("ingrese un nombre de usuario")
//     .isLength({ min: 8, max: 50 })
//     .withMessage(
//       "ingrese un mínimo de 8 caracteres y un máximo de 50 caracteres"
//     ),
//   check("email")
//     .notEmpty()
//     .withMessage("ingrese un mail")
//     .isEmail()
//     .withMessage("debe ser un email")
//     .isLength({ max: 200 })
//     .withMessage(" puede ingresar hasta un máximo de 200 caracteres")
//     .matches(
//       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
//     )
//     .withMessage("Debe enviar un mail valido"),
//   check("password")
//     .notEmpty()
//     .withMessage("ingrese una contraseña")
//     .isLength({
//       min: 8,
//       max: 16,
//     })
//     .withMessage(
//       "ingrese un mínimo de 8 caracteres y un máximo de 16 caracteres"
//     ),
// ],editarUsuario)

export default router;
