const {StatusCodes} = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  
    let CostumError = {
      statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg : err.message || 'Somthing went wrong try again later',
    }

    if (err.code && err.code == 11000){
      return res.status(StatusCodes.BAD_REQUEST).json({err : "this Email is Already Registred"});
    }


    if (err.name === 'ValidationError') {
      CostumError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(' , ')
      CostumError.statusCode = 400
    }

    if (err.name === 'CastError') {
      CostumError.msg = `No item found with id : ${err.value}`
      CostumError.statusCode = 404
    }
    
    return res.status(CostumError.statusCode).json({err : CostumError.msg})
    // return res.status(500).json({err })


};

module.exports = errorHandler


