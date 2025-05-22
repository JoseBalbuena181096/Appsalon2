import User from '../models/User.js';
import {sendEmailVerification, sendEmailPasswordReset} from '../emails/authEmailService.js';
import {generateJWT, uniqueId} from '../utils/index.js';

const register = async(req, res) => {
    console.log(req.body);
    // Valida todos los campos
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({
            msg: error.message
        });
    }

    const {email, password, name} = req.body;
    // Evitar registros duplicados
    const userExists = await User.findOne({email});
    if(userExists){
        const error = new Error('El usuario ya registrado');
        return res.status(400).json({ 
            msg: error.message
        });
    }

    // Validar la extención de passsword
    const MIN_PASSWORD_LENGTH = 8;
    if(password.trim().length < MIN_PASSWORD_LENGTH){
        const error = new Error(`El password debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
        return res.status(400).json({
            msg: error.message
        });
    }

    try {
        const user = await User(req.body);
        const result = await user.save();
        const {name, email, token} = result;
        await sendEmailVerification({
            name,
            email,
            token
        });
        // console.log(result);
        res.status(201).json({
            msg: 'Usuario creado correctamente, revise su email para verificar su cuenta',
            user
        });
    } catch (error) {
        console.log(error);
    }

}

const verifyAccount = async(req, res) => {    
    const {token} = req.params;
    const user = await User.findOne({token});
    // si el token no es válido
    if(!user){
        const error = new Error('Error: el token no es válido');
        return res.status(401).json({
            msg: error.message
        });
    }
    // Verificar la cuenta si el token es válido
    try {
        user.verified = true;
        user.token = '';
        await user.save();
        res.json({
            msg: 'Cuenta verificada correctamente'
        });
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;
    // Revisar que el usaurio exista
    const user = await User.findOne({email});
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(401).json({
            msg: error.message
        });
    }
    // Revisar si el usuario confirmo su cuenta
    if(!user.verified){
        const error = new Error('Tu cuenta no ha sido verificada');
        return res.status(401).json({
            msg: error.message
        });
    }
    // Revisar si el password es correcto
    if(await user.checkPassword(password)){
        const token =  generateJWT(user._id);
        console.log(token);
        res.json({
            token
        });
    }
    else{
        const error = new Error('El password es incorrecto');
        return res.status(401).json({
            msg: error.message
        });
    }
}

const forgotPassword = async(req, res) => {
    const {email} = req.body;
    // Revisar que el usaurio exista
    const user = await User.findOne({email});
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(401).json({
            msg: error.message
        });
    }
    try {
        // generar un token
        user.token = uniqueId();
        const result = await user.save();
        await sendEmailPasswordReset({
            name: user.name,
            email: user.email,
            token: user.token
        });
        res.json({
            msg: 'Se envio un email con las instrucciones'
        });
        
    } catch (error) {
        console.log(error);
    }
}

const user = async(req, res) => {
    const {user} = req;
    res.json(user);  
}

const verifyPasswordResetToken = async(req, res) => {
    const {token} = req.params;
    const isValidToken = await User.findOne({token});
    if(!isValidToken){
        const error = new Error('Hubo un error el token no es válido');
        return res.status(400).json({
            msg: error.message
        });
    }
    res.json({
        msg: 'Token válido'
    });
}

const updatePassword = async(req, res) => {
    
}

export {
    register,
    verifyAccount,
    login,
    user,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword
}