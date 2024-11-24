const mongoose = require('mongoose');


const companyContributorSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who is a contributor
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company', // Reference to the company they contribute to
      required: true,
    },
    role: {
      type: String,
      enum: ['read', 'write'], // Contributor's role: either read or write
      required: true,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin user who added the contributor
      required: true,
    },
    added_at: {
      type: Date,
      default: Date.now,
    }
  }, {
    timestamps: true 
  });
  
  module.exports = mongoose.model('CompanyContributor', companyContributorSchema);
  