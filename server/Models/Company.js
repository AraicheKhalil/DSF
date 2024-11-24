const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  sd_credits: {
    type: Number,
    required: true,
    default: 100, 
  },
  services_enabled: {
    type: Map,
    of: Boolean,
    default: {}, // Example: { 'ocr': true, 'genai': false }
  },
  company_admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to users who are admins
    required: true
  }],
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

companySchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model('Company', companySchema);
