// const transporter = nodemailer.createTransport({
//     service: 'araiche.tech@gmail.com', // Replace with your email service
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// const sendOTPEmail = (email, otp) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// };


// module.exports = {
//     sendOTPEmail,
//     transporter,
// }