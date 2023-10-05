
// Handle not found url 
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
}

// Handle the throw error to make it readable for us
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        status: 'error',
        message:err?.message,
        stack:err?.stack,
        statusCode: statusCode,
    })
}

module.exports= {notFound, errorHandler}