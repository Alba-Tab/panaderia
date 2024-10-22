const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({message: 'No hay token, autorizacion denegada'});
    }

    try {
        const cifrado = jwt.verify(token, secret);
        req.user = cifrado;
        next();
    }catch(error){
        console.log(error);
        res.status(403).json({message: 'Token no valido'});
    }
}

module.exports = {
    verificarToken
}