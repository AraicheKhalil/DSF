

const express = require('express');
let router = express.Router();
const { 
    CreateOrUpdatePreferences,
  GetPreferences,
} = require('../Controllers/UserPreferences');


router.route('/').post(CreateOrUpdatePreferences)
router.route('/').get(GetPreferences)


module.exports = router;