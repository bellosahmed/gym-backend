// to install or import npm packages or files
const User = require('../models/user');
const bcrypt = require('bcrypt');


const superAdmin = async () => {
    // to create super admin or admin
    try {
        let password = await bcrypt.hash('admin@1234', 10); // bcrypt to hash the password
        let admin = await User.findOne({ username: 'admin' })
        if (!admin) { // !admin to show if user does not exist
            User.create({  // to create admin user
                name: 'super admin',
                username: 'admin',
                email: 'admin@admin.com',
                password: password,
                role: 'super-admin'
            })
        }
    } catch (error) {
        // if they is error in the program
        res.status(500).json({ message: error.message })
        console.log('Error in super admin', error.message);
    }
};

module.exports = superAdmin;