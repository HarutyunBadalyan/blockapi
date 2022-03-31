const User = require("../db/models/user")
const {Password} = require("../utils/compareandhashpassword");
const {SendMail} = require("../utils/sendemail");
const {Tokens} = require("../utils/tokens")

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
            const encodedToken = Tokens.encodeToken(email);
            const authUrl = new URL(`/api/v1/auth/token/${encodedToken}`,process.env.BASEURL);
            await SendMail.sendEmail(email, "Authentication", "hghghg", `<a href="${authUrl}">click here</a>`)
            return ({
                msg: 'User successfully registered!'
            })
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                return ({
                    error: "Email already in use !"
                })
            }
            return ({
                error: e
            })
        }
    }

    static async login(email, password) {

        const user = await User.findOne({where: {email: email}});

        if (!user) {
            return ({
                error: "Incorrect email or password"
            })
        }

        const match = await Password.compare(password, user.password);
        if (!match) {
            return ({
                msg: "Incorrect email or password"
            })
        }

        const token = await Tokens.encodeToken(user.id);
        const refreshToken = await Tokens.refreshTokenEncode(user.id)
        return ({
            access_token: token,
            refresh_token: refreshToken,
            msg: "User successfully logged in!"
        })
    }
    static async verifyUser(token) {
        let message
        try {
            let decoded = Tokens.decodeToken(token);
           await User.update({authenticated: true},{where: {
               email:decoded.data
           }})
            message = {msg: "success"};

        } catch(e) {
            console.log("verifyusererror",e);
            message = {msg: "token expired"};
        } finally {
            return message;
        }
    }
}

module.exports = AuthService