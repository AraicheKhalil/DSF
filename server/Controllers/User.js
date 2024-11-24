const crypto = require('crypto'); // Import crypto for token generation
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../Errors/bad-request");
const User = require("../Models/User");
const nodemailer = require('nodemailer');

// const del = async () => {
//     return await User.deleteMany()
// }

// del()

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASSWORD ,
    },
});

const sendOTPEmail = (email, otp) => {
    console.log(email,otp);
    const mailOptions = {
        from: 'donotreply@gmail.com',
        to: [email],
        subject: 'Smart Doc - Account Verification ',
        html: `
        <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; width: 100%; height: 100%;">
            <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="padding: 20px; text-align: center; background-color: #007BFF; color: #ffffff;">
                    <h1 style="margin: 0;">Smart Doc</h1>
                    <p style="font-size: 18px;">Account Verification</p>
                </div>
                <div style="padding: 20px;">
                    <h2 style="color: #333;">Your OTP Code</h2>
                    <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${otp}</p>
                    <p style="color: #555;">This token is valid for 10 minutes.</p>
                </div>
                <div style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                    <p style="color: #777;">If you did not request this email, please ignore it.</p>
                </div>
            </div>
        </div>
    `,
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error while sending email');
        }
        res.status(200).send('Demo request submitted successfully');
    });
};

const Login = async (req,res) => {
    const {email , password} = req.body;
    if(!email || !password){
        throw new BadRequestError("The Form Should Provide an Email and Password")
    }

    
    const user = await User.login(email,password)
    // if (!user.isVerified) {
    //     throw new BadRequestError('Please verify your account first.');
    // }

    if (!user.isVerified) {
        // Generate a new OTP
        const otp = user.generateOTP();
        user.otpExpiry = Date.now() + 1 * 60 * 1000; // Set OTP expiry to 1 minute
        await user.save();

        // Send OTP via email
        sendOTPEmail(user.email, otp);

        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: "pending_verification",
            message: "Account not verified. A new OTP has been sent to your email.",
            user: {
                email: user.email,
            },
            isVerified : user.isVerified
        });
    }

    const token = user.generateJWT()
    res.setHeader("jwt",`Bearer ${token}`);
    res.status(StatusCodes.OK).json({
        token : token,
        status : "success",
        message: 'Authentication successful!',
        user : {
            name : `${user.first_name}`,
            lastname : `${user.last_name}`,
            email : user.email,
            isVerified : user.isVerified,
            isProfileComplete : user.isProfileComplete
        },
    })
}



const Register = async (req,res) => {
    const user = await User.create(req.body);
    const token = user.generateJWT();

    // Generate OTP
    const otp = user.generateOTP();
    await user.save(); // Save OTP and expiry to the user document

    // Send OTP via email
    sendOTPEmail(user.email, otp);

    res.status(StatusCodes.CREATED).json({
        // token : token,
        otp : otp,
        status : "success",
        message: 'Registration successful! Please Verify your Account',
        // user : {
        //     name : `Hello, ${user.first_name}`,
        //     email : user.email
        // },
    })
}

const Logout = async (req,res) => {
    const authHeader  = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')){
        throw new Error("Authentication Invalid")
    }

    res.status(200).json({ message: 'Successfully logged out' });
}
  

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new BadRequestError("Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError("No user with this email exists");
    }

    // Generate a reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Send the token via email
    // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;
    const resetURL = `${process.env.CLIENT_URL_PRODUCTION}/auth/us/reset-password/${resetToken}`
    const message = `Click on the following link to reset your password: ${resetURL}`;

    try {
        await transporter.sendMail({
            from: 'donotreply@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>You requested for a password reset. Click <a href="${resetURL}">here</a> to reset your password.</p>`
        });

        res.status(StatusCodes.OK).json({ status: 'success', message: 'Token sent to email!' ,token : resetToken });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        throw new Error('There was an error sending the email. Try again later.');
    }
};


const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token and compare it to the stored token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!user) {
        throw new BadRequestError("Token is invalid or has expired");
    }

    // Update the password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(StatusCodes.OK).json({ status: 'success', message: 'Password has been reset successfully' });
};

const resendOTP = async (req, res) => {
    const { email } = req.body;

    // Validate email input
    if (!email) {
        throw new BadRequestError("Please provide an email");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError("No user found with this email");
    }

    // Generate new OTP and set expiry to 1 minute
    const newOtp = user.generateOTP();
    user.otpExpiry = Date.now() + 1 * 60 * 1000; // Set expiry to 1 minute
    await user.save();

    // Send new OTP via email
    sendOTPEmail(user.email, newOtp);

    res.status(StatusCodes.OK).json({
        message: "New OTP sent successfully",
        otp: newOtp,  // Optional: remove in production for security
    });
};


module.exports = {
    Login,
    Register,
    Logout,
    requestPasswordReset,
    resetPassword,
    resendOTP,
}
