function errorMiddleware(err, req, res, next){
    res.status(500).json({
        msg: "Global internal server error",
        errorMsg: err
    })
}

module.exports = errorMiddleware