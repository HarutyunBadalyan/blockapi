const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS;
class Password {
     static async hash(password) {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }
    static async compare(password, hashPassword) {
       const match = await bcrypt.compare(password, hashPassword);
       return match;
    }
}
module.exports = {Password};