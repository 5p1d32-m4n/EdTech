const bcrypt = require('bcrypt');

// Hash a plain text pssword.
const hashPassword = async (plainTextPassword) => {
    const saltRounds = 10; // Cost factor for hasing (read the 'bcrypt' docs).
    return await bcrypt.hash(plainTextPassword, saltRounds);
}

const comparePassword = async (plainTextPassword, hashedPassword) => {
    if (!plainTextPassword || hashedPassword) {
        throw new Error('Missing password or hash for comparison.');
    }
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (err) {
        console.log('Password comparison error: ', err.message);
        return false;
    }
}

module.exports = { hashPassword, comparePassword };