import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        maxlength: 50,
        required: true
    },
    email:{
        type: String,
        maxlength: 200,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true,
        maxlength: 16
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;