import jwt from 'jsonwebtoken';

const authMiddleware = async(req, res, next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // console.log('JWT encontrado');
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
        } catch (error) {
            const error_ = new Error(error.message);
            return res.status(403).json({
                msg: error_.message
            });
        }
    }
    else{
        // console.log('JWT no encontrado');
        const error = new Error('Token no encontrado o invalido');
        return res.status(403).json({
            msg: error.message
        });
    }
    next()
}
    
export default authMiddleware;