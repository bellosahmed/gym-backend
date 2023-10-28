const User = require('../models/user');
const bcrypt = require('bcrypt');

const superAdmin = async () => {
    try {
        let password = await bcrypt.hash('admin@1234', 10);
        let admin = await User.findOne({ username: 'admin' })
        if (!admin) {
            User.create({
                name: 'super admin',
                username: 'admin',
                email: 'admin@admin.com',
                password: password,
                role: 'super-admin'
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Error in super admin', error.message);
    }
};

module.exports = superAdmin;