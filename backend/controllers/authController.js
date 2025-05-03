import User from '../models/User.js';

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

    try {
        const user = await User(req.body);
        await user.save();
        res.status(201).json({
            msg: 'Usuario creado correctamente, revise su email para verificar su cuenta',
            user
        });
    } catch (error) {
        console.log(error);
    }

}

export {
    register
}