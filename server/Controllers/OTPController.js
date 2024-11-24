const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../Errors/bad-request");
const User = require("../Models/User");



const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError('User not found');
    }

    if (user.isValidOTP(otp)) {
        user.isVerified = true;
        user.otp = undefined;  // Clear OTP after verification
        user.otpExpiry = undefined;
        await user.save();

        const token = user.generateJWT();
        res.status(StatusCodes.OK).json({
            status: "success",
            message: 'OTP verified successfully!',
            token: token,
            user: {
                name: `${user.first_name}`,
                lastname : `${user.last_name}`,
                email: user.email,
                isVerified : user.isVerified,
                isProfileComplete : user.isProfileComplete
            },
        });
    } else {
        throw new BadRequestError('Invalid or expired OTP');
    }
};

module.exports = {
    verifyOTP
}
