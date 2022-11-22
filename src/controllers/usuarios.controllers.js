import Usuario from "../models/usuario";
import { validationResult } from "express-validator";
// import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    // manejar los errores de la validacion
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //verificar si existe un mail como el recibido
    const { email, password } = req.body;

    //verificar si el email ya existe
    let usuario = await Usuario.findOne({ email }); //devulve un null
    if (!usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }
     if (password !== usuario.password) {
        return res.status(400).json({
          mensaje: "Correo o password invalido - password",
        });
      }

    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombreUsuario: usuario.nombreUsuario
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    // manejar los errores de la validacion
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    //verificar si el email ya existe
    let usuario = await Usuario.findOne({ email }); 
    if (usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    //guardamos el nuevo usuario en la BD
    usuario = new Usuario(req.body);
    // //guardar el usuario en la BD con la pass encriptada
    // const salt = bcrypt.genSaltSync();
    // usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
      mensaje: "usuario creado",
      nombreUsuario: usuario.nombreUsuario,
      uid: usuario._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const listarUsuarios = await Usuario.find();
    res.status(200).json(listarUsuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar listar los usuarios",
    });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id)
    res.status(200).json({
      mensaje: "El usuario fue correctamente eliminado"
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el usuario solicitado no pudo ser eliminado",
    });
  }
};

// export const editarUsuario = async (req, res) => {
//   try {
//     const errores = validationResult(req);
//     if (!errores.isEmpty()) {
//       return res.status(400).json({
//         errores: errores.array(),
//       });
//     }
//     await Usuario.findByIdAndUpdate(req.params.id, req.body);
//     res.status(200).json({
//       mensaje: "El Usuario fue editado correctamente",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       mensaje: "Error el Usuario solicitado no pudo ser modificado",
//     });
//   }
// };

export const obtenerUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo encontrar el usuario solicitado",
    });
  }
};

