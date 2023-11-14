const Otp = require('../models/otp');
const sendmail = require('../utilis/email')
const dotenv = require('dotenv');
dotenv.config();

const sendotp = async (res, req) => {
    const { email, subject, message, duration = 1 } = req.body;
    const generateOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
    try {
        if (!(email && subject && message)) {
            return res.status(400).json({ msg: ' Please fill all fields' })
        }

        // delete old record
        await Otp.deleteOne({ email });

        // create otp pin 
        const generatedotp = await generateOtp();

        // send email to the user
        const mailOptions = {
            from: process.env.authemail,
            to: email,
            subject,
            html: `<p> ${message}</p> <p> Use this otp to verify your account <b> ${generatedotp}</b></p> <p> 
            The code expires in ${duration}</p>`,
        };

        await sendmail(mailOptions);

        // save in database

        const newOtp = await new Otp({
            email,
            otp: generatedotp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * + duration,
        });

        const createdotp = await newOtp.save();
        return createdotp;

    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log('Error in send otp', error.message)
    }
};

module.exports = { sendotp };