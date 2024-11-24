const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator')
const secret = process.env.JWT_SECRET
const lifetime = process.env.JWT_LIFETIME 
const crypto = require('crypto');
const UnauthenticatedError = require('../Errors/unauthenticated')


const userSchema = new mongoose.Schema({
  full_name : {
    type: String,
    trim: true,
  },
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true
  },
  profile_picture : {
    type : String
  },
  phone : {
    type : String,
    trim: true
  },
  company_name : {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate : [isEmail , "Please, Entre The Correct email"],
  },
  password: {
    type: String,
    minlength : 8,
  },
  location: {
    type: String,
    trim : true
  },
  role: {
    type: String,
    enum: ['admin', 'contributor'],
    default: 'admin',
  },
  membership: { // type
    type: String,
    enum: ['basic', 'pro', 'enterprise'],
    required: [true, "The Application Type is So Important"],
    default : 'basic',
  },
  submissionLimit : {
    type : Number,
    default : 100,
  },
  googleId: {
    type: String, // To store the Google ID
    unique: true,
    sparse: true, // Makes this field optional
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    default: null, // Only for Enterprise users
  },
  stripe_customer_id: {
    type: String,
    default: null, // Set by Stripe for both Pro and Enterprise users
  },
  otp: {
    type: String,
  },
  otpExpiry: Date,
  isVerified: { 
    type: Boolean,
    default: false 
  },
  isProfileComplete: {
    type: Boolean,
    default: false, // Set to false by default for new users
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true, 
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

// Best Practice: Index for email for fast lookups
userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.generateOTP = function () {
  const otp = crypto.randomInt(100000, 999999).toString(); 
  this.otp = otp;
  this.otpExpiry = Date.now() + 1 * 60 * 1000; 
  return otp;
};

userSchema.methods.isValidOTP = function (inputOtp) {
  return this.otp === inputOtp && this.otpExpiry > Date.now();
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    secret,
    { expiresIn: lifetime }
  );
};

userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: Date.now() });
  next();
});


userSchema.statics.login = async function(email,password){
  const user = await this.findOne({email})
  if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth){
          return user;
      }
      throw new UnauthenticatedError("This Password is Uncorecct ");
  }
  throw new UnauthenticatedError("invalid Credential, Please try again");
}


userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token and save to the database
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Set token expiration to 1 hour
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model('User', userSchema);







