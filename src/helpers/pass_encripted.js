const bcrypt = require('bcryptjs');

const passEncrypted = ( user, password ) => {
    const salt = bcrypt.genSaltSync();
    let passwordUser = user.password;
    passwordUser = bcrypt.hashSync( password, salt );
    const finalPass = passwordUser;

    return finalPass;
};

module.exports = {
    passEncrypted
}