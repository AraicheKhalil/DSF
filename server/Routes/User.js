

const express = require('express');
let router = express.Router();
const {
    Login,
    Register,
    Logout,
    requestPasswordReset,
    resetPassword,
    resendOTP,
} = require("../Controllers/User");
const { verifyOTP } = require('../Controllers/OTPController');


router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/logout').get(Logout)
router.post('/verify-otp', verifyOTP);
router.post('/request-password-reset', requestPasswordReset); // Request reset token
router.post('/reset-password/:token', resetPassword); // Reset password with token
router.post('/resend-otp', resendOTP);  // New route for resending OTP






module.exports = router;