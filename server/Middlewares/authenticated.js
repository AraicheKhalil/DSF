const UnauthenticatedError = require("../Errors/unauthenticated");
const User = require("../Models/User");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticationMiddeware = async (req,res,next) => {
    const authHeader  = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')){
        throw new Error("Authentication Invalid")
    }

    const token = authHeader.split(' ')[1];


    try {
        const encodedPayload = jwt.verify(token,secret)
        // console.log(encodedPayload)
        const {_id} = encodedPayload;
        const user = await User.findById(_id).select('-password') 
        req.user = user;
        next();

    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route') 
    }
}


module.exports = authenticationMiddeware;