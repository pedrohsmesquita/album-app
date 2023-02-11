const AppHandler = require("../utils/AppHandler");

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppHandler) {
        return res.status(err.status).json({
            message: err.message,
        });
    }
    return res.status(500).json({message: 'Algo de errado ocorreu'});
}

module.exports = errorHandler;