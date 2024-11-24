

const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../Controllers/UserSettings')

// Route to get user profile data
router.get('/profile', getProfile);

// Route to update user profile data
router.post('/profile', updateProfile);

module.exports = router;
