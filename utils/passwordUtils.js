const crypto = require("crypto");

const validatePassword = (password, hash, salt) => {
    const newHash = crypto.pbkdf2Sync(password, salt, 30000, 32, 'sha512').toString('hex');
    return hash === newHash;
}

const genPassword = (password) => {
    const genSalt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, genSalt, 30000, 32, 'sha512').toString('hex');

    return{
        salt: genSalt,
        hash: genHash
    }
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;