const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.authemail,
        pass: process.env.authpass
    }
});

// Test it
transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Ready for message');
        console.log(success);
    }
});

const sendemail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in send email: ", error.message);
    }
}

module.exports = { sendemail };