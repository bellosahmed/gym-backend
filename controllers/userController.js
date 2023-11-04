const User = require('../models/user');


// User can get their profile  
const userProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in user Profile", error.message);
    }
};


// Update Profile
const updateProfile = async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId)
        if (!user) return res.status(400).json({ message: "No User" });

        if (req.params.id !== userId.toString()) return res.status(400).json({ message: "Cannot update other user" });

        user.username = username || user.username;
        user.password = password || user.password;
        user.email = email || user.email;

        user = await user.save();
        res.status(200).json({ message: 'Profile Update', user })

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in update Profile", error.message);
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'Cannto find user' });

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'You are not authorized delete this user' });
        }
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'You deleted your  account' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Error in delete user', error.message);
    }
};

// Admin can get every user
const getAllUsersExceptAdmin = async (req, res) => {
    try {
        const requestingUserId = req.userId; // Assuming you've set the userId in the request during authentication
        const users = await User.find({ _id: { $ne: requestingUserId }, role: { $nin: ['admin', 'super-admin'] } }).select('-password');

        // If no users found, handle accordingly (send a 404 response, for example)
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found except admin and super-admin' });
        }

        // Send the list of users (excluding admin and super-admin) in the response
        res.status(200).json(users);
    } catch (error) {
        // Handle errors (send a 500 response with an error message, for example)
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { userProfile, updateProfile, deleteUser, getAllUsersExceptAdmin };