const User = require("../Models/User");
const NotFoundError = require("../Errors/not-found");
const BadRequestError = require('../Errors/bad-request')




const ComplementaryProfile = async (req,res) => {
    const { email , isProfileComplete } = req.body

    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError("No user found with this email");
    }
    
    // Validate that isProfileComplete is a boolean
    if (typeof isProfileComplete !== "boolean") {
        throw new BadRequestError("isProfileComplete must be a boolean.")
    }

    user.isProfileComplete = isProfileComplete;
    await user.save();

    res.status(200).json({
        message: "User profile updated successfully.",
        body: user
    });
}


module.exports = {
    ComplementaryProfile,
}