// import files
const User = require('../models/user');

// User can get their profile  
const userProfile = async (req, res) => {
    let userId = req.params.id;

    // Remove the colon if present at the beginning of the userId
    // if (userId.startsWith(":")) {
    //     userId = userId.slice(1);
    // }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        // if there is an error
        res.status(500).json({ message: error.message });
        console.error("Error in user Profile", error.message);
    }
};



// Update Profile
const updateProfile = async (req, res) => {
    const { username, email, password } = req.body; // update the following fields
    const userId = req.user._id;
    try {
        let user = await User.findById(userId) // find user by id
        if (!user) return res.status(400).json({ message: "No User" }); // no user found

        if (req.params.id !== userId.toString()) return res.status(400).json({ message: "Cannot update other user" }); // only user with the same token

        // to edit user 
        user.username = username || user.username;
        user.password = password || user.password;
        user.email = email || user.email;

        user = await user.save(); // save in the database
        res.status(200).json({ message: 'Profile Update', user }) // profile updated and will print the output

    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log("Error in update Profile", error.message);
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // find by user by id

        if (!user) return res.status(404).json({ message: 'Cannt find user' }); // no user

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'You are not authorized delete this user' }); // only user with the same token can delete
        }
        await User.findByIdAndDelete(req.params.id); // find by user id and delete 

        res.status(200).json({ message: 'You deleted your  account' }) // will delete account
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message })
        console.log('Error in delete user', error.message);
    }
};

// Admin can get every user
const getAllUsersExceptAdmin = async (req, res) => {
    try {
        const requestingUserId = req.userId;
        const users = await User.find({ _id: { $ne: requestingUserId }, role: { $nin: ['admin', 'super-admin'] } }).select('-password');// will find every user except admin or super admin and can't get or see the user password

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found except admin and super-admin' }); // only user that is registered will show and will count from zero
        }
        res.status(200).json(users); // to return users as the output
    } catch (error) {
        // if there is error
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Should admin view user's profile


// Admin can view all users created last month

module.exports = { userProfile, updateProfile, deleteUser, getAllUsersExceptAdmin };