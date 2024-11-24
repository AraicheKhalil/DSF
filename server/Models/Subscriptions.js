const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stripe_subscription_id: {
      type: String,
      required: true, 
    },
    type: {
      type: String,
      enum: ['pro', 'enterprise'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'expired'],
      default: 'active',
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    }
  });
  
  module.exports = mongoose.model('Subscription', subscriptionSchema);
  