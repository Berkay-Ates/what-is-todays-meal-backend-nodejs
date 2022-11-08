const { CustomError } = require('../error/custom_error');

const errorHandlermiddleware = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message });
    } else {
        return res.status(500).json({ msg: 'something went wrong please try again' });
    }
}

module.exports = errorHandlermiddleware;
