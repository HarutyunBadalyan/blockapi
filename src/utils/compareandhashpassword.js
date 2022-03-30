const bcrypt = require('bcrypt');
const saltRounds =  Number(process.env.SALTROUNDS);

class Password {
     static async hash(password) {
         return await bcrypt.hash(password, saltRounds);
    }
    static async compare(password, hashPassword) {
        return await bcrypt.compare(password, hashPassword);
    }
}
module.exports = {Password};