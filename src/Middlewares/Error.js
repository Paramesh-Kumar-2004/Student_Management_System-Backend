

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500


    res.status(err.statuscode).json({
        "success": false,
        "message": err.message,
        "stack": err.stack,
    })
}

