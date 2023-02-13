const AppHandler = require("../utils/AppHandler");

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppHandler) {
        return res.status(err.status).json({
            message: err.message,
        });
    }
    if (err.name === 'JsonWebTokenError')
        return res.status(401).json({message: 'Token inválido'});
    if (err.name === 'TokenExpiredError')
        return res.status(401).json({message: 'O seu token expirou', code: 100});
    return res.status(500).json({message: 'Algo de errado ocorreu'});
}

module.exports = errorHandler;