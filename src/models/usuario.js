import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nombreUsuario:{
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true
    },
    email:{
        type: String,
        maxLength: 200,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true,
        minLength: 8,
        maxLength: 60
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;

