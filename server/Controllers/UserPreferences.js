const BadRequestError = require("../Errors/bad-request");
const User = require("../Models/User");
const UserPreferences = require("../Models/UserPreferences");

// // const del = async (req,res) => {
// //     return  await UserPreferences.deleteMany({})
// // }
// // del()

// const CreateCustomProfile = async  (req,res) => {
//     const {id:userId} = req.user
//     req.body.createdBy = req.user.id;

//     console.log("new : ")
//     console.log({
//         id : userId,
//         body : req.body
//     })

//     const user = await User.findById(userId);
//     if (!user) {
//         console.log("ji")
//       throw new BadRequestError("User not found to Create Custom Profile");
//     }

//     let preferences = await UserPreferences.findOne({ createdBy: userId });
//     console.log("prefren : " + preferences);

//     if(!preferences){
//         console.log("here ")
//         const createPreferences = await UserPreferences.create(req.body)
//         res.status(200).json({
//             data : createPreferences,
//             status : req.user
//         })
//     } else {
//         // throw new BadRequestError("User need to Update Custom Profile");
//         const updatePref = await UserPreferences.findOneAndUpdate(preferences,req.body,
//             { new : true, runValidators : true }
//         )
//         console.log(updatePref)
//         res.status(200).json({
//             data : updatePref,
//             status : updatePref,
//             status : req.user
//         })
//     }

// }

// const GetCustomProfile = async  (req,res) => {
//     const {_id} = req.user;
//     console.log(_id)
//     const Preferences = await UserPreferences.find({createdBy : req.user.id})
//     res.status(200).json({Prefrences: Preferences})
// }

// module.exports = {
//     CreateCustomProfile,
//     GetCustomProfile
// }


// const del = async (req,res) => {
//     return await UserPreferences.deleteMany({ createdBy: null })
// }

// del()



const CreateOrUpdatePreferences = async (req, res) => {
  const { id: userId } = req.user; 
  if (!userId) {
    return res.status(400).json({ message: 'User ID not found. Authentication required.' });
  }

    req.body.createdBy = userId; 

    let preferences = await UserPreferences.findOne({ createdBy: userId });

    console.log('Befor Creating/Updating Preferences with Data:', req.body);
    if (!preferences) {
      console.log('after Creating/Updating Preferences with Data:', req.body);
      
      preferences = await UserPreferences.create(req.body);
      return res.status(201).json({
        message: 'Preferences created successfully',
        data: preferences,
      });

    } else {
      
      const updatedPreferences = await UserPreferences.findOneAndUpdate(
        { createdBy: userId },req.body,{ new: true, runValidators: true } 
      );
      return res.status(200).json({
        message: 'Preferences updated successfully',
        data: updatedPreferences,
      });
    }

};


const GetPreferences = async (req, res) => {
    // console.log('Authenticated User ID:', req.user.id);
  const { id: userId } = req.user; // Get the authenticated user ID

  try {
    // Find the preferences document for the user
    const preferences = await UserPreferences.findOne({ createdBy: userId });
    if (!preferences) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    res.status(200).json({ data: preferences });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching preferences',
      error,
    });
  }
};

module.exports = {
  CreateOrUpdatePreferences,
  GetPreferences,
};
