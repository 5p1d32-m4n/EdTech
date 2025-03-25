const bcrypt = require('bcrypt');

// Hash a plain text pssword.
const hashPassword = async(plainTextPassword) => {
    const saltRounds = 10; // Cost factor for hasing (read the 'bcrypt' docs).
    return await bcrypt.hash(plainTextPassword, saltRounds);
}

const comparePassword = async(plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
}

module.exports = {hashPassword, comparePassword};