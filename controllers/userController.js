const User = require('../models/user');


const userProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select('-password');
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

module.exports = { userProfile, updateProfile, deleteUser };