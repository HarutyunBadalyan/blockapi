const User = require("../db/models/user")
const {Password} = require("../utils/compareandhashpassword");
const {SendMail} = require("../utils/sendemail")

class AuthService {

    static async register(firstName, lastName, email, password, nick_name) {
        try {
            const hashPassword = await Password.hash(password)
            await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                nick_name: nick_name
            });
            await SendMail.sendEmail(email, "Authentication", "hghghg", "<a href=''>click here</a>")
            return ({
                msg: 'User successfully registered!'
            })
        } catch (e) {
            console.log(e);
            return e
        }
    }
}

module.exports = AuthService