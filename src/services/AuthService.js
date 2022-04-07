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
            const authUrl = new URL(`/api/v1/auth/token/${encodedToken}`, process.env.BASEURL);
            await SendMail.sendEmail(email, "Authentication", "hghghg", `<h2>Hi! ${firstName}</h2><p>  This HTML content is being send by NodeJS along with NodeMailer.</p>
                    <a href="${authUrl}" style="background-color: #4CAF50;border: none;color: white;
                    padding: 10px 25px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;
                    border-radius: 8px;" target="_blank">Verify</a>`)
            return ({
                msg: 'User successfully registered!'
            })
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                return ({
                    error: "This Email already used"
                })
            }
            return ({
                error: e
            })
        }
    }

    static async login(email, password) {
        let message
        try {
            const user = await User.findOne({where: {email: email}});

            if (!user) {
                throw  "Incorrect email or password"
            }

            const match = await Password.compare(password, user.password);
            if (!match) {
                throw "Incorrect email or password";
            }

            if (user.authenticated === true) {
                const token = await Tokens.accessTokenEncode(user.id);

                message = {
                    access_token: token,
                    msg: "User successfully logged in!"
                }
            } else {
                message = {error: "Check your email"}
            }
        } catch (e) {
            message = {error: e}

        } finally {
            return message;
        }

    }

    static async verifyUser(token) {
        let message
        try {
            let decoded = Tokens.decodeToken(token);
            await User.update({authenticated: true}, {
                where: {
                    email: decoded.data
                }
            })
            message = {msg: "success"};

        } catch (e) {
            console.log("verifyusererror", e);
            message = {msg: "token expired"};
        } finally {
            return message;
        }
    }
}

module.exports = AuthService