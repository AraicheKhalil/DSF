// const mongoose = require('mongoose');

// const userPreferencesSchema = new mongoose.Schema({
//   SmartDocProcessors: {
//     type: [String],
//     enum: ['invoice', 'bank statements', 'ids', 'passports', 'receipts', 'government docs'],
//     default: [],
//   },
//   GenAi: {
//     type: [String], 
//     enum: ['translating', 'proofreading', 'summarize'],
//     default: [],
//   },
//   Conversions: {
//     type: [String], 
//     enum: ['pdf to excel', 'pdf to image', 'html to pdf', 'image to pdf', 'excel to pdf', 'pdf to docx', 'json to csv', 'docx to pdf', 'split pdf', 'merge pdf', 'merge ppts', 'enhance file'],
//     default: [],
//   },
//   ImportsMethods: {
//     type: [String],
//     enum: ['via email', 'via api', 'via Google Drive'],
//     default: [],
//   },
//   createdBy:{
//     type : mongoose.Types.ObjectId,
//     ref : 'User',
//     required : [true,"Please, Provide Name"]
//   },
// }, {
//   timestamps: true, 
// });

// module.exports = mongoose.model('UserPreferences', userPreferencesSchema);


const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name:  String ,
  description:  String ,
  link:  String ,
});

const optionSchemaSMT = new mongoose.Schema({
  name:  String ,
  description:  String ,
  link:  String ,
  type : String
});

const userPreferencesSchema = new mongoose.Schema({
  SmartDocProcessors: {
    type: [optionSchemaSMT],
    default: [],
  },
  GenAi: {
    type: [optionSchema],
    default: [],
  },
  Conversions: {
    type: [optionSchema],
    default: [],
  },
  createdBy:{
    type : mongoose.Types.ObjectId,
    ref : 'User',
    required : [true,"Please, Provide Name"]
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);