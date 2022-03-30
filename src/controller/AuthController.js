const AuthService = require("../services/AuthService")
class AuthController {

    static async register (ctx) {
        const {firstName,lastName,email,password,nick_name} = ctx.request.body;
        ctx.body = await AuthService.register(firstName,lastName,email,password,nick_name)
    }

    static async login (ctx) {
        const {email, password} = ctx.request.body;
        ctx.body = await AuthService.login(email, password)
    }
}

module.exports = AuthController