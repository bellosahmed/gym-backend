const crypto = require('crypto');

function generateOtp() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(min + Math.random() * (max - min + 1));
};

function createRandomBytes() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(8, (err, buff) => {
            if (err) reject(err);

            const token = buff.toString('hex');
            resolve(token);
        });
    });
}


module.exports = { generateOtp, createRandomBytes };