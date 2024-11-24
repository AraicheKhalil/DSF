const express = require('express');
const router = express.Router();
const {
  trackToolSubmission,
  getUserSubmissions,
  getSubmissionStatistics,
  getDashboardSubmissionCounts
} = require("../Controllers/UserToolsActivities");


router.post('/track', trackToolSubmission);

router.get('/submissions', getUserSubmissions);

router.get('/submission-statistics',getSubmissionStatistics)

router.get('/dashboard-submissions', getDashboardSubmissionCounts);


module.exports = router;
