const UserActivities = require('../Models/UserToolsActivities');
const User = require('../Models/User'); // Import User model to get membership type
const PaymentRequired  = require('../Errors/PaymentRequired');
const NotFoundError  = require('../Errors/not-found');
const BadRequestError = require("../Errors/bad-request");
const { StatusCodes } = require('http-status-codes');


const trackToolSubmission = async (req, res) => {
  const { toolCategory, toolType, extractionCount } = req.body;
  const userId = req.user._id;

  if (!extractionCount) {
    throw new BadRequestError('extractionCount is required.');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const membership = user.membership;
  const submissionLimitSchemeVal = user.submissionLimit;
  const submissionLimit = submissionLimitSchemeVal;

  // Find or create user's activity record
  let userActivities = await UserActivities.findOne({ user: userId });
  if (!userActivities) {
    userActivities = new UserActivities({ user: userId });
  }

  let totalSubmissions;
  let remainingSubmissions;
  let responseMessage = 'Submission tracked successfully.'; // Default response message
  let responseStatus = 200; // Default status code
  let submissionSuccess = true;

  // Function to handle category-specific submissions
  const handleSubmissions = (category) => {
    // Calculate total submissions for the category
    totalSubmissions = userActivities[category].reduce((sum, act) => sum + act.extractionCount, 0);
    remainingSubmissions = submissionLimit - totalSubmissions;

    if (extractionCount > remainingSubmissions) {
      // Set response message and status if user exceeds remaining submissions
      responseMessage = `You only have ${remainingSubmissions} extractions . Please adjust your request or upgrade your membership.`;
      responseStatus = 402;
      submissionSuccess = false;
      return; // Stop further processing
    }

    // If within remaining submissions, add new submission
    userActivities[category].push({
      toolType,
      extractionCount,
      extractDate: Date.now(),
    });

    totalSubmissions += extractionCount;
    if (totalSubmissions >= submissionLimit) {
      // If user has now reached exactly the limit after this submission, set response message
      responseMessage = `You have reached the ${membership} limit of ${submissionLimit} submissions for ${category}. Please upgrade your membership.`;
      responseStatus = 200;
    }
  };

  // Handle submissions based on category
  if (toolCategory === 'SmartDoc') {
    handleSubmissions('SmartDoc');
  } else if (toolCategory === 'GenAI') {
    handleSubmissions('GenAI');
  } else {
    throw new BadRequestError("Invalid tool category specified.");
  }

  // If submission was successful, save user activities
  if (submissionSuccess) {
    await userActivities.save();
  }

  // Send final response once all logic is processed

  if (responseStatus !== 200){
    res.status(responseStatus).json({
      access: submissionSuccess,
      message: responseMessage,
      membership,
    });
  } else {
    res.status(responseStatus).json({
      access: submissionSuccess,
      message: responseMessage,
      membership,
      data: userActivities,
    });
  }
};



// Controller to get the user's submission data
const getUserSubmissions = async (req, res) => {
  const userId = req.user._id; // Get user ID from authenticated user

  const userActivities = await UserActivities.findOne({ user: userId });
    if (!userActivities) {
      throw new NotFoundError("No activities found for this user.")
    }

    res.status(200).json({
      message: 'User activities fetched successfully.',
      data: userActivities,
    });
};


































// const getDateRange = (days) => {
//   const today = new Date();
//   return new Date(today.setDate(today.getDate() - days));
// };

// // Controller to get submission statistics for TinyChartBar
// const getSubmissionStatistics = async (req, res) => {
//   const userId = req.user._id;

//     // Retrieve the user's activities
//     const userActivities = await UserActivities.findOne({ user: userId });
//     if (!userActivities) {
//       return res.status(404).json({ message: 'No activities found for this user.' });
//     }

//     // Define date ranges for last 7 days, 3 months, and 6 months
//     const sevenDaysAgo = getDateRange(1);
//     const threeMonthsAgo = getDateRange(90);
//     const sixMonthsAgo = getDateRange(180);

//     // Helper function to filter and summarize submissions
//     const filterAndSummarize = (activities, dateRange) => {
//       return activities
//         .filter((activity) => new Date(activity.createdAt) >= dateRange)
//         .reduce((acc, activity) => {
//           const existingTool = acc.find((item) => item.toolType === activity.toolType);
//           if (existingTool) {
//             existingTool.submissions += activity.submissions;
//           } else {
//             acc.push({
//               toolType: activity.toolType,
//               submissions: activity.submissions,
//             });
//           }
//           return acc;
//         }, []);
//     };

//     // Calculate statistics for each timeframe and tool category
//     const statistics = {
//       SmartDoc: {
//         last7Days: filterAndSummarize(userActivities.SmartDoc, sevenDaysAgo),
//         last3Months: filterAndSummarize(userActivities.SmartDoc, threeMonthsAgo),
//         last6Months: filterAndSummarize(userActivities.SmartDoc, sixMonthsAgo),
//       },
//       GenAI: {
//         last7Days: filterAndSummarize(userActivities.GenAI, sevenDaysAgo),
//         last3Months: filterAndSummarize(userActivities.GenAI, threeMonthsAgo),
//         last6Months: filterAndSummarize(userActivities.GenAI, sixMonthsAgo),
//       },
//     };

//     res.status(200).json({
//       message: 'Submission statistics retrieved successfully',
//       data: statistics,
//     });
  
// };






// // Helper function to calculate the start of each time range
// const getHourRange = (hoursAgo) => {
//   const now = new Date();
//   now.setHours(now.getHours() - hoursAgo);
//   return now;
// };

// // Controller to get submission statistics for TinyChartBar based on exclusive hourly ranges
// const getSubmissionStatistics = async (req, res) => {
//   const userId = req.user._id;

//   // Retrieve the user's activities
//   const userActivities = await UserActivities.findOne({ user: userId });
//   if (!userActivities) {
//     return res.status(404).json({ message: 'No activities found for this user.' });
//   }

//   // Define exclusive hourly ranges
//   const oneHourAgo = getHourRange(1);
//   const twoHoursAgo = getHourRange(2);
//   const threeHoursAgo = getHourRange(3);

//   // Helper function to filter and summarize submissions within an exclusive time range
//   const filterAndSummarize = (activities, startTime, endTime) => {
//     return activities
//       .filter((activity) => new Date(activity.extractDate) >= startTime && new Date(activity.extractDate) < endTime)
//       .reduce((acc, activity) => {
//         const existingTool = acc.find((item) => item.toolType === activity.toolType);
//         if (existingTool) {
//           existingTool.extractionCount += activity.extractionCount;
//         } else {
//           acc.push({
//             toolType: activity.toolType,
//             extractionCount: activity.extractionCount,
//           });
//         }
//         return acc;
//       }, []);
//   };

//   // Calculate statistics for each hourly timeframe and tool category
//   const statistics = {
//     SmartDoc: {
//       last1Hour: filterAndSummarize(userActivities.SmartDoc, oneHourAgo, new Date()),
//       last2Hours: filterAndSummarize(userActivities.SmartDoc, twoHoursAgo, oneHourAgo),
//       last3Hours: filterAndSummarize(userActivities.SmartDoc, threeHoursAgo, twoHoursAgo),
//     },
//     GenAI: {
//       last1Hour: filterAndSummarize(userActivities.GenAI, oneHourAgo, new Date()),
//       last2Hours: filterAndSummarize(userActivities.GenAI, twoHoursAgo, oneHourAgo),
//       last3Hours: filterAndSummarize(userActivities.GenAI, threeHoursAgo, twoHoursAgo),
//     },
//   };

//   res.status(200).json({
//     message: 'Submission statistics retrieved successfully',
//     data: statistics,
//   });
// };

// Helper function to calculate the start date for each range (days, months)
const getDateRange = (days) => {
  const today = new Date();
  today.setDate(today.getDate() - days);
  return today;
};

// Controller to get submission statistics for TinyChartBar based on day and month ranges
const getSubmissionStatistics = async (req, res) => {
  const userId = req.user._id;

  // Retrieve the user's activities
  const userActivities = await UserActivities.findOne({ user: userId });
  if (!userActivities) {
    return res.status(404).json({ message: 'No activities found for this user.' });
  }

  // Define exclusive date ranges
  const sevenDaysAgo = getDateRange(7);
  const thirtyDaysAgo = getDateRange(30);
  const threeMonthsAgo = getDateRange(90); // 3 months roughly as 90 days

  // Helper function to filter and summarize submissions within an exclusive time range
  const filterAndSummarize = (activities, startTime, endTime) => {
    return activities
      .filter((activity) => new Date(activity.extractDate) >= startTime && new Date(activity.extractDate) < endTime)
      .reduce((acc, activity) => {
        const existingTool = acc.find((item) => item.toolType === activity.toolType);
        if (existingTool) {
          existingTool.extractionCount += activity.extractionCount;
        } else {
          acc.push({
            toolType: activity.toolType,
            extractionCount: activity.extractionCount,
          });
        }
        return acc;
      }, []);
  };

  // Calculate statistics for each timeframe and tool category
  const statistics = {
    SmartDoc: {
      last7Days: filterAndSummarize(userActivities.SmartDoc, sevenDaysAgo, new Date()),
      last30Days: filterAndSummarize(userActivities.SmartDoc, thirtyDaysAgo, sevenDaysAgo),
      last3Months: filterAndSummarize(userActivities.SmartDoc, threeMonthsAgo, thirtyDaysAgo),
    },
    GenAI: {
      last7Days: filterAndSummarize(userActivities.GenAI, sevenDaysAgo, new Date()),
      last30Days: filterAndSummarize(userActivities.GenAI, thirtyDaysAgo, sevenDaysAgo),
      last3Months: filterAndSummarize(userActivities.GenAI, threeMonthsAgo, thirtyDaysAgo),
    },
  };

  res.status(200).json({
    message: 'Submission statistics retrieved successfully',
    data: statistics,
  });
};









// const getDashboardSubmissionCounts = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     // Retrieve the user and check membership type
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Set limits based on membership type
//     const membership = user.membership; // "free" or "pro"
//     const submissionLimit = membership === 'pro' ? 10 : 5; // 20 for pro, 10 for free

//     // Retrieve user's activity record
//     const userActivities = await UserActivities.findOne({ user: userId });
//     if (!userActivities) {
//       return res.status(404).json({ message: 'No activities found for this user.' });
//     }

//     // Calculate total submissions and remaining submissions for SmartDoc and GenAI
//     const calculateSubmissions = (activities, limit) => {
//       const totalSubmissions = activities.reduce((sum, activity) => sum + activity.submissions, 0);
//       const remainingSubmissions = limit - totalSubmissions;
//       return {
//         totalSubmissions,
//         remainingSubmissions: remainingSubmissions > 0 ? remainingSubmissions : 0
//       };
//     };

//     const smartDocStats = calculateSubmissions(userActivities.SmartDoc, submissionLimit);
//     const genAIStats = calculateSubmissions(userActivities.GenAI, submissionLimit);

//     res.status(200).json({
//       message: 'Dashboard submission counts retrieved successfully',
//       data: {
//         SmartDoc: {
//           totalSubmissions: smartDocStats.totalSubmissions,
//           remainingSubmissions: smartDocStats.remainingSubmissions
//         },
//         GenAI: {
//           totalSubmissions: genAIStats.totalSubmissions,
//           remainingSubmissions: genAIStats.remainingSubmissions
//         }
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error fetching dashboard submission counts',
//       error: error.message,
//     });
//   }
// };

// const getDashboardSubmissionCounts = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     // Retrieve the user and check membership type
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Set limits based on membership type
//     const membership = user.membership; 
//     const submissionLimitSchemeVal = user.submissionLimit;
//     const submissionLimit = submissionLimitSchemeVal;  // 100 by default in schema for every membership

//     // Retrieve user's activity record
//     const userActivities = await UserActivities.findOne({ user: userId });
//     if (!userActivities) {
//       return res.status(404).json({ message: 'No activities found for this user.' });
//     }

//     // Calculate total submissions and remaining submissions for SmartDoc and GenAI
//     const calculateSubmissions = (activities, limit) => {
//       const totalSubmissions = activities.reduce((sum, activity) => sum + activity.submissions, 0);
//       const remainingSubmissions = limit - totalSubmissions;
//       return {
//         totalSubmissions,
//         remainingSubmissions: remainingSubmissions > 0 ? remainingSubmissions : 0
//       };
//     };

//     // Calculate statistics with tool name included
//     const smartDocStats = {
//       name: 'SmartDoc',
//       ...calculateSubmissions(userActivities.SmartDoc, submissionLimit),
//     };

//     const genAIStats = {
//       name: 'GenAI',
//       ...calculateSubmissions(userActivities.GenAI, submissionLimit),
//     };

//     res.status(200).json({
//       message: 'Dashboard submission counts retrieved successfully',
//       data: {
//         SmartDoc: smartDocStats,
//         GenAI: genAIStats,
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error fetching dashboard submission counts',
//       error: error.message,
//     });
//   }
// };

const getDashboardSubmissionCounts = async (req, res) => {
  const userId = req.user._id;

  // Retrieve the user and check membership type
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Set limits based on membership type
  const membership = user.membership;
  const submissionLimitSchemeVal = user.submissionLimit; // Default is 100 from schema
  const submissionLimit = submissionLimitSchemeVal;

  // Retrieve user's activity record
  const userActivities = await UserActivities.findOne({ user: userId });
  if (!userActivities) {
    return res.status(404).json({ message: 'No activities found for this user.' });
  }

  // Calculate total submissions and remaining submissions for each tool type
  const calculateSubmissions = (activities, limit) => {
    const totalSubmissions = activities.reduce((sum, activity) => sum + activity.extractionCount, 0);
    const remainingSubmissions = limit - totalSubmissions;
    return {
      totalSubmissions,
      remainingSubmissions: remainingSubmissions > 0 ? remainingSubmissions : 0,
    };
  };

  // Calculate statistics for SmartDoc and GenAI, with tool name included
  const smartDocStats = {
    name: 'SmartDoc',
    ...calculateSubmissions(userActivities.SmartDoc, submissionLimit),
  };

  const genAIStats = {
    name: 'GenAI',
    ...calculateSubmissions(userActivities.GenAI, submissionLimit),
  };

  // Send the results in a structured response
  res.status(200).json({
    message: 'Dashboard submission counts retrieved successfully',
    data: {
      SmartDoc: smartDocStats,
      GenAI: genAIStats,
    },
  });
};

module.exports = {
  trackToolSubmission,
  getUserSubmissions,
  getSubmissionStatistics,
  getDashboardSubmissionCounts
};
