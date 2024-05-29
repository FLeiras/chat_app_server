const jwt = require('jsonwebtoken');

const jwtValidate = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    };

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'El token no es válido'
        });
    }


};

module.exports = {
    jwtValidate
};