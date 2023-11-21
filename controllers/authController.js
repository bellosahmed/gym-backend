//install npm packages or files
const User = require('../models/user');
const Verification = require('../models/Verificationtoken');
const Resttoken = require('../models/resettoken');
//const { tokenandcookies } = require('../utilis/jwtandcookies');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Sendchamp = require('sendchamp-sdk');
const crypto = require('crypto');
const { signToken } = require('../middlewares/protectRoutes');
dotenv.config();
const { createTransporter, createMailOptions } = require('../utilis/email');
const { generateOtp, createRandomBytes } = require('../utilis/helper');
const { isValidObjectId } = require('mongoose');


//Signup User
const usersignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ username }] }); // find user by username 

        if (user) {
            return res.status(400).json({ message: 'User exists' }); // can't have the same with other user
        }

        const newUser = new User({ // to create user
            username,
            email,
            password
        });

        const token = signToken(newUser._id);

        const otp = generateOtp();
        const verification = new Verification({
            owner: newUser._id,
            token: otp
        });

        const transporter = createTransporter();

        const textMessage = `Click the following link to reset your password: ${otp}`;
        const htmlMessage = `<p>Insert the otp code to reset your password:</p><p>${otp}</p>`;

        const mailOptions = createMailOptions(
            newUser.email,
            'Forgot password',
            textMessage,
            htmlMessage
        );

        await transporter.sendMail(mailOptions);
        await verification.save();
        await newUser.save();// is saved in the database

        //tokenandcookies(newUser._id, res); // will create the cookies of the user

        res.status(201).json({ // if registered will show the following as the output
            token, newUser
        });
    } catch (error) {
        // if there is error
        console.error('Error in signup:', error);
        res.status(500).json({ message: error.message });
    }
};

// Verify User
const verifyuser = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        // Check for missing or empty userId and otp
        if (!userId || !otp.trim()) {
            return res.status(400).json({ msg: 'Invalid request' });
        }

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ msg: 'Invalid Id' });
        }

        // Find the user by userId
        const user = await User.findById(userId);

        // If no user found, return a 404 response
        if (!user) {
            return res.status(404).json({ msg: 'No user found' });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.json({ msg: 'Account is already verified' });
        }


        // Find the verification token for the user
        const token = await Verification.findOne({
            owner: user._id,
        });


        if (!token) {
            return res.json({ msg: 'No verification token found' });
        }


        user.isVerified = true;
        await Verification.findByIdAndDelete(token._id);
        await user.save();

        const transporter = createTransporter();

        const textMessage = `Mail has been verified`;
        const htmlMessage = `<p> Check your mail to access your account</p>`;

        const mailOptions = createMailOptions(
            user.email,
            'Verify account',
            textMessage,
            htmlMessage
        );

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            msg: 'Account has been verified',
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        });

    } catch (error) {
        // Handle errors and return a 500 response
        res.status(500).json({ message: error.message });
        console.log("Error in verify user: ", error.message);
    }
};

//Login User
const userlogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); // find user by username

        if (!user) {
            return res.status(400).json({ message: 'User not exist' }); // if user does not exist 
        } else {

            if (!user.isVerified) {
                return res.status(401).json({ msg: 'Please verify your account before logging in' });
            }

            const token = signToken(user._id);

            res.status(200).json({ // if loggedin will return the output
                _id: user._id,
                username: user.username,
                password: user.password,
                token
            });
        }
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log("Error in LoginUser: ", error.message);
    }
};

//Logout 
const userlogout = async (req, res) => {
    try {
        res.cookie("jwt", "", { MaxAge: 1 });
        res.status(200).json({ message: 'User logged out' }); // user to logout
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log("Error in Logout: ", error.message);
    }
};

const forgotpass = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            res.status(400).json({ msg: ' Provide valid email ' })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }

        const token = await Resttoken.findOne({ owner: user._id });

        if (token) {
            return res.json({ msg: 'Token will expire after one hour and you can send another one' });
        }

        const Token = await createRandomBytes();
        //console.log(Token)
        const resettoken = new Resttoken({ owner: user._id, token: Token });

        await resettoken.save();

        const transporter = createTransporter();

        const resetlink = `http://localhost:1111/api/auth/resetpass?token=${Token}&id=${user._id}`;
        const textMessage = `This is the link to your forgot password ${resetlink}`;
        const htmlMessage = `<p>Use the link to access your password</p> ${resetlink}`;

        const mailOptions = createMailOptions(
            user.email,
            'Forgot Password',
            textMessage,
            htmlMessage
        );

        await transporter.sendMail(mailOptions);

        res.status(200).json({ msg: 'Check your email for the reset pin', })

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Forgot Password: ", error.message);
    }
};


const resetpass = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            res.json({ msg: 'User not found' })
        }

        user.password = password.trim();
        await user.save();

        await Resttoken.deleteOne({ owner: user._id });

        const transporter = createTransporter();

        const textMessage = `Password has been changed`;
        const htmlMessage = `<p> You changes your password</p> <p> You can now login with your new password`;

        const mailOptions = createMailOptions(
            user.email,
            'Password Changed',
            textMessage,
            htmlMessage
        );

        await transporter.sendMail(mailOptions);


        res.json({ msg: 'Password changes Successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Reset Password: ", error.message);
    }
};

// // forgot password
// const forgotpassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (!email) return res.status(400).json({ msg: 'Provide a valid email' })

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const resetToken = crypto.randomBytes(20).toString('hex');
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//         await user.save();

//         const resetURL = `http://localhost:1111/api/auth/resetpassword/${resetToken}`;

//         const transporter = createTransporter();
//         const textMessage = `Click the following link to reset your password: ${resetURL}`;
//         const htmlMessage = `<p>Click the following link to reset your password:</p><p><a href="${resetURL}">${resetURL}</a></p>`;

//         const mailOptions = createMailOptions(
//             user.email,
//             'Password Reset',
//             textMessage,
//             htmlMessage
//         );

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Password reset email sent' });
//     } catch (error) {
//         console.error('Error in forgotPassword:', error);
//         res.status(500).json({ message: error.message });
//     }
// };


// // reset password
// const resetPassword = async (req, res) => {
//     try {
//         const resetToken = req.params.resetToken;
//         const { password } = req.body;

//         console.log('Reset Token:', resetToken); // Add this line for debugging

//         if (!resetToken || !password) {
//             return res.status(400).json({ message: 'Reset token and password are required' });
//         }

//         const user = await User.findOne({
//             resetPasswordToken: resetToken,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         console.log('User:', user); // Add this line for debugging

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }

//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error('Error in resetPassword:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// to export files
module.exports = { usersignup, userlogin, userlogout, verifyuser, forgotpass, resetpass };

