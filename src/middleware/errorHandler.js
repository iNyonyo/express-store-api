function errorHandler(err, req, res, next) {
    console.error(err); 

    if (err.code === '23505') { 
        return res.status(409).json({
            success: false,
            message: 'Already exists (duplicate value)'
        });
    }

    if (err.code === '23503') { 
        return res.status(409).json({
            success: false,
            message: 'Related record not found or is being used (foreign key constraint)'
        });
    }

    
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server'
    });
}

module.exports = errorHandler;