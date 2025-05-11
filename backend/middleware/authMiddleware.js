const authMiddleware = async(req, res, next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log('JWT encontrado');
        
    }
    else{
        // console.log('JWT no encontrado');
        const error = new Error('Token no encontrado o invalido');
        return res.status(401).json({
            msg: error.message
        });
    }
    next()
}
    
export default authMiddleware;