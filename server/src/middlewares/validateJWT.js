


const jwt = require('jsonwebtoken');
const config = require('../config');




const validateJWT = (req, res, next) => {
    try {
            
            const token = req.headers.authorization.split(' ')[1];


            if(!token) {
                return res.status(401).json({
                    msg: 'No hay token en la peticion'
                });
            }
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
            next();
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
        
}


module.exports = {
    validateJWT
}