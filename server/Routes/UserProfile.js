





const express = require('express');
let router = express.Router();
const {
    ComplementaryProfile,
} = require("../Controllers/UserProfile");



router.post('/complete-profile', ComplementaryProfile);  



module.exports = router;

