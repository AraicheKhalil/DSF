const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class PaymentRequired extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.PAYMENT_REQUIRED;
  }
}

module.exports = PaymentRequired;
