function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;

    const message = err.message || 'Something went wrong on the server';

    res.status(statusCode).json({
        success: false,
        message: message
    });
}

module.exports = errorHandler;